import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



const Nav : React.FC = () => {

    const { data } = useSession();
    const isLoggedIn = data?.user.id ? true : false;


    return (
        <nav className="flex justify-between absolute top-1 left-36 self-start items-center bg-slate-700 w-11/12 max-w-full h-12 rounded-xl border border-yellow-700">
            <h1>betton</h1>
            <div className="justify-end">
                { isLoggedIn ? 
                <button onClick={async () => { await signOut({ callbackUrl: 'http://localhost:3000/' }) }} className="w-24 text-white bg-red-500 rounded-lg">logout</button> 
                : 
                <button onClick={() => { location.href="/signin" }} className="w-24 text-white bg-yellow-500 rounded-lg">login</button>
                }
               
            </div>
        </nav>
    )
}

export default Nav;