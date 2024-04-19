import { NextPage } from "next";

const SignIn : NextPage = () => {

    const authorizeUser = async () => {
        return;
    }
    return (
        <>
        <div className="flex h-full min-h-full justify-center items-center flex-col">
            <h2>Sign Up</h2>
            Email
            <input type="text" placeholder="email"  className="rounded border border-orange-300"/>
            Password
            <input type="text" placeholder="password"  className="rounded border border-orange-300"/>
            <br></br>
            <button className="rounded border border-orange-300" onClick={async () => { await authorizeUser() }}>Sign Up</button>

            <br></br>
            <a href="/signup">Sign In</a>
        </div>
    </>
    )
}

export default SignIn;