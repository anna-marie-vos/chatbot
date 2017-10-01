# chatbot
Creating chatbots with api.ai
* use for request documentation: https://github.com/request/request

## To use a tunneler to connect to localhost
* Install ngrok: this is a development tunneling software.
* this makes so that you can access localhost while developing and communicating with your chatbot.
* https://ngrok.com/
* download the ngrok for linux. Go to the downloads folder and extract it from the zip file.
* then copy it to the usr/bin file: `sudo cp ngrok /usr/bin/`
* then in terminal: `ngrok` and you'll get the info about ngrok.
* to serve the localhost type in terminal: `ngrok http 5000` this makes the localhost live.
* facebook messenger needs https, so be sure to use the https link
* important: remember to update your webhook link:
* https://stackoverflow.com/questions/36685220/how-do-i-change-facebook-messenger-bot-webhook
* also change the config.js file: `ERVER_URL: "https://c6751e7c.ngrok.io/",`
