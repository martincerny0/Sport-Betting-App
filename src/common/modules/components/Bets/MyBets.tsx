import { useSession } from "next-auth/react";
import React, { use } from "react";
import { api } from "~/utils/api";

const MytBets : React.FC = () => {
    
    const { data } = useSession();
    const userId = data?.user.id;

    const bets = api.bet.getUserBets.useQuery({ userId: userId?? "" });

    return (
        <div className="flex flex-row border ">
            {/* <h2 className="text-3xl text-center">My Bets</h2> */}
            {bets.data?.map((bet) => (
                <div key={bet.id} className="border w-3/4 border-black">
                    {/* <p>Game ID: {bet.gameId}</p> */}
                    <p>Amount: {bet.amount}</p>
                    {/* <p>User ID: {bet.userId}</p> */}
                    <p>Odds: {bet.odds}</p>
                    <p>Potential Win: {bet.potentialWin}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}

export default MytBets;