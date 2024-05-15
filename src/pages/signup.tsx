import { NextPage } from "next";
import Link from "next/link";
import { use, useState } from "react";
import { useEffect } from "react";
import { api } from "~/utils/api";
import Head from "next/head";
import { ZodError, z } from "zod";
import { useRef } from "react";
import { toast } from "sonner";
import { TRPCClientError } from "@trpc/client";
import { InferGetServerSidePropsType } from "next";
import { GetServerSidePropsContext } from "next";
import config from "../../config";
import SmallLoading from "~/common/modules/components/SmallLoading/SmallLoading";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const inviteCode = context.query.invite as string ?? "";
    return { props: { inviteCode } };
  };

const SignUp: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ inviteCode }) => {

    // inputs
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isBackSpaceDown, setIsBackSpaceDown] = useState(true);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [VerificationToken, setVerificationToken] = useState("");

    // errors
    const [nameError, setNameError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");


    // utils
    const [inputTypePassword, setInputType] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [isFinalMessage, setIsFinalMessage] = useState(false);
    const [emailResend, setEmailResend] = useState(false);
    const { mutateAsync, error } = api.user.register.useMutation();

    // schemas
    const firstPageSchema = z.object({
        fullname:  z.string().min(1, { message: "Fullname cannot be empty" }).max(32, { message: "Fullname cannot exceed 32 characters" }),
        dateOfBirth: z.string().min(10, { message: "Invalid date of birth" }).max(10, { message: "Invalid date of birth" }),
    });

    const secondPageSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(100, { message: "Password can't be more than 100 characters" }),
        passwordConfirm: z.string()
    });

    const sendEmail = async (token : string) => {
        setVerificationToken(token);
        const emailResponse = await fetch(`${config.baseUrl}/api/email/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token, inviteCode: inviteCode, email: email})
        });
        if(emailResponse.status !== 200){ toast.error("There was some error sending the email. <br> Please try it again."); setEmailResend(true)};
    }

    const authorizeUser = async () => {
        const inputs = { email: email, password: password, passwordConfirm: passwordConfirm };
        if (inputs.password !== inputs.passwordConfirm) {
            setPasswordConfirmError("Passwords do not match");
            if(passwordConfirmRef.current)passwordConfirmRef.current.value = "";
        }
        try {
            secondPageSchema.parse(inputs);
            if(password === passwordConfirm) {
            try {
                setIsLoading(true);
                const response = await mutateAsync({
                    email: email,
                    password: password,
                    name: name,
                    dateOfBirth: dateOfBirth
                }).then((response) => sendEmail(response.token));
                setIsFinalMessage(true);
            } catch (e) {
                if(e instanceof TRPCClientError) {
                    toast.error(e.message ?? "An error occurred, please try again later");
                }
            }
            finally {
            setIsLoading(false);
            }
            setEmailError("");
            setPasswordError("");
            setPasswordConfirmError("");
        } 
        } catch (e) {
            if (e instanceof ZodError) {
                    e.errors.forEach((error) => {
                        switch (error.path[0]) {
                            case 'email':
                                setEmailError(error.message);
                                break;
                            case 'password':
                                setPasswordError(error.message);
                                break;
                            case 'passwordConfirm':
                                setPasswordConfirmError(error.message);
                                break;
                            default:
                                break;
                        }
                    });
            }
        }
        setTimeout(() => {
            setEmailError("");
            setPasswordError("");
            setPasswordConfirmError("");
        }, 2000);
    };
    
    const ContinueCheck = () => {
        const input = { fullname: name, dateOfBirth: dateOfBirth };

            try {
                firstPageSchema.parse(input);
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(input.dateOfBirth) ){setDateOfBirthError("Invalid format");  return;}
                if (!isAdult(dateOfBirth)){setDateOfBirthError("Must be 18+ to proceed"); return}
                setIsContinue(true);
            } catch (e) {
                if (e instanceof ZodError) {
                    e.errors.forEach((error) => {
                        if (error.path[0] === 'fullname') {
                        setNameError(error.message);
                        }
                        if (error.path[0] === 'dateOfBirth') {
                        setDateOfBirthError(error.message);
                        }
                    });
                }
            }

    }

    const isAdult = (dateOfBirth: string) => {
        // create date from user input
        const date = new Date(parseInt(dateOfBirth.substring(6,10)), parseInt(dateOfBirth.substring(3,5))-1, parseInt(dateOfBirth.substring(0,2)));
        const today = new Date();
        // is valid date?
        if(date.getFullYear() > today.getFullYear()) return false;
        // time difference
        const timeDiff = Math.abs(date - today);
        const age = Math.floor(timeDiff / (1000 * 3600 * 24))/ 365.25;
        
        return age >= 18 ? true : false;
    }

    useEffect(() => {

        // reset errors
        setTimeout(() => {
            setDateOfBirthError("");
            setNameError("");
            setEmailError("");
            setPasswordError("");
            setPasswordConfirmError("");
        }, 2000);
    }, [nameError, dateOfBirthError, emailError, passwordError, passwordConfirmError]);
    return (
        <>
            <Head>
                <title>Sign Up | Betton</title>
            </Head>
            <div className="flex h-full min-h-full justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
                <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
                    <div className="flex h-min min-h-min justify-center items-center flex-row px-5 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl ">
                        <div className="flex h-min min-h-min justify-center items-start flex-col">
                            <p className="font-extrabold text-xl my-1">betton</p>
                            <div className="w-52 text-xl flex min-h-min justify-center items-center flex-col p-2 z-10 mb-8 py-[85px] bg-cover bg-center h-64 rounded-xl" style={{backgroundImage: `url(./images/loginbg.webp)`}}>
                                <div className="flex h-64 min-h-64 justify-center items-center  w-52 rounded-xl bg-gradient-to-b font-bold  from-[#FFD355] via-[#D33469] to-[#40348A] opacity-90">
                                <p className="leading-tight text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">ALL IN!</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-72 justify-center items-center flex-col p-[0.5px] mx-8 bg-slate-600 rounded"></div>
                        <div className="flex h-min min-h-min justify-center items-center flex-col  rounded text-[#FAECDE] animate-[fadeIn_0.3s_ease-in-out]">
                            <h1 className="text-xl font-bold mb-8">SIGN UP</h1>
                            {!isContinue ? (
                                <>
                                    <div className="font-bold text-sm">
                                        <p>FULL NAME</p>
                                        <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg ${nameError && "bg-gradient-to-b from-[#FF8181] to-[#FF003D]"}`}>
                                            <input className={`text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2 ${nameError && "placeholder:text-red-500 animate-[fadeIn_0.3s_ease-in-out]"}`} type="text" placeholder={nameError ? nameError : ""} onChange={(e) => setName(e.target.value)}></input>
                                        </div>
                                        <p className="mt-2">DATE OF BIRTH</p>
                                        <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg ${dateOfBirthError && "bg-gradient-to-b from-[#FF8181] to-[#FF003D]"}`}>
                                            <input className={`text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2 ${dateOfBirthError && "placeholder:text-red-500 animate-[fadeIn_0.3s_ease-in-out]"}`} 
                                            type="text" 
                                            value={dateOfBirthError? "" : undefined} 
                                            placeholder={dateOfBirthError  ? dateOfBirthError : "DD/MM/YYYY"} 
                                            maxLength={10}  
                                            onChange={(e) => {isBackSpaceDown ? (e.target.value.length === 3 || e.target.value.length === 6 && e.target.value.slice(0, -2) && setDateOfBirth(e.target.value)) : !/^[0-9\/]*$/.test(e.target.value) ? e.target.value = e.target.value.substring(0, e.target.value.length -1) : (e.target.value.length === 2 || e.target.value.length === 5) && (e.target.value += "/")}} 
                                            onBlur={(e) => setDateOfBirth(e.target.value)}
                                            onKeyDown={(e) => {e.key === "Backspace" ? setIsBackSpaceDown(true) : setIsBackSpaceDown(false)}}
                                            ></input>
                                        </div>
                                    </div>
                                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black" onClick={() => ContinueCheck()}>CONTINUE</button>
                                    <Link className="font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" href="/signin">SIGN IN</Link>
                                </>
                            ) : (
                                <>
                                {isFinalMessage ? (
                                    <>
                                    <p className="text-center">Thank you for registering! <br/> We&apos;ve sent a verification email to the address you provided. <br/> Please click on the verification link in the email <br/> to activate your account. <br/><br/> If you cant&apos;t find the email, check your spam or junk folder.</p>
                                    {emailResend ? <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black" onClick={async () => {setEmailResend(false); await sendEmail(VerificationToken)}}>RESEND EMAIL</button> : <Link className="font-bold text-xs mt-8 hover:text-[#FFC701] ease-in-out duration-300" href="/signin">GO TO SIGN IN</Link>}
                                    </>) : (
                                    <>
                                    <span></span>
                                        <div className="font-bold text-sm">
                                            <p>EMAIL</p>
                                            <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg ${emailError && "bg-gradient-to-b from-[#FF8181] to-[#FF003D]"}`}>
                                                <input className={`text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2 ${emailError && "placeholder:text-red-500 animate-[fadeIn_0.3s_ease-in-out]"}`} placeholder={emailError ? emailError : ""}  type="text" onBlur={(e) => setEmail(e.target.value)}></input>
                                            </div>
                                            <p className="mt-2">PASSWORD</p>
                                            <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg ${!inputTypePassword && "bg-gradient-to-b from-[#FFC701] to-[#FF9900]"} ${passwordError && "bg-gradient-to-b from-[#FF8181] to-[#FF003D]"}`}>
                                                <input className={`text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2 ${passwordError && "placeholder:text-red-500 animate-[fadeIn_0.3s_ease-in-out]"}`} placeholder={passwordError ? passwordError : ""} type={inputTypePassword ? "password" : "text"}  onBlur={(e) => setPassword(e.target.value)}></input>
                                                <div className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] absolute right-0 rounded-lg px-1 p-0.5 hover:rounded-xl ease-in-out duration-300"><button className={`f7-icons ico-size-20 ease-in-out duration-300 ${!inputTypePassword && "text-black animate-[fadeIn_0.3s_ease-in-out]"}`} onClick={() => setInputType(!inputTypePassword)}>{inputTypePassword ? "eye_slash" : "eye"}</button></div>
                                            </div>
                                            <p className="mt-2">CONFIRM PASSWORD</p>
                                            <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg ${passwordConfirmError && "bg-gradient-to-b from-[#FF8181] to-[#FF003D]"}`}>
                                                <input className={`text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2 ${passwordConfirmError && "placeholder:text-red-500 animate-[fadeIn_0.3s_ease-in-out]"}`} placeholder={passwordConfirmError ? passwordConfirmError : ""} type={inputTypePassword ? "password" : "text"} ref={passwordConfirmRef} onBlur={(e) => setPasswordConfirm(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex" onClick={async () => await authorizeUser()}>SIGN UP<SmallLoading isPending={isLoading}></SmallLoading></button>
                                        <p className="hover:cursor-pointer font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" onClick={() => setIsContinue(false)}>GO BACK</p>
                                    </>)}
                                </>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
