import React from 'react';
import Game from './Game';
import { api } from '~/utils/api';


const AllGames: React.FC = () => {

    const AllGamesArr = api.game.getAllGames.useQuery();


    return (
        
        <div className="flex flex-row justify-center">
            {AllGamesArr.data?.map((game) => (
                <Game
                    key={game.id}
                    gameId={game.id}
                    team1Score={game.team1Score}
                    team2Score={game.team2Score}
                    currentIngameTime={game.currentIngameTime??0}
                    status={game.status}
                    sport={game.sport}
                    team1Name={game.team1Name}
                    team2Name={game.team2Name}
                    startTime={game.startTime}
                    oddsTeam1Win={game.oddsTeam1Win}
                    oddsTeam2Win={game.oddsTeam2Win}
                    oddsOver={game.oddsOver}
                    oddsUnder={game.oddsUnder}
                />
            ))}
        </div>
    );
}

export default AllGames;