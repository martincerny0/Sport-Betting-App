import { api } from '~/utils/api';
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";
import Router from "next/router";



const LiveTickets : React.FC = () => {

  const { data, isLoading, isError } = api.bet.getLatestBets.useQuery();

  
  if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
  if(isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className='p-3'>There was an Error loading Data. Try Again Later</p></div>;
  if(!data) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><p>There is no tickets</p></div>;


    return (
        <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl overflow-auto">
        <p className="font-bold text-[#EEBC8A] text-sm pt-2">LIVE TICKETS</p>
        <table className="font-bold text-xs w-full">
            <tbody>
              {data?.map((Bet, index) => (
                <>
               <tr className="border-b border-[#EEBC8A] hover:cursor-pointer hover:animate-pulse" key={Bet.id}  onClick={async () => await Router.push(`/ticket/${Bet.id}`)}>
                {Bet.type === "Over" || Bet.type === "Under" ? (
                  <td  className="text-[#D1B657]">{Bet.type} {Bet.prediction}</td>
                  ) : (
                  <td  className="text-[#D1B657]">{Bet.prediction === "Team1" ? Bet.game.team1Name : Bet.game.team2Name} {Bet.type}</td>
                  )}
                <td className="">{Bet.game.team1Name} vs {Bet.game.team2Name}</td>
                {/* <td  className=" text-base text-[#FFCA0D]">{Bet.createdAt}</td> */}
                <td  className=" text-base text-[#FFCA0D]">{Bet.odds}</td>
              </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default LiveTickets;