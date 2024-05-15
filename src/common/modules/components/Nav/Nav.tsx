import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";



const Nav : React.FC = () => {

    const { data, status } = useSession();

    const [isHome, setHome] = useState(true);

    useEffect(() => {
        console.log(data);
        console.log(status);
        if(status === "loading"){
          console.log("loading");
        }
    }, [status]);
    


    return (
        <div className="mt-4 flex h-min w-11/12 min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="flex h-min w-full min-h-min items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-extrabold text-xl my-1">betton</p>
            <div className="flex h-full min-h-full justify-center items-center">
            <div className="flex h-min w-32 min-h-min items-start flex-row bg-gradient-to-b from-[#0D263D] to-[#3A425A] rounded-lg">
            <button onClick={() => setHome(true)} className={`w-16 p-0.5 px-3 font-bold text-sm rounded-lg ease-in-out duration-300 ${isHome && "bg-gradient-to-b from-[#FFC701] to-[#FF9900]"}`}>HOME</button>
              <button onClick={() => setHome(false)} className={`w-16 p-0.5 px-4 font-bold text-sm rounded-lg ease-in-out duration-300 ${!isHome && " bg-gradient-to-b from-[#FFC701] to-[#FF9900]"}`}>LIVE</button>
            </div>
            <Link href={status === "authenticated" ? "/account" : "/signin"} className={`f7-icons ico-size-20 mx-2 ${status === "unauthenticated" && "text-gray-500"}`}>person_crop_circle</Link>
            {status === "authenticated" && data ? (
              <button onClick={async () => await signOut() } className="flex bg-gradient-to-b from-[#FF8181] to-[#FF003D] items-center justify-center w-20 p-0.5 px-4 font-bold text-sm rounded-lg ease-in-out duration-300">logout</button>
            ) : (
              <Link href="/signin" className="flex bg-gradient-to-b from-[#FFD355] via-[#FF8D55] to-[#D33469] items-center justify-center w-20 p-0.5 px-4 font-bold text-sm rounded-lg ease-in-out duration-300">login</Link>
            )
            }
            </div>
            </div>
        </div>
    )
}

export default Nav;