import nodemailer from "nodemailer";

/**
 * SendEmail
 *
 * This class will facilitate the sending of email.
 */
class SendEmail
{
    static async do(options)
    {
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mail_options = {
            from: process.env.EMAIL_FROM,
            to: options.to,
            subject: options.subject,
            html: options.text
        }
        transporter.sendMail(
            mail_options,
            function(error, information)
            {
                if(error) {
                    console.log(error);
                } else
                {
                    console.log(information)
                }
            }
        )
    }
}

// Export the email class.
export default SendEmail;