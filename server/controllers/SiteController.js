const express = require("express");
const mongodb = require("mongodb");
const EmailSignUp = require("../models/EmailSignUp");
const ContactRequest = require("../models/ContactRequest");
const nodemailer = require("nodemailer");
require("dotenv").config();

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
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIPIENT_EMAILS,
        subject: "POP UPDATE: New user signed up!",
        html: `<h3> ${req.body.email} </h3> <p> has signed up</p>`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    })
    .catch(() => {
      res.status(400).json({ error: "Could not add email" });
    });
});

router.post("/contact", (req, res) => {
  const newContactRequest = new ContactRequest({ ...req.body });
  newContactRequest
    .save()
    .then((contactRequest) => {
      res.status(201).json(contactRequest);
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIPIENT_EMAILS,
        subject: "POP UPDATE: New contact request received!",
        html: `<h3> ${req.body.firstName} ${req.body.lastName}, ${req.body.email} </h3> <p> Says: </p> <h3> ${req.body.message} </h3> <p> Respond now :) </p>`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    })
    .catch(() => {
      res.status(400).json({ error: "Could not add contact request" });
    });
});

module.exports = router;
