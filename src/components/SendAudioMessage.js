const FBapi = require('../../FBapi')

module.exports =function(recipientId){
  var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "audio",
				payload: {
					url: config.SERVER_URL + "../../public/assets/sample.mp3"
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
