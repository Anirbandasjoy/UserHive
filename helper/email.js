const { nodemailer } = require("./require");
const { smtpUserName, smtpPassword } = require("./secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

const sendingEmail = async (emailData) => {
  try {
    const options = {
      from: smtpUserName,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    const info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendingEmail;
