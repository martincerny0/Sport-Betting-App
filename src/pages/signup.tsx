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
                <title>Sign Up | Betton</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-full min-h-full justify-center items-center flex-col">
                <h2>Sign Up</h2>
                Email
                <input type="text" placeholder="email"  className="rounded border border-orange-300"/>
                Password
                <input type="text" placeholder="password"  className="rounded border border-orange-300"/>
                Password Confirmation
                <input type="text" placeholder="password" className="rounded border border-orange-300"/>

                <button className="rounded border border-orange-300" onClick={async () => { await createUser() }}>Sign Up</button>

                <br></br>
                <Link href="/signin">Sign In</Link>
            </div>
        </>
    )
}

export default SignUp;