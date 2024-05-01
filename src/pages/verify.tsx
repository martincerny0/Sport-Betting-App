import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { Base64 } from 'js-base64';
import { api } from "~/utils/api";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';



// export default function handler(req: NextApiRequest, res: NextApiResponse) {

  
//   const hashedEmail = req.query.e as string;
//   const email = Base64.decode(hashedEmail);
//   // const hashedEmail = "bWFydGluY2VybnlAdm9sbnkuY3o";
//   // const email = Base64.decode(hashedEmail); 
//   const verifyEmail = api.user.verifyEmail.useMutation();
//   verifyEmail.mutate({ email: email });
//   res.status(200).json( email );
// }

const Verify : NextPage = () => {

  const verifyEmailMutation = api.user.verifyEmail.useMutation();
  const isEmailVerifiedQuery = api.user.isEmailVerified.useQuery({ email: ""});
  const [canRefetch, setCanRefetch] = useState(false);
  const [email, setEmail] = useState("");

  canRefetch && (async () => await isEmailVerified());

  const isEmailVerified = async () => {
    await isEmailVerifiedQuery.useQuery({ email: email});
    console.log(isEmailVerifiedQuery.data);
  }

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (router.isReady) {
      setCanRefetch(true);
      // Use `router.query.name` only after confirming router is ready

    }
  }, [router.isReady, router.query.name]);

  const verifyEmail = () => {
    const hashedEmail = query.e as string;
    console.log(hashedEmail);
    setEmail(Base64.decode(hashedEmail));
    verifyEmailMutation.mutate({ email: email });
  }

  return (
    <div>
      <h1>Verifying email</h1>
      <button onClick={verifyEmail}>Verifyedwzhefrgzhýgzerfgfzrgfrz</button>
    </div>
  )
}

export default Verify;