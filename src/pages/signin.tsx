import { NextPage } from "next";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

const SignIn : NextPage = () => {

    const [email, setEmail] = useState("mamka@kar.cz");
    const [password, setPassword] = useState("j");

    const [inputTypePassword, setInputType] = useState(true);

    const authorizeUser = async () => {
        
        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
            });
            if (result?.ok) {
                return Router.push("/");
            }
            return;
        }

    return (
        <>
        <Head>
        <title>Sign In | kokotMates</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
                <div className="flex h-min min-h-min justify-center items-center flex-row px-5 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
                <div className="flex h-min min-h-min justify-center items-start flex-col bg-no-repeat bg-contain bg-center " style={{backgroundImage: `url(https://files.oaiusercontent.com/file-nuNg8AWXL4DnLoWCfgvT0r8p?se=2024-04-24T21%3A13%3A27Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dd7f97d29-aef6-4947-995a-e153f267aac9.webp&sig=zANYeHLvJ8pD%2BsNQWqOHov4IilBbpdfTuRG2d8Nvjbo%3D)`}}>
                        <p className="font-extrabold text-xl my-1">betton</p>
                        <div className="w-52 text-xl flex min-h-min justify-center items-center flex-col p-2 z-10 mb-8 py-[85px] bg-cover bg-center h-64 rounded-xl " style={{backgroundImage: `url(./images/loginbg.webp)`}}>
                                <div className="flex h-64 min-h-64 justify-center items-center  w-52 rounded-xl flex-col bg-gradient-to-b font-bold  from-[#FFD355] via-[#D33469] to-[#40348A] opacity-90">
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">Feel the thrill,</p>
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">place the bet,</p> 
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">take the victory lap!</p>
                        </div>
                    </div>
                    </div>
                    <div className="flex h-72 justify-center items-center flex-col p-[0.5px] mx-8 bg-slate-600 rounded">
                    
                    </div>
                    <div className="flex h-min min-h-min justify-center items-center flex-col  rounded text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">
                    <h1 className="text-xl font-bold mb-8">SIGN IN</h1>
                    <div className="font-bold text-sm">
                    <p>EMAIL</p>
                    <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg">
                    <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type="email" placeholder="iloveboobs@betton.com"></input>
                    </div>
                    <p className="mt-2">PASSWORD</p>
                    <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg ${!inputTypePassword && "bg-gradient-to-b from-[#FFC701] to-[#FF9900]"}`}>
                    <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type={inputTypePassword ? "password" : "text"}></input>
                    <div className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] absolute right-0 rounded-lg px-1 p-0.5 hover:rounded-xl ease-in-out duration-300"><button className={`f7-icons ico-size-20 ease-in-out duration-300 ${!inputTypePassword && "text-black animate-[fadeIn_0.3s_ease-in-out]"}`} onClick={() => setInputType(!inputTypePassword)}>{inputTypePassword ? "eye_slash" : "eye"}</button></div>
                    </div>
                    </div>
                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black " onClick={async () => { await authorizeUser() }}>SIGN IN</button>
                    <Link className="font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" href="/signup">SIGN UP</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignIn;