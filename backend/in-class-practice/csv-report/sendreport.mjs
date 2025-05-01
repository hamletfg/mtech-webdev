// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'fiona.morar@ethereal.email',
    pass: 'AuwapyDvSvBtFMuVb3',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hi Maddie!', // Subject line
    text: 'Hi Maddie! How have you been?', // plain text body
    html: '<h1>Hi Maddie! How have you been?</h1>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
