import { useLoaderData, useSearchParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import CreateButton from "./CreateButton";

const ListingExperiences = ({
  tabs,
  mobileTabs,
  setMobileTabs,
  setIsCreateExpModalShowing,
}) => {
  const { experiences } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedExperience = searchParams.get("experience");

  return (
    <>
      <div
        className={`${
          mobileTabs !== "experiences" && "hidden"
        } flex justify-between gap-2 items-center pt-4 sm:absolute sm:right-0 sm:top-1 sm:pt-0`}
      >
        <h2 className="text-slate-400 text-lg font-bold sm:hidden">
          EXPERIENCES
        </h2>
        <CreateButton
          onClick={() => setIsCreateExpModalShowing(true)}
          fill="white"
          backgroundColor="slate-900"
          iconSize="14px"
          className="w-7 h-7"
        />
      </div>
      <ul
        className={`pt-2 ${mobileTabs !== "experiences" && "hidden"} sm:block ${
          tabs !== "experiences" && mobileTabs !== "experiences" && "sm:hidden"
        }`}
      >
        {experiences.length ? (
          experiences.map((experience) => (
            <li
              onClick={() => {
                setMobileTabs("exp");
                setSearchParams({ experience: experience.id });
              }}
              className={`flex gap-2 p-2.5 items-center justify-between w-full cursor-pointer hover:bg-highlightblue ${
                selectedExperience === experience.id && "bg-highlightblue"
              }`}
              key={experience.id}
            >
              <div className="flex items-center overflow-hidden">
                <p className="text-sm sm:text-base font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {experience.title}
                </p>
                <p className="sm:text-base font-bold mx-1 sm:mx-2">/</p>
                <p className="text-sm sm:text-base">{experience.username}</p>
              </div>
              <p className="text-[10px] text-slate-400 sm:text-xs">
                {formatDate(experience.createdAt)}
              </p>
            </li>
          ))
        ) : (
          <p className="text-center font-semibold p-4">
            No experiences posted. Be the first to add one!
          </p>
        )}
      </ul>
    </>
  );
};

export default ListingExperiences;
