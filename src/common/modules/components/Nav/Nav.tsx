import { useSession } from "next-auth/react";

const Nav : React.FC = () => {
    const { data } = useSession();

    const name = data?.user?.name ?? "Guest";

    return (
        <nav className="flex justify-center">
            <h1>{name}</h1>
        </nav>
    )
}

export default Nav;