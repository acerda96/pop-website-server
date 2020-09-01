const express = require("express");
const mongodb = require("mongodb");
const SignUpEmail = require("./models/SignUpEmail");
const Contact = require("./models/Contact");

const router = express.Router();

router.post("/email-signup", (req, res) => {
  const newSignUp = new SignUpEmail({ email: req.body.email });
  newSignUp
    .save()
    .then((signup) => {
      res.status(201).json(signup);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ error: "Could not add email" });
    });
});

router.post("/contact", (req, res) => {
  const newContact = new Contact({ ...req.body });
  // FIXME: send email copy here to us
  newContact
    .save()
    .then((contact) => {
      res.status(201).json(contact);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ error: "Could not add contact" });
    });
});

module.exports = router;
