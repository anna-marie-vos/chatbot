const api = require('../../api');
const file = require('manu-file-log');

/*
* Turn typing indicator off
*/

module.exports = function(recipientId){
	file.log('typing off')
		const messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_off"
		};
		api.SendAPI(messageData);
}
