const api = require('../../api')

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

	api.SendAPI(messageData);
}
