import { useLoaderData, useSearchParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const ListingExperiences = ({ tabs, setIsCreateExpModalShowing }) => {
  const { experiences } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedExperience = searchParams.get("experience");

  return (
    <>
      <div
        className={`flex justify-between gap-2 items-center pt-4 ${
          (tabs !== "experiences" || selectedExperience) && "hidden"
        } sm:flex sm:absolute sm:right-0 sm:top-1 sm:pt-0  `}
      >
        <h2 className="text-slate-400 text-lg font-bold sm:hidden">
          EXPERIENCES
        </h2>
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="xl"
          onClick={() => setIsCreateExpModalShowing(true)}
          className="cursor-pointer text-slate-900 hover:text-slate-500"
        />
      </div>
      <ul
        className={`pt-2 ${
          (tabs !== "experiences" || searchParams.size) && "hidden"
        }  ${tabs !== "experiences" && "sm:hidden"} sm:block `}
      >
        {experiences.length ? (
          experiences.map((experience) => (
            <li
              onClick={() => setSearchParams({ experience: experience.id })}
              className={`flex gap-2 p-2.5 items-center justify-between w-full cursor-pointer hover:bg-highlightblue ${
                selectedExperience === experience.id && "bg-highlightblue"
              }`}
              key={experience.id}
            >
              <div className="flex items-center overflow-hidden">
                <p className="text-sm sm:text-base font-bold truncate">
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
