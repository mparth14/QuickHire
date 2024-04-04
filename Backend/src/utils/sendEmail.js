/**
 * @authors 
 * Rahul Hambarde
 */
import nodemailer from 'nodemailer';

/**
 * Send an email to given address
 * @param {*} emailAddress Address to email to
 * @param {*} subject The subject of the email
 * @param {*} text The content of the email
 */
const sendEmail = async (emailAddress, subject, text) => {
    try {
        const transporter = nodemailer.createTransport( {
            host: 'smtp.gmail.com',
            service: "Gmail",
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: emailAddress,
            subject: subject,
            text: text
        })
    } catch(error){
        console.error("Email not sent: ", error);
    }
}

export default sendEmail;