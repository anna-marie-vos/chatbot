const FBapi = require('../../FBapi')

/*
 * Send a video using the Send API.
 * example fileName: fileName"/assets/test.txt"
 */
module.exports =function(recipientId, fileName) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "file",
				payload: {
					url: config.SERVER_URL + fileName
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
