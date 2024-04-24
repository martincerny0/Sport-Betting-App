import React from 'react';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

interface GameProps {
    gameId: string;
    team1Score: number;
    team2Score: number;
    currentIngameTime: number;
    status: string;
    sport: string;
    team1Name: string;
    team2Name: string;
    startTime: Date;
    oddsTeam1Win: number;
    oddsTeam2Win: number;
    oddsOver: number;
    oddsUnder: number;
}


const Game : React.FC<GameProps> = ({gameId, team1Score, team2Score, currentIngameTime, status, sport, team1Name, team2Name, startTime, oddsTeam1Win, oddsTeam2Win, oddsOver, oddsUnder}) => {

    const { data } = useSession();

    const [betType, setBetType] = React.useState("");
    const [prediction, setPrediction] = React.useState("team1");
    const [amount, setAmount] = React.useState(0);
    
    const odds = betType === "win" ? oddsTeam1Win : betType === "lose" ? oddsTeam2Win : betType === "over" ? oddsOver : oddsUnder;

    const createBetMutation = api.bet.createBet.useMutation();

    const createBet = async (gameId : string) => {
        const response = await createBetMutation.mutateAsync({
            gameId: gameId,
            amount: amount,
            userId: data?.user?.id ?? "",
            type: betType,
            prediction: prediction,
            oddsTeam1Win: oddsTeam1Win,
            oddsTeam2Win: oddsTeam2Win,
            oddsOver: oddsOver,
            oddsUnder: oddsUnder,
        });
        if(!response) return;
        Router.reload();
    }

    // ----------------------------------

    // const [gameId,setGameId] = React.useState("s");

//     const { data } = useSession();
//     const userId = data?.user?.id ?? "";

//     const updateMutation = api.game.updateGame.useMutation();
//     const updateBetMutation = api.bet.updateBets.useMutation();
//     const betMutation =  api.bet.createBet.useMutation();
//     const gameMutation = api.game.createGame.useMutation();
//     const betsOnGame = api.bet.getBetsByGameId.useQuery({gameId});

//     const createBet = async (gameId : string) => {
//         const amount = 100;
    
//         const response = await betMutation.mutateAsync({
//           gameId: gameId,
//           amount: amount,
//           userId: userId,
//         });
//         Router.reload();
//       }

      
//         // to pujde dopice
//   const updateGame = async (gameId:string) => {
//     setGameId(gameId);
//     const status = "Completed";
//     const team1Score = 1444;
//     const team2Score = 144;   
          
//       const response = updateMutation.mutateAsync({
//           id: gameId,
//           team1Score: 1000,
//           team2Score: 4,
//           currentIngameTime: 45,
//           status: status,
//       });
//       console.log(response);
//       if(status === "Completed"){
//         await updateBets(gameId, team1Score, team2Score);
//       }

//     // Router.reload();
//   }
//   const updateBets = async (gameId: string, Team1Score: number, Team2Score: number) => {

//     const gameWinner = Team1Score > Team2Score ? "team1" : "team2";
//     console.log(gameWinner);
//     console.log(Team1Score);
//     console.log(Team2Score);
//     const gameScore = Team1Score + Team2Score;

  

//     await updateBetMutation.mutateAsync({gameId: gameId, bets: betsOnGame.data??[], gameWinner: gameWinner, gameScore: gameScore});
//     return;
//  }



    return (
        <div  className='border-gray-300 border w-1/12 flex justify-center items-center flex-col'>
          <div>
            <p>{sport}</p>
            <p>{team1Name} vs {team2Name}</p>
            <p>{team1Score} : {team2Score}</p>
            <p>{currentIngameTime} minute</p>
            <p>{status};</p>
            <br></br>
            <div>
                <div>
                <button className='border bg-green-100 border-yellow-100 m-1' onClick={() => {setBetType("win")}}>Win</button>
                <button className='border bg-red-100 border-yellow-100 m-1' onClick={() => {setBetType("lose")}}>Lose</button>
                </div>
                <div>
                <button className='border bg-green-100 border-yellow-100 m-1' onClick={() => {setBetType("over")}}>Over</button>
                <button className='border bg-red-100 border-yellow-100 m-1' onClick={() => {setBetType("under")}}>Under</button>
                </div>
                {betType !== "" && (
                  <div className='flex flex-col justify-center items-center'>
                      {(betType === "win" || betType === "lose") && 
                      <select name="" id="" onChange={(e) => setPrediction(e.target.value)}>
                      <option value="team1">{team1Name}</option>
                      <option value="team2">{team2Name}</option>
                      </select>
                      }
                      {(betType === "over" || betType === "under") &&
                      <>
                      <input className='border border-black'  type="text" onChange={(e) => setPrediction(e.target.value)} />
                      </>
                      }
                      <input type="text" placeholder="Amount" onChange={(e) => {setAmount(parseInt(e.target.value));}} className='border-black border'/>
                      <p>potential win: {amount * odds}</p>
                  </div>
                )}
                {prediction !== "" && amount !== 0 && !Number.isNaN(amount) && (
                  <button className='bg-orange-300 w-1/2' onClick={async () => { await createBet(gameId) }}>BET</button>    
                  )}
                  <br></br>
                  {prediction}
                  <br></br>
                  {amount}
                  <br></br>
                  {betType}
                </div>
                </div>
        </div>
       
    )
}

export default Game;