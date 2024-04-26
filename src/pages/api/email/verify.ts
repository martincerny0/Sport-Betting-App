import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';

interface RequestBody {
        key: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
                if (req.method !== 'POST' && req.method !== 'GET' ) res.status(405).json({ error: 'Invalid method declaration' });
                if((req.body as RequestBody).key !== process.env.EMAIL_API_KEY) res.status(401).json({ error: 'Unauthorized' });

                const { email, subject, text } = req.body;

                const transporter = nodemailer.createTransport({
                  host: "smtp.example.com", // Replace with your mail server host
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: process.env.EMAIL_USERNAME, // Loaded from environment variable
                    pass: process.env.EMAIL_PASSWORD, // Loaded from environment variable
                  },
                });

                try {
                    const info = await transporter.sendMail({
                      from: '"Example Sender" <sender@example.com>', // sender address
                      to: email, // list of receivers
                      subject: subject, // Subject line
                      text: text, // plain text body
                      html: `<b>${text}</b>`, // HTML body content
                    });
              
                    res.status(200).json({ message: 'Email sent successfully', info });
                  } catch (error) {
                    res.status(500).json({ message: 'Failed to send email', error: error.message });
                  } xx


                res.status(200).json({ name: 'John Doe' });
}