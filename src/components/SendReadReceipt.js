const FBapi = require('../../FBapi')
/*
 * Send a read receipt to indicate the message has been read
 *
 */
module.exports =function(recipientId) {

	var messageData = {
		recipient: {
			id: recipientId
		},
		sender_action: "mark_seen"
	};

	FBapi.SendToFBApi(messageData);
}
