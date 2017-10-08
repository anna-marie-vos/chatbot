const FBapi = require('../../FBapi')


module.exports =function(recipientId, elements) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "generic",
					elements: elements
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
