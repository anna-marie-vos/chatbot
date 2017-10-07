const Actions = require('./Actions');

/*
 * Turn typing indicator on
 */
function typingOn(recipientId) {
	var messageData = {
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


	var messageData = {
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
