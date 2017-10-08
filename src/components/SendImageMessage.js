const FBapi = require('../../FBapi')

module.exports =function(recipientId, imageUrl){
  var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "image",
				payload: {
					url: imageUrl
				}
			}
		}
	};

	FBapi.SendToFBApi(messageData);
}
