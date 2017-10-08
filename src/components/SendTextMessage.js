const FBapi = require('../../FBapi')

module.exports =function(recipientId, text){
  	var messageData = {
  		recipient: {
  			id: recipientId
  		},
  		message: {
  			text: text
  		}
  	}
  	FBapi.SendToFBApi(messageData);
}
