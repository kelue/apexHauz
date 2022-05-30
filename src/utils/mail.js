const { default: Mailgun } = require('mailgun.js');
const formData = require('form-data');
require('dotenv').config();

const mailgun = new Mailgun(formData);

const mailClient = mailgun.client({
    key: process.env.MAILGUN_API_KEY,
    username: 'api',
});

module.exports = {
    mailClient,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_SENDER: process.env.MAIL_FROM_SENDER,
}