import Team from "../../molecules/player";
import { PlayerInfo } from "../../molecules/physic-info";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayerData, RosterData } from "../../../types";
import { CommonModal } from "../../organisms/modal";
import { TableLoader } from "../../molecules/table-loader";

let playersData: any = [];
let positionCounts = {
  Goalkeeper: 0,
  Defender: 0,
  Midfielder: 0,
  Forward: 0
};

const FormationFiledTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [allPlayerData, setAllPlayerData] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayerClick = (player: any) => {
    // @ts-ignore
    let data = playersData.find(person => player.number == person.jerseyNumber);
    setPlayerData(data);
  };

  const findStarterTeam = (players: any) => {
    let selectedGoalkeeper = null;
    let selectedDefenders = [];
    let selectedMidfielders = [];
    let selectedForwards = [];
    positionCounts = {
      Goalkeeper: 0,
      Defender: 0,
      Midfielder: 0,
      Forward: 0
    };

    for (let player of players) {
      if (player.starter) {
        if (player.position === "Goalkeeper") {
          positionCounts.Goalkeeper += 1;
          if (!selectedGoalkeeper) {
            selectedGoalkeeper = player;
          }
        }
        else if (player.position === "Defender") {
          positionCounts.Defender += 1;
          if (selectedDefenders.length < 4) {
            selectedDefenders.push(player);
          }
        }
        else if (player.position === "Midfielder") {
          positionCounts.Midfielder += 1;
          if (selectedMidfielders.length < 3) {
            selectedMidfielders.push(player);
          }
        }
        else if (player.position === "Forward") {
          positionCounts.Forward += 1;
          if (selectedForwards.length < 3) {
            selectedForwards.push(player);
          }
        }
      }
    }
    setAllPlayerData([selectedGoalkeeper, ...selectedDefenders, ...selectedMidfielders, ...selectedForwards]);
  };

  const fetchRosterData = async () => {
    try {
      const response = await fetch(`http://3.81.90.125:5001/api/roster/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: RosterData[] = await response.json();
      playersData = data[0]?.players;
      findStarterTeam(playersData)
      setPlayerData(data[0]?.players[0] || null);
    } catch (error) {
      console.error("Error fetching roster data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRosterData();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white"><TableLoader colSpan={6} /></div>;
  }

  if (!playerData) {
    return <div><div className="h-[460px] flex flex-col justify-center items-center">
      <h4 className="text-center text-lg leading-[27px] font-semibold flex items-center gap-2">
        <img
          src="/image/triangle-exclamation.svg"
          width={23}
          height={23}
          alt="exclamation"
        />{" "}
        <span className="text-white">No Player data found</span>
      </h4>
      <p className="text-accent text-sm font-normal leading-[22px] mt-2">
        Please import your roster first
      </p>
      <button
        onClick={() => navigate("/importer")}
        className="py-3 px-5 rounded-lg text-lightWhite focus:outline-none mt-3 text-sm leading-[21px] font-medium border bg-transparent border-accent"
      >
        Go to Import List Page
      </button>
    </div></div>;
  }

  const playerStats = {
    appearances: playerData.appearances,
    minutesPlayed: playerData.minutesPlayed,
    cleanSheets: playerData.cleanSheets,
    saves: playerData.saves,
    assists: playerData.assists,
    goals: playerData.goals,
  };

  const formation = {
    defenders: allPlayerData.slice(1, 5),
    midfielders: allPlayerData.slice(5, 8),
    forwards: allPlayerData.slice(8, 11),
  };

  const players = [
    {
      number: allPlayerData?.[0]?.jerseyNumber,
      name: allPlayerData?.[0]?.playerName,
      bgColor: "bg-primary",
    },
    ...formation.defenders.map((player) => ({
      number: player?.jerseyNumber,
      name: player?.playerName,
      bgColor: "bg-[#2e2c2d]",
    })),
    ...formation.midfielders.map((player) => ({
      number: player?.jerseyNumber,
      name: player?.playerName,
      bgColor: "bg-[#2e2c2d]",
    })),
    ...formation.forwards.map((player) => ({
      number: player?.jerseyNumber,
      name: player?.playerName,
      bgColor: "bg-[#2e2c2d]",
    })),
  ];

  const GoalkeeperLen = positionCounts.Goalkeeper;
  const DefenderLen = positionCounts.Defender;
  const MidfielderLen = positionCounts.Midfielder;
  const ForwardLen = positionCounts.Forward;

  const Goalkeeper = GoalkeeperLen == 1;
  const Defender = DefenderLen == 4;
  const Midfielder = MidfielderLen == 3;
  const Forward = ForwardLen == 3;
  let isvalid = true;
  if (!(Goalkeeper && Defender && Midfielder && Forward))
    isvalid = false
  return (
    <>
      <div className="bg-[#2d2d2d] p-8 mt-6">
        <div className="flex justify-between">
          <Team hide={!isvalid ? true : false}
            player1={{
              number: players?.[0]?.number,
              name: players?.[0]?.name,
              bgColor: players?.[0]?.bgColor,
              onClick: () => handlePlayerClick(players?.[0])
            }}
            player2={{
              number: players?.[1]?.number,
              name: players?.[1]?.name,
              bgColor: players?.[1]?.bgColor,
              onClick: () => handlePlayerClick(players?.[1])
            }}
            player3={{
              number: players?.[2]?.number,
              name: players?.[2]?.name,
              bgColor: players?.[2]?.bgColor,
              onClick: () => handlePlayerClick(players?.[2])
            }}
            player4={{
              number: players?.[3]?.number,
              name: players?.[3]?.name,
              bgColor: players?.[3]?.bgColor,
              onClick: () => handlePlayerClick(players?.[3])
            }}
            player5={{
              number: players?.[4]?.number,
              name: players?.[4]?.name,
              bgColor: players?.[4]?.bgColor,
              onClick: () => handlePlayerClick(players?.[4])
            }}
            player6={{
              number: players?.[5]?.number,
              name: players?.[5]?.name,
              bgColor: players?.[5]?.bgColor,
              onClick: () => handlePlayerClick(players?.[5])
            }}
            player7={{
              number: players?.[6]?.number,
              name: players?.[6]?.name,
              bgColor: players?.[6]?.bgColor,
              onClick: () => handlePlayerClick(players?.[6])
            }}
            player8={{
              number: players?.[7]?.number,
              name: players?.[7]?.name,
              bgColor: players?.[7]?.bgColor,
              onClick: () => handlePlayerClick(players?.[7])
            }}
            player9={{
              number: players?.[8]?.number,
              name: players?.[8]?.name,
              bgColor: players?.[8]?.bgColor,
              onClick: () => handlePlayerClick(players?.[8])
            }}
            player10={{
              number: players?.[9]?.number,
              name: players?.[9]?.name,
              bgColor: players?.[9]?.bgColor,
              onClick: () => handlePlayerClick(players?.[9])
            }}
            player11={{
              number: players?.[10]?.number,
              name: players?.[10]?.name,
              bgColor: players?.[10]?.bgColor,
              onClick: () => handlePlayerClick(players?.[10])
            }}
          />

          <PlayerInfo hide={isvalid ? true : false}
            name={playerData?.playerName}
            position={playerData?.position}
            height={`${(playerData?.height ?? 0) / 100} m`}
            weight={`${playerData?.weight ?? 0} kg`}
            nationality={playerData?.nationality}
            flagSrc={playerData?.flagImg}
            pictureSrc={playerData?.playerImg || "/image/test-player.png"}
            jrsyNumber={playerData.jerseyNumber}
            stats={playerStats}
          />
        </div>
      </div>
      <CommonModal
        isOpen={!isvalid}
        show={true}
      >
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-center text-lg leading-[27px] font-semibold flex items-center gap-2">
            <img
              src="/image/triangle-exclamation.svg"
              width={23}
              height={23}
              alt="exclamation"
            />{" "}
            <span className="text-white">
              {
                positionCounts.Goalkeeper > 1 || positionCounts.Defender > 4 || positionCounts.Midfielder > 3 || positionCounts.Forward > 3 ? "There are too many starters" : "Not enough starters"
              }
            </span>
          </h4>
          <p className="text-accent text-sm font-normal leading-[22px] mt-2 text-center">
            Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation
          </p>
          <div className="flex justify-around w-full items-center mb-2">
            <div className="text-accent text-xs font-normal leading-[18px] mt-4">Positions</div>
            <div className="text-accent text-xs font-normal leading-[18px] mt-4">Required</div>
            <div className="text-accent text-xs font-normal leading-[18px] mt-4">Current</div>
          </div>
          {
            !Goalkeeper && <div className="grid grid-cols-3 text-center bg-[#222222] rounded-lg my-2 w-full py-3">
              <div className="text-white text-sm font-medium leading-[18px]">Goalkeeper</div>
              <div className="text-white text-sm font-medium leading-[18px]">1</div>
              <div className="text-primary text-sm font-medium leading-[18px]">{GoalkeeperLen}</div>
            </div>
          }
          {
            !Defender && <div className="grid grid-cols-3 text-center bg-[#222222] rounded-lg w-full py-3">
              <div className="text-white text-sm font-medium leading-[18px]">Defender</div>
              <div className="text-white text-sm font-medium leading-[18px]">4</div>
              <div className="text-primary text-sm font-medium leading-[18px]">{DefenderLen}</div>
            </div>
          }
          {
            !Midfielder &&
            <div className="grid grid-cols-3 text-center bg-[#222222] my-2 rounded-lg w-full py-3">
              <div className="text-white text-sm font-medium leading-[18px]">Midfielder</div>
              <div className="text-white text-sm font-medium leading-[18px]">3</div>
              <div className="text-primary text-sm font-medium leading-[18px]">{MidfielderLen}</div>
            </div>
          }
          {
            !Forward && <div className="grid grid-cols-3 text-center bg-[#222222] rounded-lg w-full py-3">
              <div className="text-white text-sm font-medium leading-[18px]">Forward</div>
              <div className="text-white text-sm font-medium leading-[18px]">3</div>
              <div className="text-primary text-sm font-medium leading-[18px]">{ForwardLen}</div>
            </div>
          }
        </div>
      </CommonModal>
    </>
  );
};

export default FormationFiledTemplate;









