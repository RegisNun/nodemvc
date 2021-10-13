'use strict'

var config = require('../config');
const sgMail = require('@sendgrid/mail');

exports.sendEmail = async (subject, to_email, html, text = 'sadadads') => {
    try {
     sgMail.setApiKey(config.sendGridkey);
     const msg = {
      to: to_email,
      from: 'regisnunes2008@hotmail.com',
      subject: subject,
      text: 'sadadads',
      html: 'sadadads',
     };
     console.log('sending email from ' + msg.from);
     sgMail
      .send(msg)
      .then(() => {
       console.log('Confirmation email sent');
      })
      .catch((error) => {
       console.log(error.response.body);
      });
    } catch (err) {
     console.log('EMAIL NOT SENT');
     console.log(err);
    }
   }
