const FBapi = require('../../FBapi')

/*
 * Send a button message using the Send API.
 */
module.exports =function(recipientId, text, buttons) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "button",
					text: text,
					buttons: buttons
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
