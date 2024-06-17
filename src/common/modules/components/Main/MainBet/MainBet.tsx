import {api} from '~/utils/api';
import React, { useEffect, useState } from 'react';
import SmallLoading from "~/common/modules/components/SmallLoading/SmallLoading";
import { set } from 'zod';
import Link from 'next/link';

interface IMainBetProps {
  isSetup: boolean;
  gameId: string;
  userId: string;
  setBetSetup(): void;
}

const MainBet: React.FC<IMainBetProps> = ({isSetup, setBetSetup, gameId, userId}) => {

  const { data : game, isLoading, isError } = api.game.getGameById.useQuery({gameId: gameId});
  const createBetMutation = api.bet.createBet.useMutation();

  const [potentialWin, setPotentialWin] = React.useState(0);
  const [chosenTeam, setChosenTeam] = React.useState("");
  const [chosenOutcome, setChosenOutcome] = React.useState("");
  const [chosenBetType, setBetType] = React.useState(true);
  const [chosenAmount, setAmount] = React.useState(0);
  const [isBetSending, setBetSending] = React.useState(false);
  const [odds, setOdds] = React.useState(1)


  const changeOdds = () => {
    if (chosenOutcome === "Over") {
      setOdds(game?.oddsUnder ?? 0);
    } else if (chosenOutcome === "Under") {
      setOdds(game?.oddsOver ?? 0);
    } else if (chosenOutcome === "Win" && chosenTeam === "Team1") {
      setOdds(game?.oddsTeam2Win ?? 0);
    } else if (chosenOutcome === "Win" && chosenTeam === "Team2") {
      setOdds(game?.oddsTeam1Win ?? 0);
    } else if (chosenOutcome === "Lose" && chosenTeam === "Team1") {
      setOdds(game?.oddsTeam1Win ?? 0); // Opposite of Team1 Win
    } else if (chosenOutcome === "Lose" && chosenTeam === "Team2") {
      setOdds(game?.oddsTeam2Win ?? 0); // Opposite of Team2 Win
    } else {
      setOdds(1);
    }
    
  }


  const createBet = async () => {
    if(chosenAmount === 0) return;
    if(chosenBetType && (chosenTeam === "" || chosenOutcome === "")) return;
    if(!chosenBetType && chosenOutcome === "") return;

    setBetSending(true);
    const response = await createBetMutation.mutateAsync({gameId: gameId, userId: userId, amount: chosenAmount, prediction: chosenTeam, type: chosenOutcome, odds: odds});
      if(response){
      setBetSending(false);
      }
  }

  if(!userId) return (
    <div className="flex h-full items-center justify-between flex-row px-12 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
    <div className="flex flex-col items-center justify-center h-full">
      {/* <p className="font-bold text-2xl">{game?.team1Name} vs {game?.team2Name}</p> */}
    </div>
    <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
    <div className="flex flex-col items-center justify-center h-full">
      <p className="font-bold text-2xl text-[#EEBC8A] animate-pulse">Log in to start <Link className='text' href={"/signin"}>winning</Link></p>
      <p className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-10 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex mt-12">SIGN IN</p>
    </div>
    <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
    <div className="flex flex-col items-center justify-center h-full gap-3">
      {/* <p className="font-bold text-2xl">RETURN RATE</p> */}
      {/* <p className="font-bold text-2xl text-[#8CC545]">+1229$</p> */}
      {/* <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">BOOST TICKET</button> */}
    </div>
    </div>
  )
    return (
      isSetup ? (
        <div className="flex h-full items-center justify-between flex-row px-12 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
                <div className="flex h-full items-center gap-3 flex-col justify-center">
                <div className="flex items-start flex-row bg-gradient-to-b from-[#0D263D] to-[#3A425A] rounded-lg">
                    <button onClick={() => {setBetType(true); setChosenTeam(""); setChosenOutcome("");}} className={`p-0.5 px-3 font-bold text-sm rounded-lg ease-in-out duration-300 ${chosenBetType && "bg-gradient-to-b from-[#FFC701] to-[#FF9900]"}`}>OUTCOME</button>
                    <button onClick={() => {setBetType(false); setChosenTeam(""); setChosenOutcome("");}} className={`p-0.5 px-4 font-bold text-sm rounded-lg ease-in-out duration-300 ${!chosenBetType && "bg-gradient-to-b from-[#FFC701] to-[#FF9900]"}`}>SCORE</button>
                </div>
                <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px]`}>
                  {chosenBetType ? (
                    <>
                      <div className='flex'>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A] rounded-tl-lg rounded-bl-lg ${chosenTeam === "Team1" && "opacity-60"}`} onClick={() => {setChosenTeam("Team1"); changeOdds()}} disabled={chosenTeam === "Team1"}>{game?.team1Name}</button>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A] rounded-tr-lg rounded-br-lg ${chosenTeam === "Team2" && "opacity-60"}`} onClick={() => {setChosenTeam("Team2"); changeOdds()}} disabled={chosenTeam === "Team2"}>{game?.team2Name}</button>
                      </div>
                      <div className='flex mt-3'>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A] rounded-tl-lg rounded-bl-lg ${chosenOutcome === "Win" && "opacity-60"}`} onClick={() => {setChosenOutcome("Win"); changeOdds()}} disabled={chosenOutcome === "Win"}>WIN</button>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A] rounded-tr-lg rounded-br-lg ${chosenOutcome === "Lose" && "opacity-60"}`} onClick={() => {setChosenOutcome("Lose"); changeOdds()}} disabled={chosenOutcome === "Lose"}>LOSE</button>
                      </div>
                      <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg mt-3`}>
                        <input placeholder='Enter Amount' onChange={(e) => {setAmount(parseInt(e.target.value))}} className={`text-[#FAECDE] bg-gradient-to-b  from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2`}></input>
                      </div>
                  </>) : (<>
                    <div className='flex'>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A] rounded-tl-lg rounded-bl-lg ${chosenOutcome === "Over" && "opacity-60"}`} onClick={() => {setChosenOutcome("Over"); changeOdds()}} disabled={chosenOutcome === "Over"}>OVER</button>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A]  ${chosenTeam === "Team2" && "opacity-60"}`}  disabled={true}>{game?.breakPoint}</button>
                        <button className={`bg-gradient-to-b from-[#3A425A] to-[#0D263D] p-1 px-12 font-bold text-sm ease-in-out duration-300 hover:text-[#EEBC8A] flex border border-[#EEBC8A] rounded-tr-lg rounded-br-lg ${chosenOutcome === "Under" && "opacity-60"}`} onClick={() => {setChosenOutcome("Under"), changeOdds()}} disabled={chosenOutcome === "Under"}>UNDER</button>
                      </div>
                      <div className={`flex h-min min-h-min justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-lg mt-3`}>
                        <input placeholder='Enter Amount' onChange={(e) => {setAmount(parseInt(e.target.value))}} className={`text-[#FAECDE] bg-gradient-to-b  from-[#3A425A] to-[#0D263D] rounded-lg h-6 w-48 px-2 focus:outline-[#666666] ease-in-out duration-300 text-sm indent-0.5 font-light hover:ring-[#666666] hover:ring-2`}></input>
                      </div>
                  </>)}
                </div>
                </div>
                <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
                <div className="flex h-full items-center gap-3 flex-col justify-center">
                <p className="font-bold text-2xl">{game?.team1Name} vs {game?.team2Name}</p>
                <p className="font-bold text-2xl">[START TIME]</p>
                  <div className="flex-row justify-between w-full items-center">
                    {chosenBetType ? (<>
                      <p className="font-bold text-center">{chosenOutcome && (chosenTeam === "Team1" ? game?.team1Name  : game?.team2Name)} {chosenOutcome}</p>
                      <p className="font-bold text-2xl text-[#8CC545] text-center">
                      {isNaN(odds * chosenAmount) ? 0 : (odds*chosenAmount).toFixed(2)}$
                    </p>
                    </>) : (<>
                    {chosenOutcome &&  <p className="font-bold text-center">{chosenOutcome} {game?.breakPoint}</p>}
                    <p className="font-bold text-2xl text-[#8CC545] text-center">
                    {isNaN(odds * chosenAmount) ? 0 : (odds*chosenAmount).toFixed(2)}$
                  </p>                    
                  </>
                    )}
                  </div>
                  <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-12 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex" onClick={createBet}>BET <SmallLoading isPending={isBetSending}></SmallLoading></button>
                </div>
              </div>
      ) : (
        <div className="flex h-full items-center justify-between flex-row px-12 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
        <div className="flex flex-col items-center justify-center h-full">
          {/* <p className="font-bold text-2xl">{game?.team1Name} vs {game?.team2Name}</p> */}
        </div>
        <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="font-bold text-2xl text-[#EEBC8A]">SELECT GAME TO START BETTING</p>
        </div>
        <div className="w-[1px] h-5/6 bg-[#EEBC8A]"></div>
        <div className="flex flex-col items-center justify-center h-full gap-3">
          {/* <p className="font-bold text-2xl">RETURN RATE</p> */}
          {/* <p className="font-bold text-2xl text-[#8CC545]">+1229$</p> */}
          {/* <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">BOOST TICKET</button> */}
        </div>
        </div>
      )
    )
}

export default MainBet;