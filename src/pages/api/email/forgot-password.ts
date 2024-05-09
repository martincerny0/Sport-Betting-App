import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';

interface RequestBody {
        recipient: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { recipient } = req.body as RequestBody;
  const email = recipient;
  
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: "martanek500game@gmail.com",
      to: "martincerny@volny.cz",
      subject: 'Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
      + `http://localhost:3000/reset-password?email=${email}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ status: 'Success' });
      }
    });
  }
  catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });

  }
}