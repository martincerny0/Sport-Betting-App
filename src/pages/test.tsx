import { NextPage } from 'next';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';

const Test : NextPage = () => {
    const session = useSession();
    console.log(session);
    
    const games = api.game.getAllGames.useQuery();
    const createBetMutation = api.bet.createBet.useMutation();

    const userBets = api.bet.getUserBets.useQuery({userId: session.data?.user?.id?? ""});

    const bet = async (gameId : string) => {
        await createBetMutation.mutateAsync
        ({
            gameId: gameId,
            amount: 1000,
            type: "Win",
            prediction: "Team1",
            odds: 1.5,
            userId: session.data?.user?.id?? "",
        });

    }
return (<>
{games.data?.map((game) => (
    <div className='border border-black h-54 w-32 text-center' key={game.id}>
        <p>{game.sport}</p>
        <p>{game.team1Name}</p>
        <p>{game.team2Name}</p>
        <p>{game.team1Name} Win {game.oddsTeam1Win}</p>
        <p>{game.team2Name} Win {game.oddsTeam2Win}</p>
        <p> {game.oddsOver} over</p>
        <p>{game.breakPoint} points</p>
        <p> {game.oddsUnder} under</p>
        <button className='bg-orange-400' onClick={() => bet(game.id)}>BET</button>
    </div>
))}
{userBets.data?.map((bet) => (
    <div className='border border-black h-54 w-32 text-center' key={bet.id}>
        <p>${bet.amount}</p>
        <p className='text-green-400'>${bet.potentialWin}</p>
        {bet.prediction === "Team1" ? <p>{bet.game.team1Name}</p> : <p>{bet.game.team2Name}</p>}
        <p>{bet.odds}</p>
    </div>
))}
</>)
}

export default Test;