const express = require('express');
const twilio = require('twilio');

const app = express();

app.use(express.urlencoded({ extended: false }));

// Store users temporarily
const users = {};

app.post('/whatsapp', (req, res) => {

  const message = req.body.Body.toLowerCase();
  const sender = req.body.From;

  const twiml = new twilio.twiml.MessagingResponse();

  // Create user session
  if (!users[sender]) {

    users[sender] = {
      step: 1
    };

    twiml.message(
      'Hello 👋 Welcome to Water Leakage Repair Service.\nWhat issue are you facing?'
    );

  } else {

    const step = users[sender].step;

    // STEP 1
    if (step === 1) {

      users[sender].issue = message;
      users[sender].step = 2;

      twiml.message(
        'Please share your address 📍'
      );

    }

    // STEP 2
    else if (step === 2) {

      users[sender].address = message;
      users[sender].step = 3;

      twiml.message(
        'Please share your contact number ☎️'
      );

    }

    // STEP 3
    else if (step === 3) {

      users[sender].phone = message;

      twiml.message(
        'Thank you ✅ Our technician will contact you shortly.'
      );

      console.log(users[sender]);

      // Reset conversation
      delete users[sender];

    }

  }

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });

  res.end(twiml.toString());

});

app.listen(5000, () => {
  console.log('Bot running on port 5000');
});