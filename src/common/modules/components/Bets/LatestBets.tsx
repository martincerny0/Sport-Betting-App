import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import React from "react";
import { api } from "~/utils/api";

const LatestBets : React.FC = () => {

    const bets = api.bet.getLatestBets.useQuery();

    return (
        <div className="border border-orange-400 w-1/6">
            <h2 className="text-3xl text-center">All Bets</h2>
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

export default LatestBets;