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
    <div className={`${tabs !== "experiences" && "hidden"}`}>
      <div className="flex justify-between sm:hidden">
        <h2 className="text-slate-400 font-bold">TEAM EXPERIENCES</h2>
        <CreateButton
          onClick={handleAddExperience}
          fill="white"
          backgroundColor="slate-900"
        />
      </div>
      <ul>
        {experiences.map((experience, index) => (
          <li
            key={index}
            className="flex flex-row p-2.5 items-center justify-between hover:bg-highlightblue"
          >
            <div className="flex items-center">
              <button
                onClick={() => setSearchParams({ experience: experience.id })}
                className={`text-sm sm:text-base font-bold hover:underline ${
                  selectedExperience?.id === experience.id && "underline"
                }`}
              >
                {experience.title}
              </button>
              <p className="sm:text-base font-bold mx-1 sm:mx-2">/</p>
              <p className="text-sm sm:text-base">{experience.username}</p>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400">
              {formatDate(experience.createdAt)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingExperiences;
