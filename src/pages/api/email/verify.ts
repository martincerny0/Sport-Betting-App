import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';


interface RequestBody {
        token: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { token } = req.body as RequestBody;
  
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
      subject: 'Email Verification',
      text: `You are receiving this because you (or someone else) have requested the verification of your email address.\n\n go to this link to verify your email address\n\n http://localhost:3000/verify?t=${token} \n\n`,
    };
    
    transporter.sendMail(mailOptions, (error) => {
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