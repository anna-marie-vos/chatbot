const FBapi = require('../../FBapi')

module.exports =function(recipientId, videoName) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "video",
				payload: {
					url: config.SERVER_URL + videoName
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
