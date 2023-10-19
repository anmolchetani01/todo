import nodemailer from "nodemailer"

export default class NotificationAdapter {
    public sendOtp = async (otp?: string, email?: string) => {
        try {
          // Create a Nodemailer transporter with your email service configuration
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port:465,
            secure:true,
            secureConnection:false,
            auth: {
              user: process.env.GMAIL_USER, // Your email address
              pass: process.env.GMAIL_PASS, // Your email password or an "App Password" if enabled
            },
            tls:{
              rejectUnAuthorized:true
            }
          });
      
          // Define the email message
          const mailOptions = {
            from: 'anmolchetani@gmail.com',
            to: email,
            subject: 'Hello from Nodemailer',
            text: `This is a test email sent from Nodemailer.Your otp is ${otp}`,
          };

          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent:', info.response);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      
  };
}