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
        <div className="flex h-full min-h-full justify-center">
            <div className="border border-blue-300 flex h-min min-h-min justify-center items-center flex-col">
            <h2>Sign In</h2>
            Email
            <input type="text" placeholder="email"  className="rounded border border-orange-300" onBlur={(e) => { setEmail(e.target.value) }}/>
            Password
            <input type="text" placeholder="password"  className="rounded border border-orange-300" onBlur={(e) => { setPassword(e.target.value) }}/>
            <br></br>
            <button className="rounded border border-orange-300" onClick={async () => { await authorizeUser() }}>Sign In</button>

            <br></br>
            <Link href="/signup">Sign Up</Link>
            </div>
        </div>
    </>
    )
}

export default SignIn;