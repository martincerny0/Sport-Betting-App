import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Router from "next/router";

import Layout from "~/common/modules/components/Layout/layout";
import LatestBets from "~/common/modules/components/Bets/LatestBets";
import AllGames from "~/common/modules/components/Games/AllGames";
import MyBets from "~/common/modules/components/Bets/UserBets";
import { useState } from "react";
import MainWindow from "~/common/modules/components/Main/MainWindow/MainWindow";
import { toast } from "sonner";
import Nav from "~/common/modules/components/Nav/Nav";

export default function Home() {

  const [gameId, setGameId] = useState("clva02gmo000a107nrdpjy1n1");

  const { data } = useSession();

  const gameById = api.game.getGameById.useQuery(gameId);
  const updateMutation = api.game.updateGame.useMutation();
  const updateBetMutation = api.bet.updateBets.useMutation();
  const betMutation =  api.bet.createBet.useMutation();
  const gameMutation = api.game.createGame.useMutation();
  const betsOnGame = api.bet.getBetsByGameId.useQuery({gameId});

  const allGamesQuery = api.game.getAllGames.useQuery();
  console.log(betsOnGame.data);
 
  const [showMyBets, setShowMyBets] = useState(true);


  const userId = data?.user?.id ?? "-";

  const userEmail = "martincerny@volny.cz";
 
  return (
    <>
      <Head>
        <title>Home | Betton</title>
      </Head>
      <div className="flex gap-4 justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
        <Nav></Nav>
        <div className="justify-center items-start gap-4 main-grid">
        <div className="row-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="w-full h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="col-span-4 row-span-3 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="row-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="row-span-5 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="row-span-2 h-full col-span-4  justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="row-span-4 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="row-span-2 col-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
          <div className="row-span-2 col-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            </div>
          </div>
        </div>
      </div>
      </>
 
    );
}

