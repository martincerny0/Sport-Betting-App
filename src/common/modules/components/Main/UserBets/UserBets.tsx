import { api } from "~/utils/api";
import Link from "next/link";
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";
import Router from "next/router";

interface IUserBetsProps {
    userId: string;
    isMore: boolean;
    changeUserBetsMore(state: boolean): void;
}


const UserBets: React.FC<IUserBetsProps> = ({userId, isMore, changeUserBetsMore}) => {

    if(!userId) return (
    <div className="h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex p-5">
    <p className="font-bold text-[#EEBC8A] text-sm pt-2">MY TICKETS</p>
    <p className="text-[#EEBC8A] text-sm mt-20 text-center">Log in to view your tickets</p>
    </div>
    )

    const { data, isLoading, isError } = api.bet.getUserBets.useQuery({userId: userId});
    if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
    if(isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className="p3">There was an Error loading Data. Try Again Later</p></div>;
    if(!data) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><p>You have no tickets</p></div>;

    const maxIndex = isMore ? data?.length-1 : 3;
    return (
        <div className="h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex">
        <p className="font-bold text-[#EEBC8A] text-sm pt-2">MY TICKETS</p>
        <table className="font-bold text-xs">
          <tbody>
          {data?.slice(0, maxIndex).map((Bet, index) => (
            <>
               <tr key={Bet.id} className="hover:cursor-pointer" onClick={async () => await Router.push(`/ticket/${Bet.id}`)}>
                    <td className="pt-1">{Bet.game.team1Name} vs {Bet.game.team2Name}</td>
                    <td  className="ps-5 pt-2 text-base text-[#FFCA0D]">{Bet.odds}</td>
                </tr>
                <tr className="border-b border-[#EEBC8A] hover:cursor-pointer" onClick={async () => await Router.push(`/ticket/${Bet.id}`)}>
                  {Bet.type === "Over" || Bet.type === "Under" ? (
                  <td  className="pb-1 text-[#D1B657]">{Bet.type} {Bet.prediction}</td>
                  ) : (
                  <td  className="pb-1 text-[#D1B657]">{Bet.prediction === "Team1" ? Bet.game.team1Name : Bet.game.team2Name} {Bet.type}</td>
                  )}
                  <td  className="pb-1 text-[#8CC545]">{Math.round(Bet.potentialWin)}$</td>
                </tr>
                </>
        ))}
            {data?.length === 0 && <p className="text-[#EEBC8A] text-sm mt-20 text-center">You have no tickets</p>}
          </tbody>
        </table>
        {data && data?.length > 3 && (
              <button className={` ${isMore && "mt-3"} scale-90 bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-1 p-1 px-2 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex`} onClick={() => changeUserBetsMore(!isMore)}><span className="f7-icons ico-size-20">{isMore ? "arrow_up" : "arrow_down"}</span>{isMore ? "CLOSE" : "MORE"}</button>
            )}
        {data && data?.length >= 11 && isMore &&(
              <Link href={"account"} className={` ${isMore && "mt-3"} scale-90 bg-gradient-to-b from-[#FFC701] to-[#FF9900] mt-1 p-1 px-2 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex`} onClick={() => changeUserBetsMore(!isMore)}>OPEN IN ACCOUNT<span className="f7-icons ico-size-20">arrow_up_right</span></Link>
            )}
      </div>
    )
}

export default UserBets;