import { Button } from "../../atom/button";
import { Layout } from "../../organisms/layout";
import { FaSearch } from "react-icons/fa";
import { Flex, Stack, Table } from "@mantine/core";
import Select from "../../atom/select";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { TableLoader } from "../../molecules/table-loader";
import { useNavigate } from "react-router-dom";
import { CommonModal } from "../../organisms/modal";
import { ImportItem } from "../../../types";

export const ImportListTemplate = () => {
  const navigate = useNavigate();
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [imports, setImports] = useState<ImportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const options = [
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "200", label: "200" },
  ];

  const handleSelect = (value: string) => {
    console.log("Selected value:", value);
  };

  useEffect(() => {
    const fetchImports = async () => {
      try {
        const response = await fetch("http://3.81.90.125:5001/api/file");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImports(data);
      } catch (error) {
        console.error("Error fetching imports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImports();
  }, []);

  const filteredImports = imports.filter((importItem) =>
    importItem.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: any) => {
    setModalOpen(true);
    setPlayerToDelete(id);
  };

  const confirmDelete = async () => {
    if (playerToDelete) {
      try {
        const response = await fetch(
          `http://3.81.90.125:5001/api/file/${playerToDelete}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete the import");
        }
        setImports(
          imports.filter((importItem) => importItem.id !== playerToDelete)
        );
        setModalOpen(false);
      } catch (error) {
        console.error("Error deleting import:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TableLoader colSpan={9} />
      </div>
    );
  }
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <img
            src={"/image/upload.svg"}
            alt={"upload"}
            width={16}
            height={16}
            className="mx-auto"
          />
          <h4 className="text-xl font-semibold leading-8 text-primary">
            Import List
          </h4>
        </div>
        <div className="flex gap-2">
          <div className="border-[#999999] rounded-lg flex items-center p-[9px] border gap-5">
            <FaSearch className="text-[#999999]" size={14} />
            <input
              type="search"
              placeholder="Find Roster"
              className="flex-1 border bg-transparent text-[#999999] focus:outline-none border-none placeholder:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button label={"Import Team"} onClick={() => navigate("/importer")} />
        </div>
      </div>
      <Stack>
        <Flex
          justify="space-between"
          align="center"
          className="border-b pb-2 border-[#494949] mt-6"
        >
          <div className="flex gap-2 items-center">
            <Select
              options={options}
              onSelect={handleSelect}
              label="Show"
              className="flex"
            />
            <div className="text-accent text-xs leading-[18px] font-normal">
              {loading ? "Loading..." : `${filteredImports.length} items`}
            </div>
          </div>
          <div className="flex gap-3 text-accent items-center">
            <MdKeyboardDoubleArrowLeft size={19} className="cursor-pointer" />
            <MdKeyboardArrowLeft size={19} className="cursor-pointer" />
            <span className="text-accent text-sm font-normal leading-[18px]">
              page
            </span>
            <h3 className="border w-[28px] h-[28px] flex justify-center items-center rounded-lg border-[#494949] text-xs">
              1
            </h3>
            of 1
            <MdKeyboardArrowRight size={19} className="cursor-pointer" />
            <MdKeyboardDoubleArrowRight size={19} className="cursor-pointer" />
          </div>
        </Flex>
        <Table
          captionSide="top"
          highlightOnHover
          horizontalSpacing="xl"
          striped
          verticalSpacing="xs"
          withColumnBorders
          width="100"
          style={{ color: "white" }}
        >
          <thead>
            <tr className="text-left ">
              <th className="text-accent text-xs leading-[18px] font-normal pb-[13px]">
                Roster Name
              </th>
              <th className="text-accent text-xs leading-[18px] font-normal pb-[13px]">
                Import Date
              </th>
              <th className="text-accent text-xs leading-[18px] font-normal pb-[13px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredImports.length > 0 ? (
              <>
                {loading ? (
                  <TableLoader colSpan={3} />
                ) : (
                  filteredImports.map((importItem) => (
                    <tr key={importItem.id} className="cursor-pointer">
                      <td
                        className="bg-[#1d1d1d]"
                        onClick={() =>
                          navigate(
                            `/roster-player/${importItem.id
                            }?fileName=${encodeURIComponent(
                              importItem.fileName
                            )}`
                          )
                        }
                      >
                        <div className="flex items-center gap-2 min-h-[50px] bg-[#2d2d2d] py-3 text-sm leading-[21px] mb-4 font-medium text-accent rounded-l-lg">
                          <img
                            src="/image/gray-icon.svg"
                            width="40"
                            height="40"
                            alt="import-icon"
                            className="ps-5"
                          />
                          {importItem.fileName}
                        </div>
                      </td>
                      <td className="bg-[#1d1d1d]">
                        <div className="flex items-center gap-2 min-h-[50px] bg-[#2d2d2d] py-3 mb-4 text-sm leading-[21px] font-medium text-accent ps-2">
                          {new Date(importItem.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </td>
                      <td className="bg-[#1d1d1d]">
                        <div className="flex items-center bg-[#2d2d2d] min-h-[50px] gap-2 mb-4 font-medium text-accent ps-2 rounded-e-lg">
                          <span
                            className="border border-[#494949] text-accent rounded-lg px-2 py-[5px] font-medium cursor-pointer"
                            onClick={() => handleEdit(importItem.id)}
                          >
                            Delete Import
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </>
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  <div className="h-[460px] flex flex-col justify-center items-center">
                    <h4 className="text-center text-lg leading-[27px] font-semibold flex items-center gap-2">
                      <img
                        src="/image/triangle-exclamation.svg"
                        width={23}
                        height={23}
                        alt="exclamation"
                      />{" "}
                      No data found
                    </h4>
                    <p className="text-accent text-sm font-normal leading-[22px] mt-2">
                      please import your file first
                    </p>
                    <button
                      onClick={() => navigate("/importer")}
                      className="py-3 px-5 rounded-lg text-lightWhite focus:outline-none mt-3 text-sm leading-[21px] font-medium border bg-transparent border-accent"
                    >
                      Go to Import file Page
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {
          <CommonModal
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
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
                  onClick={() => setModalOpen(false)}
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
      </Stack>
    </Layout>
  );
};
