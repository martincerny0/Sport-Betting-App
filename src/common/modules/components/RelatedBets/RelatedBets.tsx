import { api } from "~/utils/api";
import Link from "next/link";
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";
import Router from "next/router";

interface IRelatedBetsProps {
    gameId: string;
    originBetId: string;
}


const RelatedBets: React.FC<IRelatedBetsProps> = ({gameId, originBetId}) => {

    if(!gameId) return (
    <div className="h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex p-5">
    <p className="font-bold text-[#EEBC8A] text-sm pt-2">RELATED TICKETS</p>
    <p className="text-[#EEBC8A] text-sm mt-20 text-center">There are no related tickets</p>
    </div>
    )

    const { data: bets, isLoading, isError } = api.bet.getRelatedBets.useQuery({gameId: gameId, originBetId: originBetId});
    if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
    if(isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className="p3">There was an Error loading Data. Try Again Later</p></div>;
    if(!bets) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><p>There are no related Tickets</p></div>;

    return (
        <div className="h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex">
        <p className="font-bold text-[#EEBC8A] text-sm pt-2">RELATED TICKETS</p>
        <table className="font-bold text-xs">
          <tbody>
          {bets?.slice(0,8).map((Bet, index) => (
            <>
               <tr key={Bet.id} className="hover:cursor-pointer hover:animate-pulse" onClick={async () => await Router.push(`/ticket/${Bet.id}`)}>
                    <td className="pt-1 max-w-28 text-pretty">{Bet.game.team1Name} vs {Bet.game.team2Name}</td>
                    <td  className="ps-5 pt-2 text-base text-[#FFCA0D]">{Bet.odds}</td>
                </tr>
                <tr className={`${index !== 7 && "border-b"} border-[#EEBC8A] hover:cursor-pointer `} onClick={async () => await Router.push(`/ticket/${Bet.id}`)}>
                  {Bet.type === "Over" || Bet.type === "Under" ? (
                  <td  className="pb-1 text-[#D1B657]">{Bet.type} {Bet.game.breakPoint}</td>
                  ) : (
                  <td  className="pb-1 text-[#D1B657]">{Bet.prediction === "Team1" ? Bet.game.team1Name : Bet.game.team2Name} {Bet.type}</td>
                  )}
                  <td  className="pb-1 text-[#8CC545]">{Math.round(Bet.potentialWin)}$</td>
                </tr>
                </>
        ))}
          </tbody>
        </table>
        {bets?.length === 0 && <p className="text-[#EEBC8A] text-sm mt-20 text-center">no related tickets</p>}
      </div>
    )
}

export default RelatedBets;