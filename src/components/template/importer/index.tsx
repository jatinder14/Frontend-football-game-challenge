import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../../atom/button";
import { useNavigate } from "react-router-dom";
import { RosterNewData } from "../../../types";

interface PlayerData {
  id: string;
  fileName: string;
  createdAt: string;
}

const ImporterTemplate = () => {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [summryData, setSummryData] = useState<RosterNewData[]>([]);
  const [isID, setIsID] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv") {
        alert("Please select a .csv file.");
        setFile(null);
        setFileName("");
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleImportClick = async () => {
    if (!file) {
      setError(true);
      return;
    }
    setError(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://3.81.90.125:5001/api/file", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message || data);
      setFile(null);
      setFileName("");
      fetchRosterData();
      setSummryData([]);
    } catch (error) {
      alert("An error occurred while importing the file.");
    }
  };

  const fetchRosterData = async () => {
    try {
      const response = await fetch(`http://3.81.90.125:5001/api/file`);
      const data = await response.json();
      setPlayerData(data);
    } catch (error) {
      console.error("Error fetching roster data:", error);
    }
  };

  useEffect(() => {
    fetchRosterData();
  }, []);

  useEffect(() => {
    if (playerData.length > 0) {
      playerData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const latestId = playerData[0].id;
      setIsID(latestId);
    }
  }, [playerData]);

  useLayoutEffect(() => {
    const fetchSummaryData = async () => {
      if (isID) {
        try {
          const response = await fetch(`http://3.81.90.125:5001/api/roster/${isID}`);
          const data = await response.json();
          setSummryData(data[0]["players"]);
        } catch (error) {
          console.error("Error fetching roster data:", error);
        }
      }
    };

    fetchSummaryData();
  }, [isID, fileName, file]);

  const getPlayerStats = () => {
    const goalkeepers = summryData.filter(player => player.position === "Goalkeeper");
    const defenders = summryData.filter(player => player.position === "Defender");
    const midfielders = summryData.filter(player => player.position === "Midfielder");
    const forwards = summryData.filter(player => player.position === "Forward");

    return {
      totalPlayers: summryData.length,
      totalGoalkeepers: goalkeepers.length,
      totalDefenders: defenders.length,
      totalMidfielders: midfielders.length,
      totalForwards: forwards.length,
    };
  };

  const { totalPlayers, totalGoalkeepers, totalDefenders, totalMidfielders, totalForwards } = getPlayerStats();

  return (
    <div className="bg-[#2D2D2D] h-screen py-[18px] px-6 relative">
      <div className="flex justify-between border-b pb-4 border-[#494949]">
        <h4 className="font-semibold text-lg leading-7 text-white">Importer</h4>
        <span>
          <IoClose
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          />
        </span>
      </div>
      <div>
        <h4 className="text-sm leading-[21px] font-medium mb-2 text-white mt-6">
          Roster File
        </h4>
        <div
          className={`rounded-lg w-[300px] flex justify-between items-center border ${!file && error ? "border-[#D23131]" : "border-[#494949]"}
          `}
        >
          <p className="h-[52px] text-[#999999] flex items-center ps-2 w-[200px] rounded-l-lg line-clamp-1 text-accent">
            {fileName || "No file selected"}
          </p>

          <label className={`w-[110px] -ml-1 text-sm text-success py-[15px] flex justify-center items-center border-s rounded-lg border-[#494949] ${!file && error ? "border-[#D23131]" : "border-[#494949]"} cursor-pointer text-white font-medium leading-[21px]`}>
            <input type="file" className="hidden" onChange={handleFileChange} />
            Select file
          </label>
        </div>
        {
          !file && error ? <div className="mt-3">
            <span className="text-[#D23131] text-sm font-normal leading-[21px]">Error</span>
            <p className="text-[#999999] text-sm font-normal leading-[21px] mt-4">
              File must be selected
            </p>
          </div> : <p className="text-[#999999] text-sm font-normal leading-[21px] mt-4">
            File must be in .csv format
          </p>
        }
      </div>

      <div>
        <h4 className="mt-[32px] mb-6 text-sm leading-[21px] font-medium text-white">
          Last Uploaded File Summary
        </h4>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start text-accent text-sm leading-[21px] font-normal">
                Total Players
              </th>
              <th className="text-start text-accent text-sm leading-[21px] font-normal">
                Goalkeepers
              </th>
              <th className="text-start text-accent text-sm leading-[21px] font-normal">
                Defenders
              </th>
              <th className="text-start text-accent text-sm leading-[21px] font-normal">
                Midfielders
              </th>
              <th className="text-start text-accent text-sm leading-[21px] font-normal">
                Forwards
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start text-accent text-[16px] leading-[24px] font-semibold">
                <div className="mt-2">{!fileName ? totalPlayers : "0"}</div>
              </td>
              <td className="text-start text-accent text-[16px] leading-[24px] font-semibold">
                <div className="mt-2">{!fileName ? totalGoalkeepers : "0"}</div>
              </td>
              <td className="text-start text-accent text-[16px] leading-[24px] font-semibold">
                <div className="mt-2">{!fileName ? totalDefenders : "0"}</div>
              </td>
              <td className="text-start text-accent text-[16px] leading-[24px] font-semibold">
                <div className="mt-2">{!fileName ? totalMidfielders : "0"}</div>
              </td>
              <td className="text-start text-accent text-[16px] leading-[24px] font-semibold">
                <div className="mt-2">{!fileName ? totalForwards : "0"}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-[20px] text-end right-[20px]">
        {!file ? (
          <button
            className="py-3 px-5 rounded-lg text-lightWhite focus:outline-none text-sm leading-[21px] font-medium border bg-transparent border-accent"
            onClick={handleImportClick}
          >
            Import
          </button>
        ) : (
          <Button label="Import" onClick={handleImportClick} />
        )}
      </div>
    </div>
  );
};

export default ImporterTemplate;