const FBapi = require('../../FBapi')

/*
 * Send a message with Quick Reply buttons.
 *
 */
module.exports =function(recipientId, text, replies, metadata) {
	// file.log("L578 sendQuickReply: recipientId: ",recipientId," text: ",text," replies: ",replies)
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: text,
			metadata: isDefined(metadata)?metadata:'',
			quick_replies: replies
		}
	};

	FBapi.SendToFBApi(messageData);
}

function isDefined(obj) {
	if (typeof obj == 'undefined') {
		return false;
	}

	if (!obj) {
		return false;
	}

	return obj != null;
}
