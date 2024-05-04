import { NextPage } from "next";
import { Suspense } from "react";
import UserBets from "~/common/modules/components/Bets/UserBets";


const Account : NextPage = () => {
    
    return (
        <>
        <UserBets></UserBets>
        </>
    )
}

export default Account;