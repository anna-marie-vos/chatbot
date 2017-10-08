'use strict';

const apiai = require('apiai');
const config = require('./config');
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const uuid = require('uuid');
const file = require('manu-file-log');

const FBapi = require('./FBapi');
const AIapi = require('./AIapi')
const src = require('./src');


// Messenger API parameters
if (!config.FB_PAGE_TOKEN) {
	throw new Error('missing FB_PAGE_TOKEN');
}
if (!config.FB_VERIFY_TOKEN) {
	throw new Error('missing FB_VERIFY_TOKEN');
}
if (!config.API_AI_CLIENT_ACCESS_TOKEN) {
	throw new Error('missing API_AI_CLIENT_ACCESS_TOKEN');
}
if (!config.FB_APP_SECRET) {
	throw new Error('missing FB_APP_SECRET');
}
if (!config.SERVER_URL) { //used for ink to static files
	throw new Error('missing SERVER_URL');
}

//verify request came from facebook
app.use(bodyParser.json({
	verify: src.VerifyRequestSignature
}));

//serve static files in the public directory
app.use(express.static('public'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

// Process application/json
app.use(bodyParser.json())




const apiAiService = apiai(config.API_AI_CLIENT_ACCESS_TOKEN, {
	language: "en",
	requestSource: "fb"
});
const sessionIds = new Map();


// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
		res.status(200).send(req.query['hub.challenge']);
	} else {
		file.log("L72 Failed validation. Make sure the validation tokens match.");
		res.sendStatus(403);
	}
})

/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page.
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post('/webhook/', function (req, res) {
	var data = req.body;
	file.log('L86: ',JSON.stringify(data));



	// Make sure this is a page subscription
	if (data.object == 'page') {
		// Iterate over each entry
		// There may be multiple if batched
		data.entry.forEach(function (pageEntry) {
			var pageID = pageEntry.id;
			var timeOfEvent = pageEntry.time;

			// Iterate over each messaging event
			pageEntry.messaging.forEach(function (messagingEvent) {
				if (messagingEvent.optin) {
					src.ReceivedAuthentication(messagingEvent);
				} else if (messagingEvent.message) {
					receivedMessage(messagingEvent);
				} else if (messagingEvent.delivery) {
					src.ReceivedDeliveryConfirmation(messagingEvent);
				} else if (messagingEvent.postback) {
					src.ReceivedPostback(messagingEvent);
				} else if (messagingEvent.read) {
					src.ReceivedMessageRead(messagingEvent);
				} else if (messagingEvent.account_linking) {
					src.ReceivedAccountLink(messagingEvent);
				} else {
					// file.log("L113 Webhook received unknown messagingEvent: ", messagingEvent);
					console.log("Webhook received unknown messagingEvent: ", messagingEvent);
				}
			});
		});

		// Assume all went well.
		// You must send back a 200, within 20 seconds
		res.sendStatus(200);
	}
});





function receivedMessage(event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;

	if (!sessionIds.has(senderID)) {
		sessionIds.set(senderID, uuid.v1());
	}
	// file.log("L139 Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
	// file.log("L140 message: ",JSON.stringify(message));

	var isEcho = message.is_echo;
	var messageId = message.mid;
	var appId = message.app_id;
	var metadata = message.metadata;

	// You may get a text or attachment but not both
	var messageText = message.text;
	var messageAttachments = message.attachments;
	var quickReply = message.quick_reply;

	if (isEcho) {
		src.HandleEcho(messageId, appId, metadata);
		return;
	} else if (quickReply) {
		handleQuickReply(sessionIds.get(senderID), senderID, quickReply, messageId);
		return;
	}


	if (messageText) {
		//send message to api.ai
		AIapi.SendToApiAi(sessionIds.get(senderID), senderID, messageText);
	} else if (messageAttachments) {
		src.HandleMessageAttachments(messageAttachments, senderID);
	}
}


function handleQuickReply(sessionID, senderID, quickReply, messageId) {
	var quickReplyPayload = quickReply.payload;
	// file.log("L177 Quick reply for message %s with payload %s", messageId, quickReplyPayload);
	//send payload to api.ai
	AIapi.SendToApiAi(sessionID, senderID, quickReplyPayload);
}

function handleApiAiAction(sender, action, responseText, contexts, parameters) {
	switch (action) {
		// case 'detailed-application':
		// 	if(isDefined(contexts[0]) && contexts[0].name =="job_application" &&contexts[0].parameters){
		// 		file.log("L192 content is: ",contexts[0].parameters)
		// 	}
		// 	break;
		case 'job-enquiry':
			let replies = [
	      {
					"content_type":"text",
	        "title":"Sales Assistant",
	        "payload":"Sales Assistant"
	      },
	      {
					"content_type":"text",
	        "title":"Accountant",
	        "payload":"Accountant"
	      },
	      {
	        "content_type":"text",
	        "title":"Not interested",
	        "payload":"Not interested"
	      }
	    ]
			src.SendQuickReply(sender, responseText, replies);
			break;
		default:
			//unhandled action, just send back the text
			src.SendTextMessage(sender, responseText);
	}
}

// function sendToApiAi(sender, text) {
//
// 	src.TypingOn(sender);
// 	let apiaiRequest = apiAiService.textRequest(text, {
// 		sessionId: sessionIds.get(sender)
// 	});
//
// 	apiaiRequest.on('response', (response) => {
// 		if (isDefined(response.result)) {
// 			src.HandleApiAiResponse(sender, response);
// 		}
// 	});
//
// 	apiaiRequest.on('error', (error) => file.log('L343 ',error));
// 	apiaiRequest.end();
// }

function isDefined(obj) {
	if (typeof obj == 'undefined') {
		return false;
	}

	if (!obj) {
		return false;
	}

	return obj != null;
}

// Spin up the server
module.exports = app;
