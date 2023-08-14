import React, { useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faX } from "@fortawesome/free-solid-svg-icons";
import { useBoard } from "../context/BoardContext";
import { TeamType } from "../../type-definitions";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const BoardAppShareSubmenu = ({
  appData,
  setAppData,
}: {
  appData: any;
  setAppData: any;
}) => {
  const { boardData } = useBoard();
  const [showShareSubmenu, setShowShareSubmenu] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<TeamType[]>([]);
  const [teamInput, setTeamInput] = useState("");
  const [showTeamList, setShowTeamList] = useState(false);

  const shareRef = useRef<HTMLInputElement>(null);
  const teamsRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(shareRef, () => setShowShareSubmenu(false));
  useOnClickOutside(teamsRef, () => {
    setTeamInput("");
    setShowTeamList(false);
  });

  const handleShareToTeams = async () => {
    try {
      if (!selectedTeams.length) {
        return;
      }
      const selectedIds = selectedTeams.map((st) => st.id);
      setAppData((prev: any) => ({
        ...prev,
        sharedTeams: [...prev.sharedTeams, ...selectedIds],
      }));
      setSelectedTeams([]);

      for (const id of selectedIds) {
        await axios.post(`/api/teams/${id}/applications`, {
          appId: appData.id,
        });
      }
      toast.success("Shared to team(s) successfully!", basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const toggleTeamOption = (team: TeamType) => {
    setSelectedTeams((prevSelected) => {
      const newArray = [...prevSelected];
      if (newArray.find((ot) => ot.id === team.id)) {
        return newArray.filter((ot) => ot.id !== team.id);
      } else {
        newArray.push(team);
        return newArray;
      }
    });
  };

  const displayedTeams = boardData.teams
    .filter((team: TeamType) => {
      const isSelected = selectedTeams.find((st) => st.id === team.id);
      if (
        !team.name.toLowerCase().includes(teamInput.toLowerCase()) ||
        appData?.sharedTeams?.includes(team.id) ||
        isSelected
      ) {
        return false;
      } else return true;
    })
    .map((team: TeamType) => {
      return (
        <li
          key={team.id}
          className="py-2 px-3 cursor-pointer flex items-center gap-4 hover:bg-tertiary hover:border-l-2 hover:border-l-blueGray hover:pl-2.5"
          onClick={() => toggleTeamOption(team)}
        >
          <img
            className="w-6 h-6 rounded-full"
            src={team.photo || team.avatar}
            alt={team.name}
          />
          <span className="font-semibold">{team.name}</span>
        </li>
      );
    });
  return (
    <>
      <FontAwesomeIcon
        size="lg"
        icon={faShareAlt}
        className="cursor-pointer rounded-sm hover:text-secondary"
        onClick={() => setShowShareSubmenu(true)}
      />

      {showShareSubmenu && (
        <div
          ref={shareRef}
          className="absolute w-[340px] flex flex-col top-6 right-12 z-10"
        >
          <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
          <div className="flex flex-col w-full bg-primary border border-borderprimary rounded-[2%] text-sm shadow-md shadow-black">
            <h4 className="border-b border-borderprimary font-semibold p-2">
              Share application
            </h4>
            <div className="flex flex-col gap-4 py-2 px-5">
              <label className="font-semibold text-xs">
                Team <span className="text-red-300">*</span>
              </label>
              <div className="relative" ref={teamsRef}>
                {selectedTeams.length === 0 ? (
                  <input
                    className="bg-primary border border-borderprimary rounded w-full py-2 px-3 text-primary cursor-pointer leading-tight"
                    type="text"
                    value={teamInput}
                    placeholder="Enter team name..."
                    onChange={(e) => {
                      setShowTeamList(true);
                      setTeamInput(e.target.value);
                    }}
                    onClick={() => setShowTeamList(!showTeamList)}
                    autoComplete="off"
                  />
                ) : (
                  <div
                    className="border border-borderprimary rounded w-full py-2 px-3 text-secondary leading-tight 
                            focus-within:border focus-within:border-white"
                  >
                    <ul className="flex flex-wrap gap-1">
                      {selectedTeams.map((st: TeamType) => (
                        <div
                          className="flex w-fit py-1.5 px-2 bg-secondary rounded-full items-center gap-2"
                          key={st.id}
                        >
                          <img
                            className="w-5 h-5 rounded-full"
                            src={st.photo || st.avatar}
                            alt={st.name}
                          />
                          <span className="text-xs">{st.name}</span>
                          <FontAwesomeIcon
                            size="xs"
                            className="rounded-full text-primary cursor-pointer hover:bg-secondary p-1"
                            icon={faX}
                            onClick={() =>
                              setSelectedTeams((prev) =>
                                prev.filter((t) => st.id !== t.id)
                              )
                            }
                          />
                        </div>
                      ))}
                      <input
                        className="focus:outline-none bg-primary text-primary py-1"
                        type="text"
                        value={teamInput}
                        placeholder="Enter more..."
                        onChange={(e) => {
                          setShowTeamList(true);
                          setTeamInput(e.target.value);
                        }}
                        onClick={() => setShowTeamList(!showTeamList)}
                        autoComplete="off"
                      />
                    </ul>
                  </div>
                )}
                {showTeamList && (
                  <div className="flex flex-col absolute w-full mt-0.5 py-2 z-10 bg-primary border border-borderprimary rounded-sm text-sm">
                    <ul className="flex flex-col">
                      {displayedTeams.length > 0 && displayedTeams}
                      {displayedTeams.length === 0 && (
                        <li className="p-2 text-tertiary text-xs hover:bg-tertiary">
                          We couldn't find any results
                          {teamInput && ` for "${teamInput}"`}.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-xs text-center">
                Teams you share to will be able to see all application details
                and any added experiences.
              </p>
              <button
                onClick={handleShareToTeams}
                className="w-fit self-end text-sm text-white rounded-[4px] px-3 py-1 bg-buttonPrimary hover:bg-buttonSecondary"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardAppShareSubmenu;
