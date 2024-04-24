import { NextPage } from "next";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
const SignIn : NextPage = () => {

    const [email, setEmail] = useState("mamka@kar.cz");
    const [password, setPassword] = useState("j");

    const userId = useSession().data?.user;
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
        <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] h-64 rounded-xl">
                <div className="flex h-min min-h-min justify-center items-center flex-row px-5 bg-gradient-to-b from-[#0D263D] to-[#141414] rounded-xl">
                <div className="flex h-min min-h-min justify-center items-start flex-col">
                        
                        <p className="font-extrabold text-xl my-1">betton</p>
                        <div className="text-xl flex min-h-min justify-center items-center flex-col p-2 mb-8 py-[85px] bg-gradient-to-b font-bold  from-[#FFD355] via-[#D33469] to-[#40348A] h-64 rounded-xl opacity-90">
                        <p className="leading-tight text-[#FAECDE]">Feel the thrill,</p>
                        <p className="leading-tight text-[#FAECDE]">place the bet,</p> 
                        <p className="leading-tight text-[#FAECDE]">take the victory lap!</p>
                    </div>
                    </div>
                    <div className="flex h-72 justify-center items-center flex-col p-[0.5px] mx-8 bg-slate-600 rounded">
                    
                    </div>
                    <div className="flex h-min min-h-min justify-center items-center flex-col  rounded text-[#FAECDE]">
                    <h1 className="text-xl font-bold mb-8">SIGN IN</h1>
                    <div className="font-bold text-sm">
                    <p>EMAIL</p>
                    <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg">
                    <input className="text-[#FAECDE] bg-gradient-to-b from-[#0D263D] to-[#141414] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light" type="email"></input>
                    </div>
                    <p className="mt-2">PASSWORD</p>
                    <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg">
                    <input className="text-[#FAECDE] bg-gradient-to-b from-[#0D263D] to-[#141414] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light" type="password"></input>
                    </div>
                    </div>
                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black">SIGN IN</button>
                    <Link className="font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" href="/signup">SIGN UP</Link>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
    )
}

export default SignIn;