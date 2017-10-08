const api = require('../../api');
const file = require('manu-file-log');

module.exports = function(recipientId){
	/*
	* Turn typing indicator off
	*/
		const messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_off"
		};
		api.SendAPI(messageData);
}
