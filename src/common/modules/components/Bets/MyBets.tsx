import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";
import { api } from "~/utils/api";

const MytBets : React.FC = () => {
    
    const { data } = useSession();
    const userId = data?.user.id;

    const userBets = api.bet.getUserBets.useQuery({ userId: userId?? "" });

    const [gameId, setGameId] = useState(""); 
    const getGameById = api.game.getGameById.useQuery(gameId);

    const getGameInfo = async () => {
        try {
           await getGameById.refetch();
            // Update state or perform actions with fetched data
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors appropriately
          }
    }

    useEffect(() => {
        getGameInfo();
    }, [userId]);

    return (
        <div className="flex flex-row border ">
            {userBets.data?.map((bet) => (
                <div key={bet.id} className="flex flex-col border">
                    <div>{bet.gameId}</div>
                    <div>{bet.amount}</div>
                    <div>{bet.type}</div>
                    <div>{bet.result}</div>
                    
                </div>
            ))}

            

        </div>
    )
}

export default MytBets;