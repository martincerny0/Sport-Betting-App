import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import Head from "next/head";
import { ZodError, set, z } from "zod";
import { url } from "inspector";

const SignUp: NextPage = () => {

    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nameError, setNameError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isContinue, setIsContinue] = useState(false);
    const [inputTypePassword, setInputType] = useState(true);
    const { mutateAsync, error } = api.user.register.useMutation();

    const fullnameSchema = z.string().min(1, { message: "Fullname cannot be empty" }).max(100, { message: "Fullname cannot exceed 100 characters" });
    const dateOfBirthSchema = z.string().min(10, { message: "Invalid date of birth" }).max(10, { message: "Invalid date of birth" });
    const emailSchema = z.string().email({ message: "Invalid email address" });
    const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" }).max(100, { message: "Password can't be more than 100 characters" });

    const ContinueCheck = () => {
        try {
            fullnameSchema.parse(name);
        } catch (e) {
            if (e instanceof ZodError) {
                console.log(e.issues[0]?.message);
                return;
            }
        }
        try {
            dateOfBirthSchema.parse(dateOfBirth);
        } catch (e) {
            if (e instanceof ZodError) {
                console.log(e.issues[0]?.message);
                return;
            }
        }
        setIsContinue(true);
    }

    const createUser = async () => {
        const response = await mutateAsync({
            email: email,
            password: password,
            name: name,
        });
        if (error) {
            return alert("neco je pici");
        }
        return;
    };

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
                            <div className="w-52 text-xl flex min-h-min justify-center items-center flex-col p-2 z-10 mb-8 py-[85px] bg-cover bg-center h-64 rounded-xl " style={{backgroundImage: `url(./images/loginbg.webp)`}}>
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
                                        <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg">
                                            <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type="text" placeholder="Joe Biden" onBlur={(e) => setName(e.target.value)}></input>
                                        </div>
                                        <p className="mt-2">DATE OF BIRTH</p>
                                        <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg">
                                            <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type="text" placeholder="DD/MM/YYYY" onChange={(e) => { (e.target.value.length === 2 || e.target.value.length === 5) && (e.target.value += "/") }} onBlur={(e) => { setDateOfBirth(e.target.value) }}></input>
                                        </div>
                                    </div>
                                    <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black" onClick={() => ContinueCheck()}>CONTINUE</button>
                                    <Link className="font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" href="/signin">SIGN IN</Link>
                                </>
                            ) : (
                                    <>
                                        <div className="font-bold text-sm">
                                            <p>EMAIL</p>
                                            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg">
                                                <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type="text" placeholder="Biden@Whitehouse.joe" onBlur={(e) => setEmail(e.target.value)}></input>
                                            </div>
                                            <p className="mt-2">PASSWORD</p>
                                            <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg ${!inputTypePassword && "bg-gradient-to-b from-[#FFC701] to-[#FF9900]"}`}>
                                                <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type={inputTypePassword ? "password" : "text"} onBlur={(e) => setPassword(e.target.value)}></input>
                                                <div className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] absolute right-0 rounded-lg px-1 p-0.5 hover:rounded-xl ease-in-out duration-300"><button className={`f7-icons ico-size-20 ease-in-out duration-300 ${!inputTypePassword && "text-black animate-[fadeIn_0.3s_ease-in-out]"}`} onClick={() => setInputType(!inputTypePassword)}>{inputTypePassword ? "eye_slash" : "eye"}</button></div>
                                            </div>
                                            <p className="mt-2">CONFIRM PASSWORD</p>
                                            <div className="flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] relative bg-gradient-to-b  from-[#EEBC8A] to-[#666666] rounded-lg">
                                                <input className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2" type={inputTypePassword ? "password" : "text"} onBlur={(e) => setPasswordConfirm(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-4 p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black">SIGN UP</button>
                                        <p className="hover:cursor-pointer font-bold text-xs mt-2 hover:text-[#FFC701] ease-in-out duration-300" onClick={() => setIsContinue(false)}>GO BACK</p>
                                    </>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
