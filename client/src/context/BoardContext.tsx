import React, { useState, createContext, useContext } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { UserType } from "../../type-definitions";

const BoardContext = createContext<any>({});

export const useBoard = () => useContext(BoardContext);
export const BoardProvider = ({ children }: { children: any }) => {
  const { userData } = useRouteLoaderData("apps") as {
    userData: UserType;
  };
  const [boardData, setBoardData] = useState<any>({
    ...userData.applications.boardApps,
    teams: userData.teams,
  });

  return (
    <BoardContext.Provider value={{ boardData, setBoardData }}>
      {children}
    </BoardContext.Provider>
  );
};
