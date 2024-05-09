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

    <Layout>
       <MainWindow></MainWindow>
       
       <button onClick={() => toast.info("kokote")}>Games</button>
    </Layout>
    </>
  );
}

