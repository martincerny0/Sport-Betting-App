import { api } from '~/utils/api';
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";
import React from 'react';

interface IHottestBetProps {
    userId: string;
}

const HottestBet: React.FC<IHottestBetProps> = ({userId}) => {

    const { data, isLoading, isError } = api.bet.getHottestBet.useQuery();
    const [isConfirmation, setConfirmation] = React.useState(false)

    const BetMutation = api.bet.createBet.useMutation();

    const fastBet = () => {
        const response = BetMutation.mutate({gameId: data?.game.id ?? "", prediction: data?.prediction ?? "", amount: data?.amount ?? 0, userId: userId, type: data?.type ?? "", odds: data?.odds ?? 1});
    }

    if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
    if(isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className='p-3'>There was an Error loading Data. Try Again Later</p></div>;
    if(!data) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><p>There is no tickets</p></div>;


  

    return (
        <div className="flex w-full h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-bold text-[#EEBC8A] text-sm m-2">HOTTEST TICKET</p>
            <div className="text-[#FAECDE] font-bold bg-gradient-to-b from-[#FFD355] via-[#D33469] to-[#40348A] p-5 rounded-xl items-center justify-center flex flex-col">
                {/* <p className="text-sm">{sport.data?.unicode}</p> */}
                <p className="text-3xl">{data?.odds}</p>
                <p className="text-xs">{data?.type} {data?.prediction === "Team1" ? data?.game.team1Name : data.game.team2Name  }</p>
            </div>
            {!isConfirmation && (<>
            <p className="font-bold mt-2 text-sm">{data?.game.team1Name} : {data?.game.team2Name}</p>
            <p className="font-bold m-1 text-sm">{data?.amount} $</p>
            </>)}
            {isConfirmation ? (
                <>
                <p className='text-sm mt-5'>Place Ticket for {data.amount} $?</p>
                <div className='flex'>
                <button className="m-2 bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex" onClick={() => {fastBet(); setConfirmation(false)}}>YES</button>
                <button className="m-2 bg-gradient-to-b from-[#FFC701] to-[#D33469] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex" onClick={() => setConfirmation(false)}>NO</button>
                </div>
                </>
            ) : (
                <>
                {userId ? (
                    <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex" onClick={() => setConfirmation(true)}>
                      FAST BET
                    </button>
                  ) : (
                    <div></div>
                  )
                }
                </>               
            )}
        </div>
    );
};

export default HottestBet;
