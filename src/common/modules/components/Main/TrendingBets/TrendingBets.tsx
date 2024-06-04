import React from "react";
import { api } from '~/utils/api';



const TrendingBets : React.FC = () => {
    const { data: trendingBets, isLoading, isError } = api.bet.trendingBets.useQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an Error loading data, <br></br> Please try again Later</div>;


    return (
        <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-bold text-[#EEBC8A] text-sm pt-2">TRENDING TICKETS</p>
            <table className="font-bold text-xs w-full">
                <tbody>
                {trendingBets?.map((Bet) => (
                    <tr className="group border-b border-[#EEBC8A]" key={Bet.id}>
                      <td className="text-[#D1B657] group-hover:animate-pulse">{Bet.prediction === "Team1" ? Bet.game.team1Name : Bet.game.team2Name} {Bet.prediction = "Team1" ? "Win" : "Lose"}</td>
                      <td className="text-white group-hover:animate-pulse">{Bet.game.team1Name} vs {Bet.game.team2Name}</td>
                      <td className="text-base text-[#FFCA0D] group-hover:hidden group-hover:animate-pulse">{Bet.odds}</td>
                      <td className="text-base duration-300 ease-in-out hidden group-hover:table-cell text-[#f55353] group-hover:animate-pulse">${Math.round(Bet.amount)}</td>
                      <td className="duration-300 ease-in-out hidden group-hover:table-cell text-[#8CC545] group-hover:animate-pulse">${Bet.potentialWin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    )
}

export default TrendingBets;