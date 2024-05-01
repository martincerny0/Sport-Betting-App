import { NextPage } from "next";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { useRef } from "react";
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from "sonner";
import z from "zod";


const ForgotPassword : NextPage = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const emailRef = useRef(null);	
    const [isContinue, setIsContinue] = useState(false);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isFinalMessage, setIsFinalMessage] = useState(false);

    const emailSchema = z.string().email({ message: "Invalid email address" });

    const ContinueCheck = () => {
        try {
            emailSchema.parse(email);
            setIsContinue(true);
        } catch (e) {
            if(e instanceof z.ZodError){
                console.log(e.errors[0]?.message);
                setEmailError(e.errors[0]?.message?? "");
                emailRef.current.value = "";
            }
        }
        setTimeout(() => {
            setEmailError("");
        }, 2000);
    }

    const captchaVerify = async (captchaToken) => {
       const captchaResponse = await fetch("http://localhost:3000/api/captcha/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({key: process.env.NEXT_PUBLIC_EXTERNAL_API_KEY, captchaToken})
        });
        captchaResponse.status === 200 ? setIsCaptchaVerified(true) : setIsCaptchaVerified(false);
        
    }

    const sendEmail = async () => {
        const emailResponse = await fetch(`http://localhost:3000/api/email/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({key: process.env.NEXT_PUBLIC_EXTERNAL_API_KEY, recipient: email})
        });
        emailResponse.status === 200 ? setIsFinalMessage(true) : toast.error("There was some error sending the email. <br> Please try again later.");
        console.log(emailResponse);
    }
   

    return (
        <>
        <Head>
        <title>Forgot Password | Betton</title>
        </Head>
        <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
                <div className="flex h-min min-h-min justify-center items-center flex-row px-5 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
                <div className="flex h-min min-h-min justify-center items-start flex-col bg-no-repeat bg-contain bg-center " style={{backgroundImage: `url(https://files.oaiusercontent.com/file-nuNg8AWXL4DnLoWCfgvT0r8p?se=2024-04-24T21%3A13%3A27Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dd7f97d29-aef6-4947-995a-e153f267aac9.webp&sig=zANYeHLvJ8pD%2BsNQWqOHov4IilBbpdfTuRG2d8Nvjbo%3D)`}}>
                        <p className="font-extrabold text-xl my-1">betton</p>
                        <div className="w-52 text-xl flex min-h-min justify-center items-center flex-col p-2 z-10 mb-8 py-[85px] bg-cover bg-center h-64 rounded-xl " style={{backgroundImage: `url(./images/loginbg.webp)`}}>
                                <div className="flex h-64 min-h-64 justify-center items-center  w-52 rounded-xl flex-col bg-gradient-to-b font-bold  from-[#FFD355] via-[#D33469] to-[#40348A] opacity-90">
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">Above all,</p>
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">don&apos;t forget to</p> 
                        <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">bet tonight!</p>
                        </div>
                    </div>
                    </div>
                    <div className="flex h-72 justify-center items-center flex-col p-[0.5px] mx-8 bg-slate-600 rounded">
                    </div>
                    <div className="flex h-min min-h-min justify-center items-center flex-col  rounded text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">
                    <h1 className="text-xl font-bold mb-8">PASSWORD RESET</h1>
                    {isContinue ?(<>
                    {isFinalMessage ? (
                    <>
                    <p className="font-bold text-sm">If the email you&apos;ve provided <br /> is associated with an account <br/>  you will receive  an email with <br/>a password reset link.</p>
                    </>) : (
                    <>
                    <ReCAPTCHA theme="dark" sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE?? ""}  onChange={captchaVerify} onExpired={() => setIsCaptchaVerified(false)}/>
                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black disabled:opacity-65 disabled:hover:text-white disabled:hover:rounded-lg" onClick={isCaptchaVerified ? sendEmail : undefined} disabled={!isCaptchaVerified}>SEND EMAIL</button> 
                    <p className="hover:cursor-pointer font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" onClick={() => setIsContinue(false)}>GO BACK</p>
                    </>
                    )}
                    </>
                    )
                    : (<>
                    <div className="font-bold text-sm">
                    <p>EMAIL</p>
                    <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg ${emailError && "bg-gradient-to-b from-[#FF8181] to-[#FF003D]"}`}>
                    <input className={`text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2 ${emailError && "placeholder:text-red-500 animate-[fadeIn_0.3s_ease-in-out]"}`} ref={emailRef}  placeholder={emailError ? emailError : ""} type="email" onBlur={(e) => setEmail(e.target.value)}></input>
                    </div>
                    </div>
                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black" onClick={ContinueCheck}>RESET</button>
                    <Link className="font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" href="/signup">SIGN IN</Link></>)}      
                
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}


export default ForgotPassword;