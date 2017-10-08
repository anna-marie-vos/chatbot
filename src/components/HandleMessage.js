const FBapi = require('../../FBapi')
const SendQuickReply = require('./SendQuickReply')
const SendTextMessage = require('./SendTextMessage')
const SendImageMessage = require('./SendImageMessage')

module.exports =function(message, sender) {
	switch (message.type) {
		case 0: //text
			SendTextMessage(sender, message.speech);
			break;
		case 2: //quick replies
			let replies = [];
			for (var b = 0; b < message.replies.length; b++) {
				let reply =
				{
					"content_type": "text",
					"title": message.replies[b],
					"payload": message.replies[b]
				}
				replies.push(reply);
			}
			SendQuickReply(sender, message.title, replies);
			break;
		case 3: //image
			SendImageMessage(sender, message.imageUrl);
			break;
		case 4:
			// custom payload
			var messageData = {
				recipient: {
					id: sender
				},
				message: message.payload.facebook

			};

			FBapi.SendToFBApi(messageData);

			break;
	}
}
