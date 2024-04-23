import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import React from "react";
import { api } from "~/utils/api";

const LatestBets : React.FC = () => {

    const bets = api.bet.getLatestBets.useQuery();

    return (
        <div className=" flex flex-row">
                    {/* <h2 className="text-3xl text-center">All Bets</h2> */}
            {bets.data?.map((bet) => (
                <div key={bet.id} className=" flex justify-center w-3/4 flex-col border border-green-400">
                    {/* <p>Game ID: {bet.gameId}</p> */}
                    <p>Amount: {bet.amount}</p>
                    {/* <p>User ID: {bet.userId}</p> */}
                    <p>Odds: {bet.odds}</p>
                    <p>Potential Win: {bet.potentialWin}</p>
                    {/* <p>Type: {bet.type}</p> */}
                    <p>Prediction: {bet.prediction}</p>
                    <p>result: {bet.result?? "Pending"}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}

export default LatestBets;