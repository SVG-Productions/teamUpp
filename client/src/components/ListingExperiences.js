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
        {experiences.length ? (
          experiences.map((experience, index) => (
            <li
              key={index}
              className="flex gap-2 p-2.5 items-center justify-between hover:bg-highlightblue"
            >
              <div className="flex items-center overflow-hidden">
                <button
                  onClick={() => setSearchParams({ experience: experience.id })}
                  className={`text-sm sm:text-base font-bold hover:underline overflow-hidden overflow-ellipsis whitespace-nowrap ${
                    selectedExperience?.id === experience.id && "underline"
                  }`}
                >
                  {experience.title}
                </button>
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
    </div>
  );
};

export default ListingExperiences;
