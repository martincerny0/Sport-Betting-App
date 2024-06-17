import React from "react";
import { api } from '~/utils/api';
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";
import Router from "next/router";




const TrendingBets : React.FC = () => {
    const { data: trendingBets, isLoading, isError } = api.bet.trendingBets.useQuery();

    
    if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
    if(isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className='p-3'>There was an Error loading Data. Try Again Later</p></div>;
    if(!trendingBets) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><p>There is no tickets</p></div>;



    return (
        <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-bold text-[#EEBC8A] text-sm pt-2">TRENDING TICKETS</p>
            <table className="font-bold text-xs w-full">
                <tbody>
                {trendingBets?.map((Bet) => (
                    <tr className="group border-b border-[#EEBC8A] hover:cursor-pointer" key={Bet.id}  onClick={async () => await Router.push(`/ticket/${Bet.id}`)}>
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