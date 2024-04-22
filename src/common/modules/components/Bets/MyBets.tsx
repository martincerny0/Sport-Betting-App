import { useSession } from "next-auth/react";
import React, { use } from "react";
import { api } from "~/utils/api";

const MytBets : React.FC = () => {
    
    const { data } = useSession();
    const userId = data?.user.id;

    const bets = api.bet.getUserBets.useQuery({ userId: userId?? "" });
    console.log(userId);
    return (
        <div className="border border-orange-400 w-1/6 ">
            <h2 className="text-3xl text-center">My Bets</h2>
            {bets.data?.map((bet) => (
                <div key={bet.id} className="border border-orange-400">
                    <p>Game ID: {bet.gameId}</p>
                    <p>Amount: {bet.amount}</p>
                    <p>User ID: {bet.userId}</p>
                    <p>Odds: {bet.odds}</p>
                    <p>Potential Win: {bet.potentialWin}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}

export default MytBets;