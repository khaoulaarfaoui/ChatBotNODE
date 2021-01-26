/* EXERCICE 3: BUILD A MESSENGER CHATBOT USING NODE.JS */

"use strict";

/*REQUIREMENTS*/
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const tokens = require("./config");

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let token = tokens.config.MY_API_TOKEN;
/* Index route*/
app.get("/", function (req, res) {
  res.send("Hello world, I am a chat bot");
});

/* Facebook verification*/
app.get("/webhook/", function (req, res) {
  if (req.query["hub.verify_token"] === tokens.config.SECRET_HUB_KEY) {
    res.send(req.query["hub.challenge"]);
  }
  res.send("Error, wrong token");
});

/*CHAT BOT ANSWERS BASED ON DIFFRENT INPUTS FROM THE CLIENT*/
app.post("/webhook/", function (req, res) {
  let messaging_events = req.body.entry[0].messaging;
  //iterate over the msgs
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;

    // Check if it's a message
    if (event.message) {
      if (event.message.attachments) {
        sendTextMessage(sender, "Je ne sais pas traiter ce type de demande!!!");
      }
      // Here you can handle the text
      else if (event.message.text) {
        let text = event.message.text;
        if (text === "Comment vas-tu ?") {
          //this will generate card with buttons reply
          sendGenericMessage(sender);
          continue;
        }
        //otherwise just get echo the user what he sent
        sendTextMessage(sender, "echo: " + text.substring(0, 200), token);
      }
    }
    //if postback action was fired
    if (event.postback) {
      let text = JSON.stringify(event.postback);
      sendTextMessage(
        sender,
        "Postback received: " + text.substring(0, 200),
        token
      );
      continue;
    }
  }

  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  let messageData = { text: text };
  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData,
      },
    },
    function (error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}

/*SENDING GENERIC FUNCTION FOR REPLYING WITH STURCTURED MSGS*/
function sendGenericMessage(sender) {
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Très bien et vous ?",
            buttons: [
              {
                type: "postback",
                title: "Je vais bien merci",
                payload: "Je vais bien merci",
              },
              {
                type: "postback",
                title: "Non, ça ne va pas",
                payload: "Non, ça ne va pas",
              },
            ],
          },
        ],
      },
    },
  };
  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData,
      },
    },
    function (error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}

/* SPIN UP THE SERVER */
app.listen(app.get("port"), function () {
  console.log("running on port", app.get("port"));
});
