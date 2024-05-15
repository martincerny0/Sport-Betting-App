import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



const Nav : React.FC = () => {

    const { data } = useSession();
    const isLoggedIn = data?.user.id ? true : false;


    return (
        <div className="flex h-min w-11/12 min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="flex h-min w-full min-h-min items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-extrabold text-xl my-1">betton</p>
            <div className="flex h-full min-h-full justify-center items-center">
            <div className="flex h-min w-32 min-h-min items-start flex-row bg-gradient-to-b from-[#0D263D] to-[#3A425A] rounded-lg">
            <button className="w-16 p-0.5 px-3 font-bold text-sm rounded-lg ease-in-out duration-300 ">HOME</button>
              <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] w-16 p-0.5 px-4 font-bold text-sm rounded-lg ease-in-out duration-300 ">LIVE</button>
            </div>
            <button className="f7-icons ico-size-20 mx-2">person_crop_circle</button>
              <Link href="/signin" className="flex bg-gradient-to-b from-[#FFD355] via-[#FF8D55] to-[#D33469] items-center justify-center w-20 p-0.5 px-4 font-bold text-sm rounded-lg ease-in-out duration-300 ">login</Link>
            </div>
            </div>
        </div>
    )
}

export default Nav;