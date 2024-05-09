import type { NextApiRequest, NextApiResponse } from 'next'

interface RequestBody {
    captchaToken: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    const { captchaToken } = req.body as RequestBody;

    try {
        
        const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/betton-421818/assessments?key=${process.env.GOOGLE_RECAPTCHA_SECRET}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: { token: captchaToken, siteKey: process.env.GOOGLE_RECAPTCHA_SITE}
            })
        });
        

        if (response.status !== 200) {
            return res.send(400);
        }

        return res.status(200);
    } catch (e) {
        return res.status(500);
    }
}
