import { useLoaderData, useSearchParams } from "react-router-dom";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const ListingExperiences = ({ tabs, setIsCreateExpModalShowing }) => {
  const { listingData } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedExperience = searchParams.get("experience");

  return (
    <>
      <div
        className={`flex justify-between gap-2 items-center pt-4 ${
          (tabs !== "experiences" || selectedExperience) && "hidden"
        } sm:absolute sm:right-0 sm:top-1 sm:pt-0  `}
      >
        <h2 className="text-headingColor text-lg font-semibold sm:hidden">
          Experiences
        </h2>
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="xl"
          onClick={() => setIsCreateExpModalShowing(true)}
          className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
        />
      </div>
      <ul
        className={`pt-2 ${
          (tabs !== "experiences" || searchParams.size) && "hidden"
        }  ${tabs !== "experiences" && "sm:hidden"} sm:block `}
      >
        {listingData.experiences.length ? (
          listingData.experiences.map((experience) => (
            <li
              onClick={() => setSearchParams({ experience: experience.id })}
              className={`flex gap-2 p-2.5 items-center justify-between w-full cursor-pointer hover:bg-highlight ${
                selectedExperience === experience.id && "bg-highlight"
              }`}
              key={experience.id}
            >
              <div className="flex items-center overflow-hidden">
                <p className="text-sm sm:text-base font-semibold truncate">
                  {experience.title}
                  <span className="ml-2 text-secondary font-normal text-xs sm:text-sm">
                    {experience.username}
                  </span>
                </p>
              </div>
              <p className="text-[10px] text-tertiary sm:text-xs">
                {formatGeneralDate(experience.createdAt)}
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
