const api = require('../../api')
const src = require('../../src')
/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 *
 */
module.exports =function(event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;

	// The 'payload' param is a developer-defined field which is set in a postback
	// button for Structured Messages.
	var payload = event.postback.payload;

	switch (payload) {
		default:
			//unindentified payload
			src.SendTextMessage(senderID, "I'm not sure what you want. Can you be more specific?");
			break;

	}

	// file.log("L738 Received postback for user %d and page %d with payload '%s' " ,
	// 	"at %d", senderID, recipientID, payload, timeOfPostback);

}
