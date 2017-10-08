const api = require('../../api')
const SendTextMessage = require('./SendTextMessage')

module.exports =function(messageAttachments, senderID){
	//for now just reply
	SendTextMessage(senderID, "Attachment received. Thank you.");
}
