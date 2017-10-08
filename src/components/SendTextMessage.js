const api = require('../../api')

module.exports =function(recipientId, text){
  	var messageData = {
  		recipient: {
  			id: recipientId
  		},
  		message: {
  			text: text
  		}
  	}
  	api.SendAPI(messageData);
}
