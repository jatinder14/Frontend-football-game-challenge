import React, { useEffect, useState } from 'react';
import FormationFieldTemplate from "../../template/formation-filed/index";
import RosterDetailTemplate from "../../template/roster-detail-template/index";
import { useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowRight, MdOutlineFileDownloadDone } from 'react-icons/md';
import { FaBars, FaSearch } from 'react-icons/fa';
import { BiSolidPencil } from 'react-icons/bi';
import { TbTransformPoint } from 'react-icons/tb';

interface FileData {
    id: string;
    fileName: string;
}

const Tabs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [activeTab, setActiveTab] = useState<'formation' | 'roster'>('roster');
    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setNewFileName] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            setSearchQuery("");
        }
    };

    const handleTabClick = (tab: 'formation' | 'roster') => {
        setActiveTab(tab);
    };

    // Function to update the file name
    const updateFileName = async (newName: string) => {
        if (!fileData || !newName) return;
        try {
            const response = await fetch('http://3.81.90.125:5001/api/file', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileId: fileData.id,
                    fileName: newName,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update file name');
            }

            // Update fileData to reflect the new file name in the UI
            setFileData(prevData => {
                if (prevData) {
                    return { ...prevData, fileName: newName };
                }
                return null;
            });
            setIsEditing(false);

        } catch (err: any) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetch('http://3.81.90.125:5001/api/file');
                const data = await response.json();
                const newData = data.find((item: any) => item.id === id);
                setFileData(newData);
                setNewFileName(newData?.fileName || "");
            } catch (err: any) {
                console.error(err.message);
            }
        };

        fetchFile();
    }, [id]);

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'roster':
                return <RosterDetailTemplate searchQuery={searchQuery} />;
            case 'formation':
                return <FormationFieldTemplate />;
            default:
                return <FormationFieldTemplate />;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                        <img
                            src={"/image/gray-icon.svg"}
                            alt={"upload"}
                            width={16}
                            height={16}
                            className="mx-auto"
                        />
                        <h4
                            className="text-xl font-semibold leading-8 text-accent cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Import List
                        </h4>
                    </div>
                    <MdKeyboardArrowRight size={22} className="text-accent" />
                    <div className="flex items-center gap-[8px] text-primary">
                        <FaBars size={19} />
                        {isEditing ? (
                            <input
                                type="text"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateFileName(newFileName);
                                    }
                                }}
                                className="text-xl font-semibold bg-transparent leading-8 text-accent border-b-2 border-accent focus:outline-none"
                            />
                        ) : (
                            <h4
                                className="text-xl font-semibold leading-8 text-primary cursor-pointer"
                                onClick={() => {
                                    setIsEditing(true);
                                    setNewFileName(fileData?.fileName || "");
                                }}
                            >
                                {fileData?.fileName}
                            </h4>
                        )}
                        {isEditing ? (
                            <MdOutlineFileDownloadDone size={33} className='cursor-pointer' onClick={() => updateFileName(newFileName)} />
                        ) : (
                            <BiSolidPencil className="text-white cursor-pointer" size={20} onClick={() => {
                                setIsEditing(true);
                                setNewFileName(fileData?.fileName || "");
                            }} />
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {activeTab === 'roster' && (
                        <div className="border-[#707070] rounded-lg flex items-center p-[9px] border gap-5">
                            <FaSearch className="text-[#999999]" size={14} />
                            <input
                                type="search"
                                placeholder="Find Roster"
                                value={searchQuery}
                                onChange={handleSearch}
                                onKeyDown={handleKeyDown}
                                className="flex-1 border bg-transparent text-[#999999] focus:outline-none border-none placeholder:text-sm"
                            />
                        </div>
                    )}
                    <div className="flex">
                        <div onClick={() => handleTabClick('roster')} className={`cursor-pointer border-[#707070] border-e-0 rounded-l-lg flex items-center px-5 py-3 border gap-5 text-accent ${activeTab === 'roster' ? 'bg-[#494949]' : ''}`}>
                            <FaBars size={14} />
                            <h4 className="text-sm font-medium leading-[21px] ">
                                Roster Details
                            </h4>
                        </div>
                        <div onClick={() => handleTabClick('formation')} className={`rounded-r-lg border-[#707070] flex items-center px-5 py-3 border gap-5 text-accent cursor-pointer ${activeTab === 'formation' ? 'bg-[#494949]' : ''}`}>
                            <TbTransformPoint size={17} />
                            <h4 className="text-sm font-medium leading-[21px] ">
                                Formation Overview
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default Tabs;