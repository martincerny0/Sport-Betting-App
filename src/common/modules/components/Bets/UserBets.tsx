import { Bet } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";
import { api } from "~/utils/api";


const UserBets : React.FC = () => {
    
    const { data } = useSession();
    const userId = data?.user.id?? "";

    const userBets = api.bet.getUserBets.useQuery({ userId: userId});

    console.log(userBets.data);



    return (
        <div className="flex flex-row border ">
            {userBets.data?.map((bet) => (
                <div key={bet.id} className="flex justify-center w-3/4 flex-col border border-green-400">
                    {/* <p>Game ID: {bet.gameId}</p> */}
                    <p>Amount: {bet.amount}</p>
                    {/* <p>User ID: {bet.userId}</p> */}
                    <p>Odds: {bet.odds}</p>
                    <p>Potential Win: {bet.potentialWin}</p>
                    {/* <p>Type: {bet.type}</p> */}
                    <p>Prediction: {bet.prediction}</p>
                    <p>result: {bet.result?? "Pending"}</p>
                    <p>{bet.game.team1Name} vs {bet.game.team2Name} </p>
                    <p>{bet.game.status}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}

export default UserBets;