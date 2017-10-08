const FBapi = require('../../FBapi')

module.exports =function(recipientId){
  var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "image",
				payload: {
					url: config.SERVER_URL + "../../public/assets/instagram_logo.gif"
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
