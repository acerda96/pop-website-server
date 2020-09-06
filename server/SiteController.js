const express = require("express");
const mongodb = require("mongodb");
const EmailSignUp = require("./models/EmailSignUp");
const ContactRequest = require("./models/ContactRequest");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Hello and welcome to the pop-marketplace web-api :)");
});

router.post("/email-signup", (req, res) => {
  const newSignUp = new EmailSignUp({ email: req.body.email });
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
  const newContactRequest = new ContactRequest({ ...req.body });
  // FIXME: send email copy here to us
  newContactRequest
    .save()
    .then((contactRequest) => {
      res.status(201).json(contactRequest);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ error: "Could not add contact request" });
    });
});

module.exports = router;
