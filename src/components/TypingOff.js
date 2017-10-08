const FBapi = require('../../FBapi');
const file = require('manu-file-log');

/*
* Turn typing indicator off
*/

module.exports = function(recipientId){
		const messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_off"
		};
		FBapi.SendToFBApi(messageData);
}
