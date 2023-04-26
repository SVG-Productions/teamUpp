import axios from "axios";
import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import AuthedPageTitle from "../components/AuthedPageTitle";
import PencilButton from "../components/PencilButton";
import FavoriteButton from "../components/FavoriteButton";
import CommentsSection from "../components/CommentsSection";
import ScrollableList from "../components/ScrollableList";
import formatDate from "../utils/formatDate";
import DropdownMenuButton from "../components/DropdownMenuButton";
import CloseButton from "../components/CloseButton";
import DeleteExperienceModal from "../components/DeleteExperienceModal";
import AcceptButton from "../components/AcceptButton";
import DenyButton from "../components/DenyButton";
import useOnClickOutside from "../hooks/useOnClickOutside";
import ListingTeammatesSection from "../components/ListingTeammatesSection";

export const ListingExperiencesPage = () => {
  const { team, teammates, listing, experiences, selectedExperience } =
    useLoaderData();
  const { authedUser } = useAuth();

  const [isModalShowing, setIsModalShowing] = useState(false);
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [editedExperience, setEditedExperience] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const listingParam = searchParams.get("experience");

  const experienceRef = useRef();
  const handleClickOut = () => {
    setShowEditExperience(false);
  };
  useOnClickOutside(experienceRef, handleClickOut);

  const handleEditClick = () => {
    setShowEditExperience(true);
    setEditedExperience(selectedExperience.content);
  };

  const handleUpdateExperience = async (experienceId) => {
    await axios.patch(`/api/experiences/${experienceId}`, {
      content: editedExperience.replace(/&nbsp;/g, ""),
    });
    selectedExperience.content = editedExperience.replace(/&nbsp;/g, "");
    setShowEditExperience(false);
  };

  return (
    <>
      <DeleteExperienceModal
        isOpen={isModalShowing}
        onClose={() => setIsModalShowing(false)}
      />
      <div className="flex justify-between">
        <AuthedPageTitle>
          <NavLink to={`/teams/${team.id}`} className="hover:underline">
            {team.name}
          </NavLink>{" "}
          /{" "}
          <NavLink to={`/teams/${team.id}`} className="hover:underline">
            Listings
          </NavLink>{" "}
          / {listing.companyName} - {listing.jobTitle}
        </AuthedPageTitle>
        <div className="flex gap-4">
          {authedUser.id === listing.userId && (
            <PencilButton
              href={`/teams/${team.id}/listings/${listing.id}/edit`}
            />
          )}
          <FavoriteButton listing={listing} dimensions="w-10 h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-8 w-full h-[90%]">
        <div className="flex flex-col min-h-3/5 w-full">
          <div className="flex gap-3 w-1/4 px-2">
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-[3px] font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/details`}
            >
              Details
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-[3px] font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/experiences`}
            >
              Experiences
            </NavLink>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row pt-1 sm:min-h-[350px] sm:max-h-[350px]">
            <ScrollableList
              title="Experiences"
              width={`${listingParam ? "sm:w-3/5" : "sm:w-full"}`}
              height="sm:h-full"
              hasAddButton="true"
            >
              {experiences.map((experience, index) => (
                <div
                  key={index}
                  className="flex flex-row bg-white p-2.5 rounded-md"
                >
                  <div className="flex flex-row w-2/3 items-center">
                    <button
                      onClick={() =>
                        setSearchParams({ experience: experience.id })
                      }
                      className={`text-xs sm:text-lg font-bold hover:underline ${
                        selectedExperience?.id === experience.id && "underline"
                      }`}
                    >
                      {experience.title}
                    </button>
                    <div className="hidden sm:block sm:text-lg font-bold mx-2">
                      /
                    </div>
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
            {listingParam && (
              <div
                ref={experienceRef}
                className="flex flex-col sm:max-h-max sm:w-2/5 rounded-sm bg-slate-100 shadow"
              >
                <div className="flex justify-between p-3 font-bold shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)]">
                  <div>
                    <p>{selectedExperience.title}</p>
                    {authedUser.id === selectedExperience.userId && (
                      <div className="flex gap-1 text-xs text-slate-600 h-[18px]">
                        <button
                          onClick={handleEditClick}
                          className={`hover:text-red-900 ${
                            showEditExperience && "text-red-900"
                          }`}
                        >
                          edit
                        </button>
                        <span> / </span>
                        <button
                          onClick={() => setIsModalShowing(true)}
                          className={`hover:text-red-900`}
                        >
                          delete
                        </button>
                        {showEditExperience && (
                          <div className="flex ml-2">
                            <AcceptButton
                              onClick={() =>
                                handleUpdateExperience(selectedExperience.id)
                              }
                            />
                            <DenyButton
                              onClick={() => setShowEditExperience(false)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <CloseButton onClick={() => setSearchParams({})} />
                </div>
                {showEditExperience ? (
                  <ContentEditable
                    html={editedExperience}
                    onChange={(e) => setEditedExperience(e.target.value)}
                    className="h-full p-3 m-1 bg-white rounded-sm overflow-auto border-2 border-blue-600 "
                  />
                ) : (
                  <div className="h-full p-3 m-1 border-2 border-white bg-white rounded-sm overflow-auto">
                    {selectedExperience.content}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 h-2/5">
          <CommentsSection listing={listing} authedUser={authedUser} />
          <ListingTeammatesSection teammates={teammates} />
        </div>
      </div>
    </>
  );
};

export const listingExperiencesLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;

  const experienceId = new URL(request.url).searchParams.get("experience");
  let selectedExperience;
  if (experienceId) {
    const experienceResponse = await axios.get(
      `/api/experiences/${experienceId}`
    );
    selectedExperience = experienceResponse.data;
  }

  const [teamResponse, listingResponse, userResponse] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get(`/api/listings/${listingId}`),
    axios.get("/api/session/user"),
  ]);

  const { team, teammates } = teamResponse.data;
  const filteredTeammates = teammates.filter(
    (tm) => tm.status !== "invited" && tm.status !== "requested"
  );
  const { listing, comments, experiences } = listingResponse.data;
  const { favorites } = userResponse.data;

  return {
    team,
    teammates: filteredTeammates,
    listing,
    favorites,
    comments,
    experiences,
    selectedExperience,
  };
};
