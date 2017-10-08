const api = require('../../api')
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

	api.SendAPI(messageData);
}
