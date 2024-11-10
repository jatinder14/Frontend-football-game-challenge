import React from "react";


interface PlayerProps {
  number: number;
  name: string;
  bgColor: string;
  onClick?: (params: any) => void;
}


const Player: React.FC<PlayerProps> = ({ number, name, bgColor, onClick }) => (
  <div className="flex flex-col gap-2 justify-center text-center cursor-pointer" onClick={onClick}>
    <div
      className={`w-8 h-8 flex justify-center items-center rounded-full ${bgColor} border-2 border-accent text-white mx-auto`}
    >
      {number}
    </div>
    <h3 className="text-white text-sm leading-[21px] font-medium">{name}</h3>
  </div>
);


interface TeamProps {
  player1: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player2: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player3: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player4: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player5: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player6: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player7: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player8: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player9: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player10: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  player11: { number: number; name: string; bgColor: string; onClick?: (params: any) => void; };
  hide: boolean
}


const Team: React.FC<TeamProps> = ({
  player1,
  player2,
  player3,
  player4,
  player5,
  player6,
  player7,
  player8,
  player9,
  player10,
  player11,
  hide
}) => {
  return (
    <div className="relative">
      <img src={"/image/Field.svg"} alt="logo" className="h-full" />
      <div className={`absolute top-0 flex h-full gap-[63px] w-full p-5 ${hide ? "hidden" : "block"}`}>
        <div className="flex flex-col gap-2 justify-center text-center">
          <Player
            number={player1.number}
            name={player1.name}
            bgColor={player1.bgColor}
            onClick={player1.onClick}
          />
        </div>


        <div className="flex flex-col justify-around">
          <Player
            number={player2.number}
            name={player2.name}
            bgColor={player2.bgColor}
            onClick={player2.onClick}
          />
          <Player
            number={player3.number}
            name={player3.name}
            bgColor={player3.bgColor}
            onClick={player3.onClick}
          />
          <Player
            number={player4.number}
            name={player4.name}
            bgColor={player4.bgColor}
            onClick={player4.onClick}
          />
          <Player
            number={player5.number}
            name={player5.name}
            bgColor={player5.bgColor}
            onClick={player5.onClick}
          />
        </div>


        <div className="flex flex-col justify-around">
          <Player
            number={player6.number}
            name={player6.name}
            bgColor={player6.bgColor}
            onClick={player6.onClick}
          />
          <Player
            number={player7.number}
            name={player7.name}
            bgColor={player7.bgColor}
            onClick={player7.onClick}
          />
          <Player
            number={player8.number}
            name={player8.name}
            bgColor={player8.bgColor}
            onClick={player8.onClick}
          />
        </div>


        <div className="flex flex-col justify-around">
          <Player
            number={player9.number}
            name={player9.name}
            bgColor={player9.bgColor}
            onClick={player9.onClick}
          />
          <Player
            number={player10.number}
            name={player10.name}
            bgColor={player10.bgColor}
            onClick={player10.onClick}
          />
          <Player
            number={player11.number}
            name={player11.name}
            bgColor={player11.bgColor}
            onClick={player11.onClick}
          />
        </div>
      </div>
    </div>
  );
};


export default Team;



