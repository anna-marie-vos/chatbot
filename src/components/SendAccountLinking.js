
const FBapi = require('../../FBapi');
const config = require('../../config');

/*
 * Send a message with the account linking call-to-action
 *
 */
module.exports =function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "button",
					text: "Welcome. Link your account.",
					buttons: [{
						type: "account_link",
						url: config.SERVER_URL + "/authorize"
          }]
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
