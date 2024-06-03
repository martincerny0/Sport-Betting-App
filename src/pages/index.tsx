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
        <div className="justify-center items-start gap-5 main-grid">
        <div className="row-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="flex w-full h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-bold text-[#EEBC8A] text-sm m-2 ">HOTTEST TICKET</p>
            <div className="text-[#FAECDE] font-bold bg-gradient-to-b from-[#FFD355] via-[#D33469] to-[#40348A] p-5 rounded-xl items-center justify-center flex flex-col">
              <p className="text-sm">Basketball</p>
              <p className="text-3xl">10.2</p>
              <p className="text-xs">LAKERS WIN</p>
            </div>
            <p className="font-bold m-2 text-sm">LAKERS : KOKOTI</p>
            <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">FAST BET</button>
            </div>
          </div>
          <div className="col-span-4 row-span-3 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="relative h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <div className="w-full h-full">
              <img className="w-full h-full rounded-xl opacity-50" src="./images/bsballrh.webp"></img>
              <p className="absolute left-48 top-28 font-bold text-3xl">LAKERS vs KOKOTI</p>
              <div className="absolute left-52 top-56 flex flex-row gap-10 justify-center items-center">
              <div className="h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex h-full items-center justify-center flex-col p-2 w-24">
                <p className="font-bold text-sm">LAKERS</p>
                <p className="font-bold text-sm">2 wins</p>
                </div>
              </div>
              <div className="h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex h-full items-center justify-center flex-col p-2">
                <p className="font-bold text-2xl">10.2</p>
                <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-10 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">BET</button>
                </div>
              </div>
              <div className="h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex h-full items-center justify-center flex-col p-2 w-24">
                <p className="font-bold text-sm">KOKOTI</p>
                <p className="font-bold text-sm">82 wins</p>
                </div>
              </div>
              </div>
            </div>
            </div>
          </div>
          <div className="h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
          <div className="h-full items-center font-bold flex justify-center flex-col  bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <p>YOUR BALANCE</p>
              <div className="flex flex-row gap-1">
              <div className="text-[#FAECDE] font-bold bg-gradient-to-b from-[#FFD355] via-[#D33469] to-[#40348A] rounded-xl items-center justify-center flex flex-col">
                <p className="p-1 px-2">8200$</p>
                </div>
                <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-2 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">REFILL</button>
                </div>
            </div>
          </div>
          <div className="row-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-center justify-start flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl flex">
              <p className="font-bold text-[#EEBC8A] text-sm pt-2">MY TICKETS</p>
              <table className="font-bold text-xs">
                <tbody>
                  <tr>
                    <td className="pt-2">LAKERS vs KOKOTI</td>
                    <td  className="ps-5 pt-2 text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]">
                    <td  className="pb-2 text-[#D1B657]">LAKERS WIN</td>
                  </tr>
                  <tr>
                    <td className="pt-2">LAKERS vs KOKOTI</td>
                    <td  className="ps-5 pt-2 text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]">
                    <td  className="pb-2 text-[#D1B657]">LAKERS WIN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row-span-5 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="text-[#FAECDE] font-bold text-base gap-2 flex h-full items-center justify-center flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl ease-in-out duration-300">
              <button className=" border-[#EEBC8A] w-full ease-in-out duration-300 hover:rounded-xl hover:border-solid hover:border">⚽️ Football</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏀 Basketball</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏈 Amer. Football</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🎾 Tennis</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏐 Volleyball</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏒 Hockey</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🎱 Snooker</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🎯 Darts</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🎳 Bowling</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏓 Table Tennis</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏸 Badminton</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏏 Cricket</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🥊 Boxing</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🥋 MMA</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏹 Archery</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🏇 Horse Racing</button>
              <button className="border-hidden border rounded-xl w-full ease-in-out duration-300 hover:border-[#EEBC8A] hover:border-solid">🚴 Cycling</button>
            </div>
          </div>
          <div className="row-span-2 h-full col-span-4  justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="flex h-full items-center justify-between flex-row px-12 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="font-bold text-2xl">LAKERS vs KOKOTI</p>
              </div>
              <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
              <div className="flex flex-col items-center justify-center h-full">
                <p className="font-bold text-2xl">10.2</p>
              </div>
              <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <p className="font-bold text-2xl">RETURN RATE</p>
                <p className="font-bold text-2xl text-[#8CC545]">+1229$</p>
                <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">BOOST TICKET</button>
              </div>
              </div>
          </div>
          <div className="row-span-4 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="flex h-full items-center justify-center flex-col px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <img src="iphon.svg" alt="iphone" className="p-2"></img>
            <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">SEND INVITE</button>
            </div>
          </div>
          <div className="row-span-2 col-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-bold text-[#EEBC8A] text-sm pt-2">TRENDING TICKETS</p>
            <table className="font-bold text-xs w-full">
                <tbody>
                <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row-span-2 col-span-2 h-full justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl">
            <div className="h-full items-start justify-between flex-row px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <p className="font-bold text-[#EEBC8A] text-sm pt-2">LIVE TICKETS</p>
            <table className="font-bold text-xs w-full">
                <tbody>
                <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                  <tr className="border-b border-[#EEBC8A]" >
                    <td  className="text-[#D1B657]">LAKERS WIN</td>
                    <td className="">LAKERS vs KOKOTI</td>
                    <td  className=" text-base text-[#FFCA0D]">10.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </>
 
    );
}

