const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6ed76356bd38bd",
      pass: "580bd6d9b943f2"
    }
});

module.exports = {
  transport
}