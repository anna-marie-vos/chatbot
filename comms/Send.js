const Actions = require('./Actions');

/*
 * Turn typing indicator on
 */
function typingOn(recipientId) {
	const messageData = {
		recipient: {
			id: recipientId
		},
		sender_action: "typing_on"
	};
	Actions.callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 */
function typingOff(recipientId) {
	const messageData = {
		recipient: {
			id: recipientId
		},
		sender_action: "typing_off"
	};
	Actions.callSendAPI(messageData);
}

module.exports = {
  typingOn,
  typingOff,
}
