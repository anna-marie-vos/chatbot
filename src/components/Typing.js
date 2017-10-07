const api = require('../../api');

module.exports = function(recipientId){
	/*
	* Turn typing indicator on
	*/
	function On(recipientId) {
		const messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_on"
		};
		api.SendAPI(messageData);
	}
	/*
	* Turn typing indicator off
	*/
	function Off(recipientId) {
		const messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_off"
		};
		api.SendAPI(messageData);
	}
}
