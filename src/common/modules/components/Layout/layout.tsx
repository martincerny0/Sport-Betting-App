import { PropsWithChildren } from "react";
import Nav from "../Nav/Nav";
import { useSession } from "next-auth/react";



const Layout : React.FC<PropsWithChildren> = ({children}) => {

    const { data } = useSession();
    const isLoggedIn = data?.user.id ? true : false;

 return (
    <div className="flex flex-col justify-center w-full h-full min-h-full min-w-full bg">
        <Nav/>
        <div>{children}</div>
    </div>
 )
}


export default Layout;