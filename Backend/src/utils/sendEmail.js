import nodemailer from 'nodemailer';

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