const apiai = require('apiai');
const config = require('../config');
const src = require('../src')
const file = require('manu-file-log')

  const sessionIds = new Map();

module.exports = function(sessionID, sender, text) {

  const apiAiService = apiai(config.API_AI_CLIENT_ACCESS_TOKEN, {
  	language: "en",
  	requestSource: "fb"
  });

	src.TypingOn(sender);
	let apiaiRequest = apiAiService.textRequest(text, {
		sessionId: sessionID
	});

	apiaiRequest.on('response', (response) => {
		if (isDefined(response.result)) {
			src.HandleApiAiResponse(sender, response);
		}
	});

	apiaiRequest.on('error', (error) => file.log('L343 ',error));
	apiaiRequest.end();
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
