import type { NextApiRequest, NextApiResponse } from 'next'

interface RequestBody {
    key: string;
    captchaToken: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    const { key, captchaToken } = req.body as RequestBody;
    
    if (key !== process.env.NEXT_PUBLIC_EXTERNAL_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

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
