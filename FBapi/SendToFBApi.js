const request = require('request');
const config = require('../config');
const file = require('manu-file-log');

/*
* Call the Send API. The message data goes in the body. If successful, we'll
* get the message id in a response
*/

module.exports = function(messageData){
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: config.FB_PAGE_TOKEN
    },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        file.log("comms/actions.callSendAPI L20, Successfully sent message with id %s to recipient %s",
        messageId, recipientId);
      } else {
        file.log("comms/actions.callSendAPI L20, Successfully called Send API for recipient %s",
        recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}
