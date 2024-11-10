import { useState, useEffect } from "react";
import { Flex, Stack, Table } from "@mantine/core";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Select from "../../atom/select";
import { BiSolidPencil } from "react-icons/bi";
import InputField from "../../atom/input";
import { CommonModal } from "../../organisms/modal";
import InputSelect from "../../atom/select/input-select";
import { Button } from "../../atom/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Position, nationality, options } from "../../../static-data";
import { TableLoader } from "../../molecules/table-loader";
import { useNavigate, useParams } from "react-router-dom";
import { formatHeight, formatWeight } from "../../atom/format";
import ErrorMessage from "../../molecules/error-msg";
interface RosterDetailTemplateProps {
  searchQuery: string;
}
const RosterDetailTemplate: React.FC<RosterDetailTemplateProps> = ({ searchQuery }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [playerData, setPlayerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isPop, setIsPop] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [selectedPlayer, setSelectedPlayer]: any = useState(null);
  const [sortField, setSortField] = useState("playerName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (player: any) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const totalItems = playerData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSelect = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      setCurrentPage(currentPage - 1);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    }
  };

  const handleFirstPage = () => {
    setIsLoading(true);
    setCurrentPage(1);
    setIsLoading(false);
  };

  const handleLastPage = () => {
    setIsLoading(true);
    setCurrentPage(totalPages);
    setIsLoading(false);
  };

  const filteredData = playerData.filter((player: any) =>
    player.playerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortData = (data: any) => {
    return data.sort((a: any, b: any) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    });
  };
  const sortedData = sortData(filteredData);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchRosterData = async () => {
    try {
      const response = await fetch(`http://3.81.90.125:5001/api/roster/${id}`);
      const data = await response.json();
      setPlayerData(data[0]["players"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching roster data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRosterData();
  }, []);

  const handleDelete = (player: any) => {
    setPlayerToDelete(player.id);
    setIsPop(true);
  };

  const confirmDelete = async () => {
    if (playerToDelete) {
      try {
        const response = await fetch(
          `http://3.81.90.125:5001/api/roster/${playerToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setPlayerData((prevData) =>
            prevData.filter((player: any) => player.id !== playerToDelete)
          );
        } else {
          console.error("Failed to delete player:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting player:", error);
      } finally {
        setIsPop(false);
        setPlayerToDelete(null);
      }
    }
  };

  const handleUpdate = async () => {
    if (selectedPlayer) {
      try {
        const updatedPlayer = {
          id: selectedPlayer?.id,
          goals: selectedPlayer?.goals || 0,
          saves: selectedPlayer?.saves || null,
          height: selectedPlayer?.height,
          weight: selectedPlayer?.weight,
          assists: selectedPlayer?.assists || 0,
          flagImg: selectedPlayer?.flagImg,
          starter: selectedPlayer?.starter,
          position: selectedPlayer?.position,
          playerImg: selectedPlayer?.playerImg,
          playerName: selectedPlayer?.playerName,
          appearances: selectedPlayer?.appearances || 0,
          cleanSheets: selectedPlayer?.cleanSheets || null,
          nationality: selectedPlayer?.nationality,
          jerseyNumber: selectedPlayer?.jerseyNumber,
          minutesPlayed: selectedPlayer?.minutesPlayed || 0,
        };

        const response = await fetch(`http://3.81.90.125:5001/api/roster`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPlayer),
        });

        if (response.ok) {
          await fetchRosterData();
          alert("Your player has been updated");
          setModalOpen(false);
        } else {
          console.error("Failed to update player:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating player:", error);
      } finally {
        setSelectedPlayer(null);
      }
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TableLoader colSpan={9} />
      </div>
    );
  }
  return (
    <Stack>
      <Flex
        justify="space-between"
        align="center"
        className="border-b pb-2 border-[#494949] mt-6"
      >
        <div className="flex gap-2 items-center ">
          <Select
            options={options}
            onSelect={handleSelect}
            label="Show"
            className="flex"
          />
          <div className="text-accent text-xs leading-[18px] font-normal">
            {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
              currentPage * itemsPerPage,
              totalItems
            )} of ${totalItems} items`}
          </div>
        </div>
        <div className="flex gap-3 text-accent items-center">
          <MdKeyboardDoubleArrowLeft
            size={19}
            className={`cursor-pointer ${currentPage === 1 ? "opacity-50" : ""
              }`}
            onClick={handleFirstPage}
          />
          <MdKeyboardArrowLeft
            size={19}
            className={`cursor-pointer ${currentPage === 1 ? "opacity-50 " : ""
              }`}
            onClick={handlePrevPage}
          />
          <span className="text-accent text-sm font-normal leading-[18px]">
            Page
          </span>
          <h3 className="border w-[28px] h-[28px] flex justify-center items-center rounded-lg border-[#494949] text-xs">
            {currentPage}
          </h3>
          <span>of {totalPages}</span>
          <MdKeyboardArrowRight
            size={19}
            className={` cursor-pointer ${currentPage === totalPages ? "opacity-50" : ""
              }`}
            onClick={handleNextPage}
          />
          <MdKeyboardDoubleArrowRight
            size={19}
            className={`cursor-pointer ${currentPage === totalPages ? "opacity-50" : ""
              }`}
            onClick={handleLastPage}
          />
        </div>
      </Flex>

      <div className="h-[495px] overflow-y-auto tableList">
        <Table
          captionSide="top"
          highlightOnHover
          horizontalSpacing="xl"
          striped
          verticalSpacing="xs"
          withColumnBorders
          width="100%"
          style={{ color: "white" }}
          className="roster-table"
        >
          <thead>
            <tr className="text-left">
              <th
                onClick={() => {
                  setSortField("playerName");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Player Name{" "}
                {sortField === "playerName"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => {
                  setSortField("jerseyNumber");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Jersey Number{" "}
                {sortField === "jerseyNumber"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Starter</th>
              <th
                onClick={() => {
                  setSortField("position");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Position{" "}
                {sortField === "position"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => {
                  setSortField("height");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Height{" "}
                {sortField === "height"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => {
                  setSortField("weight");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Weight{" "}
                {sortField === "weight"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => {
                  setSortField("nationality");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Nationality{" "}
                {sortField === "nationality"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => {
                  setSortField("appearances");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Appearances{" "}
                {sortField === "appearances"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => {
                  setSortField("minutesPlayed");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Minutes Played{" "}
                {sortField === "minutesPlayed"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              <>
                {isLoading ? (
                  <TableLoader colSpan={9} />
                ) : (
                  <>
                    {paginatedData.map((player: any, index: any) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-2 rounded-l-lg mt-2 bg-[#2c2c2c] py-3 px-2">
                            <img
                              src={player?.flagImg}
                              width="40"
                              height="40"
                              alt={player.nationality}
                              className="ps-5"
                            />
                            <span>{player.playerName}</span>
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {player.jerseyNumber}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {player.starter ? "True" : "False"}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {player.position}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {formatHeight(player.height)}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {formatWeight(player.weight)}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {player.nationality}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {player.appearances}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white">
                            {player.minutesPlayed}
                          </div>
                        </td>
                        <td>
                          <div className="mt-2 bg-[#2c2c2c] py-3 px-2 text-white flex gap-3 items-center">
                            <div className=" text-white cursor-pointer">
                              <RiDeleteBin6Line
                                className="text-[22px] text-accent"
                                onClick={() => handleDelete(player)}
                              />
                            </div>
                            <div className="  text-white cursor-pointer">
                              <BiSolidPencil
                                className="text-[22px] text-accent"
                                onClick={() => handleEdit(player)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            ) : (
              <ErrorMessage />
            )}
          </tbody>
        </Table>
      </div>
      {
        <CommonModal
          isOpen={isPop}
          onRequestClose={() => setIsPop(false)}
          labelName="Are You Sure?"
          show={false}
        >
          <div className="text-white">
            <p className="text-accent text-sm mt-6">
              This action cannot be undone
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="py-3 px-5 rounded-lg text-lightWhite focus:outline-none text-sm leading-[21px] font-medium border bg-transparent border-accent"
                onClick={() => setIsPop(false)}
              >
                Cancel
              </button>
              <Button
                onClick={() => confirmDelete()}
                label="Delete"
                variant="secondary"
              />
            </div>
          </div>
        </CommonModal>
      }
      <CommonModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        labelName="Edit Player"
        show={false}
      >
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <InputField
              label="Player Name"
              value={selectedPlayer?.playerName || ""}
              onChange={(e) =>
                setSelectedPlayer({
                  ...selectedPlayer,
                  playerName: e.target.value,
                })
              }
            />
            <InputField
              label="Jersey Number"
              type="number"
              value={selectedPlayer?.jerseyNumber || ""}
              onChange={(e) =>
                setSelectedPlayer({
                  ...selectedPlayer,
                  jerseyNumber: e.target.value,
                })
              }
            />
            <InputField
              label="Height"
              type="number"
              value={selectedPlayer?.height || ""}
              onChange={(e) =>
                setSelectedPlayer({
                  ...selectedPlayer,
                  height: e.target.value,
                })
              }
            />
            <InputField
              label="Weight"
              type="number"
              value={selectedPlayer?.weight || ""}
              onChange={(e) =>
                setSelectedPlayer({
                  ...selectedPlayer,
                  weight: e.target.value,
                })
              }
            />
          </div>

          <InputSelect
            options={nationality}
            onSelect={(value) => {
              setSelectedPlayer({ ...selectedPlayer, nationality: value });
            }}
            label="Nationality"
            className="flex flex-col mt-3"
          />
          <InputSelect
            options={Position}
            onSelect={(value) =>
              setSelectedPlayer({ ...selectedPlayer, position: value })
            }
            label="Position"
            className="flex flex-col mt-3"
          />
          <div className="mt-3">
            <label className="text-white">Starter</label>
            <div className="flex gap-4 mt-2">
              <div
                className={`flex text-white items-center gap-3 cursor-pointer`}
                onClick={() =>
                  setSelectedPlayer((prev: any) => ({
                    ...prev,
                    starter: false,
                  }))
                }
              >
                <div
                  className={`h-5 w-5 rounded-full ${selectedPlayer?.starter === false
                    ? "bg-black border-[3px] border-primary"
                    : "bg-transparent border-[1px] border-[#494949]"
                    }`}
                ></div>
                <label>No</label>
              </div>
              <div
                className={`flex text-white items-center gap-3 cursor-pointer`}
                onClick={() =>
                  setSelectedPlayer((prev: any) => ({
                    ...prev,
                    starter: true,
                  }))
                }
              >
                <div
                  className={`h-5 w-5 rounded-full ${selectedPlayer?.starter === true
                    ? "bg-black border-[3px] border-primary"
                    : "bg-transparent border-[1px] border-[#494949]"
                    }`}
                ></div>
                <label>Yes</label>
              </div>
            </div>
          </div>
          <div className="text-end mt-3">
            <Button label="Update Player" onClick={handleUpdate} />
          </div>
        </div>
      </CommonModal>
    </Stack>
  );
};

export default RosterDetailTemplate;
