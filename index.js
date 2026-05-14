const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/whatsapp", (req, res) => {

    const twiml = new MessagingResponse();

    const msg = req.body.Body.toLowerCase().trim();

    if (msg === "hi" || msg === "hello" || msg === "start") {

        twiml.message("Welcome to Water Leakage Support 🚰\n\n1️⃣ Pipe Leakage\n2️⃣ Tank Overflow\n3️⃣ Tap Leakage\n4️⃣ Bathroom Leakage\n5️⃣ Kitchen Sink Leakage\n\nReply with a number.");

    } else if (msg === "1") {

        twiml.message("Pipe Leakage selected 🚰\n\nSend:\n• Leak photo/video\n• Location\n• Urgency");

    } else if (msg === "2") {

        twiml.message("Tank Overflow selected 💧\n\nSend:\n• Tank photo/video\n• Address");

    } else if (msg === "3") {

        twiml.message("Tap Leakage selected 🚿\n\nSend:\n• Tap photo");

    } else if (msg === "4") {

        twiml.message("Bathroom Leakage selected 🚽\n\nSend:\n• Leakage area photo");

    } else if (msg === "5") {

        twiml.message("Kitchen Sink Leakage selected 🍽️\n\nSend:\n• Sink photo");

    } else {

        twiml.message("Invalid option ❌\n\nReply with 1, 2, 3, 4 or 5");

    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Bot running on port ${PORT}`);
});