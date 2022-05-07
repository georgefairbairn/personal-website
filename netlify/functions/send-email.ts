import mail from '@sendgrid/mail';
import { Handler } from "@netlify/functions";

mail.setApiKey(process.env.SENDGRID_API_KEY);

const handler: Handler = async (event) => {
  const { from, subject, message } = JSON.parse(event.body);

  try {
    await mail.send({
      from: "George Fairbairn - Website Contact Form <inbox@georgefairbairn.dev>",
      to: "George Fairbairn <george.fair@icloud.com>",
      subject,
      text: `New message from ${from}: ${message}`,
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email.' }),
    };
  }
};

export { handler };
