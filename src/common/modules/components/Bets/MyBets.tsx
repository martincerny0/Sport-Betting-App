import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";
import { api } from "~/utils/api";

const MytBets : React.FC = () => {
    
    const { data } = useSession();
    const userId = data?.user.id;

    const userBets = api.bet.getUserBets.useQuery({ userId: userId?? "" });

    const [gameId, setGameId] = useState(""); 
    const getGameById = api.game.getGameById.useQuery(gameId);

    const [fullBetInfo, setFullBet] = useState<{ gameDetails: {}; id: string; type: string; prediction: string; userId: string; gameId: string; result: string | null; amount: number; potentialWin: number; odds: number; createdAt: Date; }[]>([]);

       
        useEffect(() => {
            const fetchGameDetails = async () => {
                if (userBets.data) {
                    const enrichedBets = await Promise.all(userBets.data.map(async (bet) => {
                        setGameId(bet.gameId);
                        // Wait for the game details to be fetched
                        await getGameById.refetch();
                        return {
                            ...bet,
                            gameDetails: getGameById.data || {}
                        };
                    }));
                    setFullBet(enrichedBets);
                }
            };
    
        });

    return (
        <div className="flex flex-row border ">
            {bets.data?.map((bet) => (
                <div key={bet.id} className="border w-3/4 border-black">
                    <p>Game ID: {bet.gameId}</p>
                    <p>Amount: {bet.amount}</p>
                    <p>User ID: {bet.userId}</p>
                    <p>Odds: {bet.odds}</p>
                    <p>Potential Win: {bet.potentialWin}</p>
                    <p>{bet.type}</p>
                    <p>Prediction: {bet.prediction}</p>
                    <p>result: {bet.result?? "Pending"}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}

export default MytBets;