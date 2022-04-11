import mail from '@sendgrid/mail';
import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const { from, subject, message } = JSON.parse(event.body);

    mail.setApiKey(process.env.SENDGRID_API_KEY);
    mail.send({
      from: "George Fairbairn - Website Contact Form <georgefairbairn.portfolio@gmail.com>",
      to: "George Fairbairn <george.fair@icloud.com>",
      subject,
      text: `New message from ${from}: ${message}`,
    });


  return {
    statusCode: 200,
    body: JSON.stringify({ from, subject, message }),
  };
};

export { handler };
