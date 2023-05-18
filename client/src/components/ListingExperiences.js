import { useLoaderData, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import CreateButton from "./CreateButton";

const ListingExperiences = ({ selectedExperience, setSearchParams, tabs }) => {
  const { experiences, team, listing } = useLoaderData();
  const navigate = useNavigate();

  const handleAddExperience = () => {
    navigate(`/teams/${team.id}/listings/${listing.id}/create-experience`);
  };

  return (
    <>
      <div className="flex justify-between sm:hidden">
        <h2 className="text-slate-400 font-bold">TEAM EXPERIENCES</h2>
        <CreateButton
          onClick={handleAddExperience}
          fill="white"
          backgroundColor="slate-900"
        />
      </div>
      <ul className={`${tabs !== "experiences" && "hidden"}`}>
        {experiences.map((experience, index) => (
          <li key={index} className="flex flex-row p-2.5">
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
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListingExperiences;
