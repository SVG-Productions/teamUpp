import { useLoaderData, useNavigate } from "react-router-dom";
import ScrollableList from "./ScrollableList";
import formatDate from "../utils/formatDate";
import DropdownMenuButton from "./DropdownMenuButton";

const ListingExperiences = ({ selectedExperience, setSearchParams }) => {
  const { experiences, team, listing } = useLoaderData();
  const navigate = useNavigate();

  const handleAddExperience = () => {
    navigate(`/teams/${team.id}/listings/${listing.id}/create-experience`);
  };

  return (
    <ScrollableList
      title="Experiences"
      hasAddButton="true"
      onClick={handleAddExperience}
    >
      {experiences.map((experience, index) => (
        <div key={index} className="flex flex-row bg-white p-2.5 rounded-md">
          <div className="flex flex-row w-2/3 items-center">
            <button
              onClick={() => setSearchParams({ experience: experience.id })}
              className={`text-xs sm:text-lg font-bold hover:underline ${
                selectedExperience?.id === experience.id && "underline"
              }`}
            >
              {experience.title}
            </button>
            <div className="hidden sm:block sm:text-lg font-bold mx-2">/</div>
            <div className="text-xs sm:text-base px-3 sm:px-0">
              {experience.username}
            </div>
          </div>
          <div className="flex flex-row justify-end w-1/3 items-center">
            <div className="text-xs sm:text-sm">
              {formatDate(experience.createdAt)}
            </div>
            <DropdownMenuButton />
          </div>
        </div>
      ))}
    </ScrollableList>
  );
};

export default ListingExperiences;
