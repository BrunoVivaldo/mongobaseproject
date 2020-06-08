const sendMail = require('@sendgrid/mail');
require('dotenv').config();

sendMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = sendMail;
