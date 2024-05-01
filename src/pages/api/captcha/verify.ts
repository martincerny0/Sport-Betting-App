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
        const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/betton-421818/assessments?key=6LfQQcspAAAAAHOQjOYuSM7cwgPP2HlGIrkHpooI`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: { token: captchaToken, siteKey: "6LfQQcspAAAAAMxE6-xkjCrmHgdmO1VL8iYUsVDq" }
            })
        });
        const data = await response.json(); 

        if (!data.success) {
            return res.send(400).json({status: 'failed', errors: data.errorMessages}) ;
        }

        return res.status(200).json({status: 'success'});
    } catch (e) {
        return res.status(500).json({error: 'Internal Server Error'});
    }
}
