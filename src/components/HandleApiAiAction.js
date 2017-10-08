const FBapi = require('../../FBapi')
const SendQuickReply = require('./SendQuickReply')
const SendTextMessage = require('./SendTextMessage')

module.exports =function(sender, action, responseText, contexts, parameters) {
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
			SendQuickReply(sender, responseText, replies);
			break;
		default:
			//unhandled action, just send back the text
			SendTextMessage(sender, responseText);
	}
}
