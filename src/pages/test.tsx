import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { Suspense } from "react";

const Test: NextPage = () => {
    const [userData, setUserData] = useState<{ id: number; username: string; email: string } | null>(null);

    // This function simulates fetching user data with a delay
    function fetchUserData() {
        return new Promise<{ id: number; username: string; email: string }>((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    username: 'JohnDoe',
                    email: 'johndoe@example.com'
                });
            }, 3000); // Delay in milliseconds
        });
    }

    useEffect(() => {
        async function loadData() {
            const data = await fetchUserData();
            setUserData(data);
        }
        loadData();
    }, []); // Dependency array is empty, meaning this effect runs only once on mount

    // Handling the loading state
    // if (!user-Data) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
        </div>
    );
}

export default Test;
