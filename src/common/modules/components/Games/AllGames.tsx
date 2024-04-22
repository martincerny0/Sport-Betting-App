import React from 'react';
import { api } from '~/utils/api';
import Router from 'next/router';
import { useSession } from 'next-auth/react';

const AllGames: React.FC = () => {

    const games = api.game.getAllGames.useQuery();

    const { data } = useSession();
    const userId = data?.user?.id ?? "-";
    const betMutation = api.bet.createBet.useMutation();

    const createBet = async (gameId : string) => {
        const amount = 100;
    
        const response = await betMutation.mutateAsync({
          gameId: gameId,
          amount: amount,
          userId: userId,
        });
        Router.reload();
      }

    return (
        <div className="border border-cyan-400  w-1/6">
            <h2 className="text-3xl text-center">All Games</h2>
            {games.data?.map((game) => (
                <div key={game.id} className="border border-cyan-400">
                    <p>{game.team1Name} vs {game.team2Name}</p>
                    <p>{game.team1Score} : {game.team2Score}</p>
                    <p>{game.currentIngameTime} minute</p>
                    <button className='bg-orange-300' onClick={async () => { await createBet(game.id) }}>BET</button>
                    <br></br>
                </div>
            ))}
        </div>
    );
}

export default AllGames;