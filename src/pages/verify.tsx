import { use, useEffect } from 'react';
import { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { api } from '~/utils/api';
import Link from 'next/link';
import LoadingOverlay from '~/common/modules/components/LoadingOverlay/LoadingOverlay';
import Head from 'next/head';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.query.t as string ?? "";
  const inviteCode = context.query.invite as string ?? "";
  return { props: { token, inviteCode } };
};

const Verify: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ token, inviteCode }) => {

  const { data, error, isLoading } = api.user.isEmailVerified.useQuery({token});
  const useInviteCode = api.user.useInviteCode.useMutation();
  const verifyEmail = api.user.verifyEmail.useMutation();
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  useEffect(() => {
    if (data?.emailVerified) {
      
    }
    else if (!isLoading && !data?.emailVerified) {
      verifyEmail.mutate({userId: data?.userId?? ""});
      if(error) return console.log(error);
       useInviteCode.mutate({inviteCode: inviteCode});
    }
  }, [data, isLoading, token]);



  return (
    <>
    <Head>
    <title>Verify Email | Betton</title>
    </Head>
    <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
      {isLoading && <LoadingOverlay isPending={isLoading}/>}
        <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="flex h-min min-h-min justify-center items-center flex-row px-5 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <div className="flex h-min min-h-min justify-center items-start flex-col bg-no-repeat bg-contain bg-center " style={{backgroundImage: `url(https://files.oaiusercontent.com/file-nuNg8AWXL4DnLoWCfgvT0r8p?se=2024-04-24T21%3A13%3A27Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dd7f97d29-aef6-4947-995a-e153f267aac9.webp&sig=zANYeHLvJ8pD%2BsNQWqOHov4IilBbpdfTuRG2d8Nvjbo%3D)`}}>
                    <p className="font-extrabold text-xl my-1">betton</p>
                    <div className="w-52 text-xl flex min-h-min justify-center items-center flex-col p-2 z-10 mb-8 py-[85px] bg-cover bg-center h-64 rounded-xl " style={{backgroundImage: `url(./images/loginbg.webp)`}}>
                            <div className="flex h-64 min-h-64 justify-center items-center  w-52 rounded-xl flex-col bg-gradient-to-b font-bold  from-[#FFD355] via-[#D33469] to-[#40348A] opacity-90">
                            <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">Catch the action,</p>
                            <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">raise the game,</p>
                            <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">seize your moment!</p>
                    </div>
                </div>
                </div>
                <div className="flex h-72 justify-center items-center flex-col p-[0.5px] mx-8 bg-slate-600 rounded">
                
                </div>
                <div className="flex h-min min-h-min justify-center items-center flex-col  rounded text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">
                <h1 className="text-xl font-bold mb-8">VERIFY EMAIL</h1>
                <div className="font-bold text-sm text-center">
                  {error ? (<>
                    <p className='text-center'>Error verifying email. Please try again.</p>
                  </>) : (<>
                    <p className='text-center mb-8 min-w-80'>{alreadyVerified ? "Email is already verified!" : `Succes! Email was verified, you're free to sign in now!`}</p>
                    <Link className="font-bold text-xs hover:text-[#FFC701] ease-in-out duration-300" href="/signin">GO TO SIGN IN</Link>
                  </>)}
                </div>
                </div>
            </div>
        </div>
    </div>
</>
)
};

export default Verify;
