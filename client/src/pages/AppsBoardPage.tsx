import React, {
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AppsColumn from "../components/AppsColumn";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useBoard } from "../context/BoardContext";
import BoardAppDetailsModal from "../components/BoardAppDetailsModal";
import CreateBoardAppModal from "../components/CreateBoardAppModal";

const AppsBoardPage = () => {
  const {
    boardData,
    setBoardData,
    showAppDetails,
    setShowAppDetails,
    selectedApp,
  } = useBoard();
  const [appStatus, setAppStatus] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [showAddStatus, setShowAddStatus] = useState<boolean>(false);
  const [showCreateApp, setShowCreateApp] = useState(false);
  const statusRef = useRef<HTMLFormElement>(null);

  const columnOrder = useMemo(
    () => boardData.columnOrder,
    [boardData.columnOrder]
  );

  const columns = useMemo(
    () =>
      columnOrder.reduce((acc: any, columnId: string) => {
        const column = boardData.columns[columnId];
        acc[columnId] = {
          ...column,
          apps: column.appIds.map((appId: string, index: number) => ({
            ...boardData.apps[appId],
            index,
          })),
        };
        return acc;
      }, {}),
    [columnOrder, boardData.apps, boardData.columns]
  );

  const handleCloseAddStatus = () => {
    setShowAddStatus(false);
    setAppStatus("");
  };
  useOnClickOutside(statusRef, handleCloseAddStatus);

  const handleAddStatus = async (e: FormEvent) => {
    e.preventDefault();
    if (!appStatus) {
      handleCloseAddStatus();
      return;
    }
    try {
      const lowerCaseAppStatus = appStatus.toLowerCase();
      const { data } = await axios.post("/api/app-statuses", {
        newStatus: {
          appStatus: lowerCaseAppStatus,
          index: boardData.columnOrder.length,
        },
      });

      setBoardData((prev: any) => ({
        ...prev,
        columnOrder: [...prev.columnOrder, data.addedStatus.id],
        columns: {
          ...prev.columns,
          [data.addedStatus.id]: {
            id: data.addedStatus.id,
            title: appStatus,
            appIds: [],
          },
        },
      }));
      handleCloseAddStatus();
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
      handleCloseAddStatus();
    }
  };

  const onDragEnd = useCallback(
    async (result: any) => {
      const { destination, source, draggableId, type } = result;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      if (type === "column") {
        const newColumnOrder = Array.from(boardData.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...boardData,
          columnOrder: newColumnOrder,
        };
        setBoardData(newState);
        await axios.patch("/api/app-statuses/status-order", {
          statusOrder: newColumnOrder,
        });
        return;
      }

      const start = boardData.columns[source.droppableId];
      const finish = boardData.columns[destination.droppableId];

      if (start === finish) {
        const newAppIds = Array.from(start.appIds);
        newAppIds.splice(source.index, 1);
        newAppIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          appIds: newAppIds,
        };

        const newState = {
          ...boardData,
          columns: {
            ...boardData.columns,
            [newColumn.id]: newColumn,
          },
        };

        const applicationOrders = [];
        for (const [index, appId] of newAppIds.entries()) {
          applicationOrders.push(
            axios.patch(`/api/listings/${appId}`, {
              index,
            })
          );
        }

        try {
          setBoardData(newState);
          await Promise.all(applicationOrders);
        } catch (error) {
          toast.error(
            "Error updating application order. Refresh and try again.",
            basicToast
          );
          return;
        }

        return;
      }

      const startAppIds = Array.from(start.appIds);
      startAppIds.splice(source.index, 1);
      const newStart = {
        ...start,
        appIds: startAppIds,
      };

      const finishAppIds = Array.from(finish.appIds);
      finishAppIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        appIds: finishAppIds,
      };

      const acceptValue = (() => {
        if (finish.title !== "applied" && finish.title !== "archived") {
          return true;
        } else if (start.title !== "applied" && finish.title === "archived") {
          return true;
        } else return false;
      })();

      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
        apps: {
          ...boardData.apps,
          [draggableId]: {
            ...boardData.apps[draggableId],
            appStatus: boardData.columns[newFinish.id].title,
            statusId: newFinish.id,
            accepted: acceptValue,
          },
        },
      };

      const applicationOrders = [];
      for (const [index, appId] of startAppIds.entries()) {
        applicationOrders.push(
          axios.patch(`/api/listings/${appId}`, {
            index,
          })
        );
      }
      for (const [index, appId] of finishAppIds.entries()) {
        if (draggableId === appId) {
          applicationOrders.push(
            axios.patch(`/api/listings/${appId}`, {
              index,
              statusId: newFinish.id,
              accepted: acceptValue,
            })
          );
        } else {
          applicationOrders.push(
            axios.patch(`/api/listings/${appId}`, {
              index,
              statusId: newFinish.id,
            })
          );
        }
      }
      try {
        setBoardData(newState);
        await Promise.all(applicationOrders);
      } catch (error) {
        toast.error(
          "Error updating applications. Refresh and try again.",
          basicToast
        );
      }
    },
    [boardData, setBoardData]
  );

  return (
    <>
      {showAppDetails && (
        <BoardAppDetailsModal
          handleModal={setShowAppDetails}
          app={boardData.apps[selectedApp]}
        />
      )}
      {showCreateApp && <CreateBoardAppModal handleModal={setShowCreateApp} />}
      <div className="flex w-full px-3 mb-4 gap-4">
        <div
          className="flex items-center border border-borderprimary rounded py-2 px-3 
          leading-tight focus-within:border-blue-600"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="outline-none text-sm"
            placeholder="Search this board"
            autoFocus
          />
          <FontAwesomeIcon icon={faSearch} className="text-tertiary" />
        </div>
        <button
          className="no-underline text-sm min-w-fit text-tertiary px-1.5 bg-primary 
          rounded-md border border-borderprimary hover:bg-secondary"
          onClick={() => setShowCreateApp(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create app
        </button>
      </div>
      <div className="flex w-full h-[calc(100vh-22rem)] overflow-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex gap-4 ml-2 my-0 h-fit"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrder.map((columnId: string, index: number) => {
                  const column = columns[columnId];
                  return (
                    <AppsColumn
                      key={column.id}
                      column={column}
                      index={index}
                      searchInput={searchInput}
                      setShowCreateApp={setShowCreateApp}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
        {!showAddStatus ? (
          <FontAwesomeIcon
            className="sticky top-0 m-2 mt-0 px-1.5 py-1 bg-secondary rounded-md cursor-pointer hover:bg-highlightSecondary"
            onClick={() => setShowAddStatus(true)}
            icon={faPlus}
            size="lg"
          />
        ) : (
          <div className="sticky top-0 flex flex-col ml-4 p-2 bg-secondary rounded-sm w-[220px]">
            <form
              ref={statusRef}
              className="max-h-fit w-full"
              onSubmit={handleAddStatus}
            >
              <input
                className="border border-borderprimary rounded py-2 px-3 mb-2 text-primary leading-tight focus:outline-bluegray"
                id="app-status"
                type="text"
                autoFocus
                value={appStatus}
                onChange={(e) => setAppStatus(e.target.value)}
                autoComplete="off"
              />
              <div className="flex justify-end gap-2">
                <FontAwesomeIcon
                  className="bg-primary py-1 px-1.5 rounded cursor-pointer shadow-sm shadow-shadowPrimary hover:bg-highlightSecondary"
                  onClick={handleCloseAddStatus}
                  size="sm"
                  icon={faX}
                />
                <button>
                  <FontAwesomeIcon
                    className="bg-primary p-1 rounded cursor-pointer shadow-sm shadow-shadowPrimary hover:bg-highlightSecondary"
                    icon={faCheck}
                    size="sm"
                  />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AppsBoardPage;
