const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const users = {};

app.get("/", (req, res) => {
  res.send("Water Leakage Bot Running");
});

app.post("/whatsapp", (req, res) => {

  const twiml = new MessagingResponse();

  const from = req.body.From;
  const msg = req.body.Body ? req.body.Body.trim() : "";

  if (!users[from]) {

    users[from] = {
      step: 0,
      issue: "",
      address: "",
      location: "",
      pincode: "",
      phone: ""
    };
  }

  const user = users[from];

  // START
  if (
    msg.toLowerCase() === "hi" ||
    msg.toLowerCase() === "hello" ||
    msg.toLowerCase() === "start"
  ) {

    user.step = 1;

    twiml.message(
`🚰 Welcome to Water Leakage Repair Service

Select your leakage issue:

1️⃣ Pipe Leakage
2️⃣ Tank Overflow
3️⃣ Tap Leakage
4️⃣ Bathroom Leakage
5️⃣ Kitchen Sink Leakage

Reply with a number.`
    );
  }

  // ISSUE SELECT
  else if (user.step === 1) {

    const issues = {
      "1": "Pipe Leakage",
      "2": "Tank Overflow",
      "3": "Tap Leakage",
      "4": "Bathroom Leakage",
      "5": "Kitchen Sink Leakage"
    };

    if (issues[msg]) {

      user.issue = issues[msg];

      user.step = 2;

      twiml.message(
`✅ Selected Issue: ${user.issue}

📍 Please enter your full address`
      );

    } else {

      twiml.message(
`❌ Invalid option

Reply only with:
1, 2, 3, 4 or 5`
      );
    }
  }

  // ADDRESS
  else if (user.step === 2) {

    user.address = msg;

    user.step = 3;

    twiml.message(
`📌 Please share your LIVE LOCATION

In WhatsApp:
Attachment → Location → Send Current Location`
    );
  }

  // LOCATION
  else if (user.step === 3) {

    if (req.body.Latitude && req.body.Longitude) {

      user.location =
`Latitude: ${req.body.Latitude}, Longitude: ${req.body.Longitude}`;

      user.step = 4;

      twiml.message(
`📮 Please enter your PINCODE`
      );

    } else {

      twiml.message(
`❌ Please send your LIVE LOCATION properly

Use:
Attachment → Location`
      );
    }
  }

  // PINCODE
  else if (user.step === 4) {

    user.pincode = msg;

    user.step = 5;

    twiml.message(
`📞 Please enter your PHONE NUMBER`
    );
  }

  // PHONE
  else if (user.step === 5) {

    user.phone = msg;

    user.step = 6;

    console.log("NEW COMPLAINT");
    console.log(user);

    twiml.message(
`✅ Complaint Registered Successfully

🛠️ Issue: ${user.issue}

📍 Address: ${user.address}

📮 Pincode: ${user.pincode}

📞 Phone: ${user.phone}

Technician will contact you shortly.`
    );
  }

  // DEFAULT
  else {

    twiml.message(
`Send HI to start again`
    );
  }

  res.writeHead(200, {
    "Content-Type": "text/xml"
  });

  res.end(twiml.toString());
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});