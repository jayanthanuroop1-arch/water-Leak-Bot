const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/whatsapp", (req, res) => {

    const twiml = new MessagingResponse();

    const msg = req.body.Body.toLowerCase().trim();

    if (
        msg === "hi" ||
        msg === "hello" ||
        msg === "start"
    ) {

        twiml.message(
`Welcome to Water Leakage Support 🚰

Please select an option:

1️⃣ Pipe Leakage
2️⃣ Tank Overflow
3️⃣ Tap Leakage
4️⃣ Bathroom Leakage
5️⃣ Kitchen Sink Leakage

Reply with a number.`
        );

    }

    else if (msg === "1") {

        twiml.message(
`Pipe Leakage selected 🚰

Please send:
• Leak photo/video
• Your location
• Urgency level`
        );

    }

    else if (msg === "2") {

        twiml.message(
`Tank Overflow selected 💧

Please send:
• Tank photo/video
• Address
• Approx overflow level`
        );

    }

    else if (msg === "3") {

        twiml.message(
`Tap Leakage selected 🚿

Please send:
• Tap photo
• Is water continuously leaking?`
        );

    }

    else if (msg === "4") {

        twiml.message(
`Bathroom Leakage selected 🚽

Please send:
• Leakage area photo
• Floor/wall details`
        );

    }

    else if (msg === "5") {

        twiml.message(
`Kitchen Sink Leakage selected 🍽️

Please send:
• Sink photo
• Pipe condition`
        );

    }

    else {

        twiml.message(
`Invalid option ❌

Reply with:
1, 2, 3, 4 or 5`
        );

    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Bot running on port ${PORT}`);
});