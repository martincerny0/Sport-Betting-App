import React from "react"
import { api } from "~/utils/api";

interface IMainWindowProps {
    userId: string;
    sport: string;
    setBet(state: boolean) : void;
    setGameId(gameId: string): void;
}

const MainWindow : React.FC<IMainWindowProps> = ({userId, sport, setBet, setGameId}) => {

  const { data, isLoading, isError } = api.game.getGamesBySport.useQuery({sport: sport});
  const { data: sportData } = api.sport.getSportByName.useQuery({name: sport});

  const [index, setIndex] = React.useState(0);

  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>There was an Error loading data, <br></br> Please try again Later</div>;

  if(!data) return <div>No data</div>;

  const currentGame = data[index];

  const addIndex = () => {
    if(index === data.length - 1) {
      return setIndex(0);
    }
    setIndex(index + 1);
  }

  const removeIndex = () => {
    if(index === 0) {
      return setIndex(data.length - 1);
    }
    setIndex(index - 1);
  }

    return (
          <div className="relative h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
            <div className="w-full h-full">
              <img alt="hriste" className="w-full h-full rounded-xl opacity-50" src={sportData?.image as string}></img>
              <p className="absolute left-48 top-28 font-bold text-3xl">{currentGame?.team1Name} vs {currentGame?.team2Name}</p>
              <div className="absolute left-52 top-56 flex flex-row gap-10 justify-center items-center">
              <div className="h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex h-full items-center justify-center flex-col p-2 w-24">
                <p className="font-bold text-sm text-center">{currentGame?.team1Name}</p>
                <p className="font-bold text-sm text-[#FFCA0D]">Win {currentGame?.oddsTeam1Win}</p>
                </div>
              </div>
              <div className="h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex h-full items-center justify-center flex-col p-2">
                {/* <p className="font-bold text-2xl">10.2</p> */}
                <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-10 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex" onClick={() => {setBet(true); setGameId(currentGame?.id ?? "")}}>BET</button>
                </div>
              </div>
              <div className="h-full items-start justify-between flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
              <div className="flex h-full items-center justify-center flex-col p-2 w-24">
                <p className="font-bold text-sm text-center">{currentGame?.team2Name}</p>
                <p className="font-bold text-sm text-[#FFCA0D]">Win {currentGame?.oddsTeam2Win}</p>
                </div>
              </div>
              <button onClick={removeIndex}>Left</button>
              <button onClick={addIndex}>Right</button>
              </div>
            </div>
            </div>
    )
}

export default MainWindow;

