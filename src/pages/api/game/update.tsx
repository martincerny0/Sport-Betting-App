import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
 
type ResponseData = {
  message: string
}


export default function handler( req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if(req.method === "POST"){
        if(req.headers['api-key'] === env.GAME_API_KEY){
            return res.status(200).json({ message: 'Hello from Next.js! POST' })
        }
        return res.status(401).json({ message: 'Unauthorized' })
    }
    return res.status(200).json({ message: 'Hello from Next.js!' })
}