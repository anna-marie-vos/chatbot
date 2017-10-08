const FBapi = require('../../FBapi');
const file = require('manu-file-log');

module.exports = function(recipientId){
	/*
	* Turn typing indicator on
	*/
		const messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_on"
		};
		FBapi.SendToFBApi(messageData);
}
