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
        <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414] h-64">
            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] h-64 rounded-xl">
                <div className="flex h-min min-h-min justify-center items-center flex-row p-2 bg-gradient-to-b from-[#0D263D] to-[#141414] h-64 rounded-xl">
                <div className="flex h-min min-h-min justify-center items-start flex-col bg-green-500">
                        <h1>betton</h1>
                        <div className="flex h-min min-h-min justify-center items-center flex-col p-2 bg-gradient-to-b from-[#FFD355] via-[#FF8D55] via-[#D33469] to-[#40348A] h-64 rounded-xl opacity-90">
                        <p>Feel the thrill,</p>
                        <p>place the bet,</p> 
                        <p>take the victory lap!</p>
                        <div className="flex h-min min-h-min justify-center items-center flex-col p-2 bg-white rounded">
                    
                    </div>
                    </div>
                    </div>
                    <div className="flex h-min min-h-min justify-center items-center flex-col p-2 bg-white rounded">
                    
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignIn;