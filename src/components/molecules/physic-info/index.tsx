import React, { useEffect, useRef } from "react";

interface PlayerStats {
  appearances: number;
  minutesPlayed: number;
  cleanSheets?: number;
  saves?: number;
  goals?: number | null;
  assists?: number | null;
}

interface PlayerInfoProps {
  name: string;
  position: string;
  height: string;
  weight: string;
  nationality: string;
  flagSrc: string;
  pictureSrc: string;
  hide: boolean;
  stats: PlayerStats;
  jrsyNumber:any;
}

const PlayerHeader: React.FC<{
  pictureSrc: string;
  name: string;
  position: string;
  jrsyNumber?:any
}> = ({  pictureSrc, name, position,jrsyNumber }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = () => {
    if (imgRef.current) {
      imgRef.current.src = "/image/test-player.png";
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/image/test-player.png";
  }, []);

  return (
    <>
      <div className="flex items-start">
        <div className="flex flex-col relative">
          <h3 className="text-8xl font-bold text-[#2e2d29]">{jrsyNumber}</h3>
          <h5 className="text-4xl font-bold absolute top-[33px] -left-4px text-primary">
           {jrsyNumber}
          </h5>
        </div>
        <img
          ref={imgRef}
          src={pictureSrc}
          alt="player"
          className="w-[150px]"
          onError={handleError}
        />
      </div>
      <div className="-mt-10">
        <h4 className="text-2xl font-medium leading-9 text-white">{name}</h4>
        <h5 className="text-lg font-semibold leading-[27px] text-primary">
          {position}
        </h5>
      </div>
    </>
  );
};

const PlayerPhysicalInfo: React.FC<{
  height: string;
  weight: string;
  nationality: string;
  flagSrc: string;
}> = ({ height, weight, nationality, flagSrc }) => (
  <div className="flex justify-between items-center mt-6 border-b border-[#494949] pb-6">
    <div className="flex flex-col gap-2">
      <h4 className="text-accent text-xs font-normal leading-[18px]">Height</h4>
      <h4 className="text-white text-sm font-medium leading-[21px]">
        {height}
      </h4>
    </div>
    <div className="flex flex-col gap-2">
      <h4 className="text-accent text-xs font-normal leading-[18px]">Weight</h4>
      <h4 className="text-white text-sm font-medium leading-[21px]">
        {weight}
      </h4>
    </div>
    <div className="flex flex-col gap-2">
      <h4 className="text-accent text-xs font-normal leading-[18px]">
        Nationality
      </h4>
      <h4 className="flex items-center gap-2 text-white text-sm font-medium leading-[21px]">
        <img src={flagSrc} alt="flag" className="w-[20px]" />
        {nationality}
      </h4>
    </div>
  </div>
);

const PlayerStatsComponent: React.FC<PlayerStats> = ({
  appearances,
  minutesPlayed,
  cleanSheets,
  saves,
  goals,
  assists,
}) => (
  <div className="grid grid-cols-2 items-center mt-6 ">
    <div className="flex flex-col gap-1">
      <h4 className="text-primary text-2xl font-medium leading-9">
        {appearances}
      </h4>
      <h4 className="text-accent text-xs font-normal leading-[18px]">
        Appearances
      </h4>
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="text-primary text-2xl font-medium leading-9">
        {minutesPlayed}
      </h4>
      <h4 className="text-accent text-xs font-normal leading-[18px]">
        Minutes Played
      </h4>
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="text-primary text-2xl font-medium leading-9">
        {cleanSheets ?? goals}
      </h4>
      <h4 className="text-accent text-xs font-normal leading-[18px]">
        {cleanSheets ? "Clean sheets" : "Goals"}
      </h4>
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="text-primary text-2xl font-medium leading-9">
        {saves ?? assists}
      </h4>
      <h4 className="text-accent text-xs font-normal leading-[18px]">
        {saves ? "Saves" : "Assists"}
      </h4>
    </div>
  </div>
);

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  name,
  position,
  height,
  weight,
  nationality,
  flagSrc,
  pictureSrc,
  jrsyNumber,
  stats,
  hide,
}) => (
  <div className="bg-[#222222] w-[322px] p-6">
    {hide && (
      <>
        <PlayerHeader
          jrsyNumber={jrsyNumber}
          pictureSrc={pictureSrc}
          name={name}
          position={position}
        />
        <PlayerPhysicalInfo
          height={height}
          weight={weight}
          nationality={nationality}
          flagSrc={flagSrc}
        />
        <PlayerStatsComponent {...stats} />
      </>
    )}
  </div>
);
