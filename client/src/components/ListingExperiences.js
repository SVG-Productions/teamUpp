import { useLoaderData } from "react-router-dom";
import formatDate from "../utils/formatDate";

const ListingExperiences = ({
  selectedExperience,
  setSearchParams,
  tabs,
  mobileTabs,
  setMobileTabs,
}) => {
  const { experiences } = useLoaderData();

  return (
    <ul
      className={`${mobileTabs !== "experiences" && "hidden"} sm:block ${
        tabs !== "experiences" && mobileTabs !== "experiences" && "sm:hidden"
      }`}
    >
      {experiences.length ? (
        experiences.map((experience) => (
          <li
            onClick={() => {
              setSearchParams({ experience: experience.id });
              setMobileTabs("exp");
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
  );
};

export default ListingExperiences;
