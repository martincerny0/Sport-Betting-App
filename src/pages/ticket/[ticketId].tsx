import { Router, useRouter } from 'next/router'
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';
import Nav from '~/common/modules/components/Nav/Nav';
import Head from 'next/head';
import Footer from '~/common/modules/components/Footer/Footer';
import Link from 'next/link';
import RelatedBets from '~/common/modules/components/RelatedBets/RelatedBets';

export default function Ticket() {
  const router = useRouter();
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.ticketId) {
      setTicketId(router.query.ticketId as string);
    }
  }, [router.query.ticketId]);

  const { data: bet, isLoading, error } = api.bet.getBetById.useQuery(
    { id: ticketId ?? "", game: true, user: true}, 
    { enabled: !!ticketId }
  );
  const { data: user } = api.user.getUserById.useQuery({ id: bet?.userId ?? "" }, { enabled: !!bet?.userId });


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!bet || error) {
    return <p>Kokote</p>;
  }


  return (
    <>
    <Head>
        <title>Ticket | Betton</title>
      </Head>
      <div className="flex gap-4 justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
        <Nav isHomePage={false}></Nav>
        <div className="justify-center items-start gap-5 main-grid">

        <div className="row-span-4 col-span-1 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
          
          <div className="h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex">
          </div>

        </div>

        <div className="row-span-4 col-span-4 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
          
          <div className="h-full w-full items-start justify-start flex-col p-5 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex">

          <div className="items-start w-full justify-between flex">
          <p className=' border-b border-[#EEBC8A]  text-xl p-2'>{user?.name}</p>
          <p className=' text-base p-4'>{ bet.createdAt.toLocaleDateString()} {bet.createdAt.toLocaleTimeString().slice(0,5)}</p>
          </div>
          
          <div className='ml-4 hover:cursor-pointer mt-5 self-center' onClick={() => router.push(`/game/${bet.game.id}`)}>
          <p className='text-xl border-b border-[#EEBC8A] p-2'>{bet.game.team1Name} vs {bet.game.team2Name}</p>
          <p className='mt-2 text-center'><span className='text-[#8CC545]'>{bet.amount} $</span> - <span className='text-[#f55353]'>{bet.potentialWin} $</span> </p>
          {bet.type === "Over" || bet.type === "Under" ? (
            <p className=' text-base'>{bet.type} {bet.game.breakPoint}</p>
          ) : (
            <p className=' text-base'>{bet.prediction === "Team1" ? bet.game.team1Name : bet.game.team2Name}<span className={`${bet.type === "Win" ? "text-yellow-200" : "text-red-300"}`}> {bet.type}</span></p>
          )}
          {/* <p>
            {bet.game.status === "Finished" ? (
              bet.game.team1Score > bet.game.team2Score ? (bet.game.team1Name + " Won") : (bet.game.team2Name + " Won")
            ) : (
              `${bet.game.currentIngameTime}'`
            )}
          </p> */}

          </div>
          </div>
      
        </div>

        <div className="row-span-4 col-span-1 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">  
          <RelatedBets gameId={bet.game.id} originBetId={bet.id}></RelatedBets>
        </div>

          <div className="row-span-1 col-span-6 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
             <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
