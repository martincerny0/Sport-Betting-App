import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import Head from "next/head";

const SignUp : NextPage = () => {

    const [name, setName] = useState("Jirka Král");
    const [email, setEmail] = useState("jirka@kral.cz");
    const [password, setPassword] = useState("libor");

    const {mutateAsync, error} = api.user.register.useMutation();


    const createUser = async () => {

        const response = await mutateAsync({
            email: email,
            password: password,
            name: name,
        })
        if(error){
            return alert("neco je pici");
        }
          return;
    }

    return (
        <>
            <Head>
        <title>Sign Up | kokotMates</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] h-64 rounded-xl">
                <div className="flex h-min min-h-min justify-center items-center flex-row px-5 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl ">
                <div className="flex h-min min-h-min justify-center items-start flex-col">
                        <p className="font-extrabold text-xl my-1">betton</p>
                        <div className="w-52 text-xl flex min-h-min justify-center items-center flex-col p-2 mb-8 py-[85px] bg-gradient-to-b font-bold  from-[#FFD355] via-[#D33469] to-[#40348A] h-64 rounded-xl opacity-90 ">
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">ALL IN!</p>
                    </div>
                    </div>
                    <div className="flex h-72 justify-center items-center flex-col p-[0.5px] mx-8 bg-slate-600 rounded">
                    
                    </div>
                    <div className="flex h-min min-h-min justify-center items-center flex-col  rounded text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">
                    <h1 className="text-xl font-bold mb-8">SIGN UP</h1>
                    <div className="font-bold text-sm">
                    <p>FULL NAME</p>
                    <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg">
                    <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type="text" placeholder="Joe Biden"></input>
                    </div>
                    <p className="mt-2">DATE OF BIRTH</p>
                    <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg">
                    <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type="text" placeholder="DD/MM/YYYY"></input>
                    </div>
                    </div>
                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black">CONTINUE</button>
                    <Link className="font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" href="/signin">SIGN IN</Link>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp;