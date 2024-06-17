import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Router from "next/router";

import LatestBets from "~/common/modules/components/Bets/LatestBets";
import MyBets from "~/common/modules/components/Bets/UserBets";
import { useState } from "react";
import MainWindow from "~/common/modules/components/Main/MainWindow/MainWindow";
import { toast } from "sonner";
import Nav from "~/common/modules/components/Nav/Nav";
import TrendingBets from "~/common/modules/components/Main/TrendingBets/TrendingBets";
import LiveTickets from "~/common/modules/components/Main/LiveTickets/LiveTickets";
import SportsList from "~/common/modules/components/Main/SportsList/SportsList";
import MainBet from "~/common/modules/components/Main/MainBet/MainBet";
import InviteBanner from "~/common/modules/components/Main/InviteBanner/InviteBanner";
import UserBets from "~/common/modules/components/Main/UserBets/UserBets";
import UserDetails from "~/common/modules/components/Main/UserDetails/UserDetails";
import HottestBet from "~/common/modules/components/Main/HottestBet/HottestBet";
import Modal from "~/common/modules/components/Modal/Modal";
import Footer from "~/common/modules/components/Footer/Footer";

export default function Home() {

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isModalOpen, setModalOpen] = useState(false);
  const [chosenSport, setSport] = useState("Basketball");
  const [isBetSetup, setBetSetup] = useState(false);
  const [gameId, setGameId] = useState("");
  const [userBetsMore, setUserBetsMore] = useState(false);

  const changeBetSetup = (state:boolean) => {
    setBetSetup(state);
  }

  const changeGameId = (gameId: string) => {
    setGameId(gameId)
  }

  const changeChosenSport = (sport: string) => {
    setSport(sport);
  }

  const changeUserBetsMore = (state: boolean) => {
    setUserBetsMore(state);
  }


 
  return (
    <>
      <Head>
        <title>Home | Betton</title>
      </Head>
      <div className="flex gap-4 justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
        <Nav isHomePage={true}></Nav>
        <div className="justify-center items-start gap-5 main-grid">
        <div className="row-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
         <HottestBet userId={userId ?? ""}></HottestBet>
          </div>
          <div className="col-span-4 row-span-3 h-full justify-center items-center flex-col text-white p-[1px]  bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <MainWindow sport={chosenSport} userId={userId ?? ""} setBet={changeBetSetup} setGameId={changeGameId}></MainWindow>
          </div>
          <div className={` ${userId ? "h-full" : "hidden"} justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl`}>
            <UserDetails userId={userId ?? ""}></UserDetails>
          </div>
          <div className={` ${userId ? "row-span-2" : "row-span-3"} ${userBetsMore && "row-span-6"} ease-in-out duration-300 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl`}>
          <UserBets changeUserBetsMore={changeUserBetsMore} isMore={userBetsMore} userId={userId ?? ""}></UserBets>
          </div>
          <div className="row-span-5 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
          <SportsList changeSport={changeChosenSport}></SportsList>
          </div>
          <div className="row-span-2 h-full col-span-4  justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <MainBet isSetup={isBetSetup} setBetSetup={changeBetSetup} gameId={gameId?? ""} userId={userId?? ""}></MainBet>
          </div>
          <div className={` ${userBetsMore && "hidden"} row-span-4 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl`}>
           <InviteBanner userId={userId?? ""}  ></InviteBanner>
          </div>
          <div className="row-span-2 col-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <TrendingBets></TrendingBets>
          </div>
          <div className="row-span-2 col-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <LiveTickets></LiveTickets>
          </div>
          <div className="row-span-3 col-span-6 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
          <Footer></Footer>
          </div>  

        </div>
      </div>
      </>
 
    );
}

