import axios from "axios";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import FavoriteButton from "../components/FavoriteButton";
import { useAuth } from "../context/AuthContext";
import useOnClickOutside from "../hooks/useOnClickOutside";

export const ListingDetailsPage = () => {
  const { team, teammates, listing, comments } = useLoaderData();
  const { authedUser } = useAuth();

  const [listingComments, setListingComments] = useState(comments);
  const [editComment, setEditComment] = useState("");
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showAddCommentInput, setShowAddCommentInput] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentId, setCommentId] = useState("");

  const commentRef = useRef();
  const handleClickOut = () => {
    setShowEditCommentInput(false);
    setShowDeleteConfirmation(false);
  };
  useOnClickOutside(commentRef, handleClickOut);

  const handleAddComment = async () => {
    const commentData = {
      userId: authedUser.id,
      listingId: listing.id,
      content: newComment.trim(),
    };
    const addedComment = await axios.post("/api/comments", commentData);
    addedComment.data.username = authedUser.username;
    setListingComments([addedComment.data, ...listingComments]);
    setShowAddCommentInput(false);
    setNewComment("");
  };

  const handelEditClick = (id, content) => {
    setCommentId(id);
    setEditComment(content);
    setShowDeleteConfirmation(false);
    setShowEditCommentInput(true);
  };

  const handleCommentUpdate = async (content, id, i) => {
    const editedComment = await axios.patch(`/api/comments/${id}`, { content });
    editedComment.data.username = authedUser.username;
    const tempArray = [...listingComments];
    tempArray.splice(i, 1, editedComment.data);
    setListingComments(tempArray);
    setShowEditCommentInput(false);
  };

  const handleDeleteClick = (id) => {
    setCommentId(id);
    setShowEditCommentInput(false);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteComment = async (id, i) => {
    await axios.delete(`/api/comments/${id}`);
    const tempArray = [...listingComments];
    tempArray.splice(i, 1);
    setListingComments(tempArray);
    setShowDeleteConfirmation(false);
  };

  const date = new Date(listingComments[0].createdAt);

  console.log(date.toLocaleString());

  return (
    <>
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
            <NavLink
              to={`/teams/${team.id}/listings/${listing.id}/edit`}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 hover:bg-slate-500 ml-2 text-xl font-bold text-white"
            >
              &#9998;
            </NavLink>
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
          <div
            className="flex flex-col sm:flex-row h-full pt-1 sm:min-h-[200px]
          rounded-md w-auto bg-slate-100 shadow"
          >
            <div
              className="flex flex-col gap-4 h-full w-full sm:w-1/2 sm:border-8
              sm:border-transparent sm:border-r-2 sm:border-r-black p-4"
            >
              <div>
                <p className="font-bold">Job Title:</p>
                <p>{listing.jobTitle}</p>
              </div>
              <div>
                <p className="font-bold">Link to Apply:</p>
                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href={`${listing.jobLink}`}
                >
                  {listing.jobLink}
                </a>
              </div>
              <div>
                <p className="font-bold">Company Name:</p>
                <p>{listing.companyName}</p>
              </div>
              <div>
                <p className="font-bold">Company Details:</p>
                <p>{listing.companyDetails}</p>
              </div>
            </div>
            <div
              className="h-full w-full sm:w-1/2 sm:border-8 sm:border-transparent
            sm:border-l-2 sm:border-l-black  p-4"
            >
              <p className="font-bold">Job Description:</p>
              <p>{listing.jobDescription}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 h-2/5">
          <ScrollableList
            title="Comments"
            width="sm:w-3/5"
            hasAddButton="true"
            onClick={() => setShowAddCommentInput(!showAddCommentInput)}
            reference={commentRef}
          >
            {showAddCommentInput ? (
              <div className="flex flex-col">
                <textarea
                  rows="8"
                  cols="5"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
                />
                <div className="flex justify-evenly mt-3 mb-2">
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-500 hover:bg-blue-70 text-sm text-white font-bold p-1 rounded w-24"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddCommentInput(false)}
                    className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold p-1 rounded w-24"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              listingComments.map((comment, i) => (
                <div
                  key={`${comment.createdAt} -${i}`}
                  className="flex flex-start p-2.5 border-b bg-white break-words"
                >
                  <div className="flex flex-col">
                    <NavLink
                      to={`/${comment.username}`}
                      className="flex bg-slate-900 rounded-full w-9 h-9 mr-3 hover:bg-blue-100 "
                    ></NavLink>
                  </div>
                  <div className="flex flex-col w-full max-w-[90%]">
                    <div className="flex justify-between font-bold">
                      <div className="flex items-center">
                        <span>{comment.username}</span>
                        <span className="ml-2 text-[8px] text-slate-300 font-normal">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {authedUser.id === comment.userId && (
                        <div className="text-xs text-slate-600">
                          <button
                            onClick={() =>
                              handelEditClick(comment.id, comment.content)
                            }
                            className={`hover:text-red-900 ${
                              showEditCommentInput &&
                              comment.id === commentId &&
                              "text-red-900"
                            }`}
                          >
                            edit
                          </button>
                          <span> / </span>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className={`hover:text-red-900 ${
                              showDeleteConfirmation &&
                              comment.id === commentId &&
                              "text-red-900"
                            }`}
                          >
                            delete
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex w-full justify-between">
                      {showEditCommentInput && commentId === comment.id ? (
                        <>
                          <ContentEditable
                            onChange={(e) => setEditComment(e.target.value)}
                            className="w-[90%] px-1 bg-slate-100 border-2 rounded-lg border-blue-600 break-words"
                            html={editComment}
                          />
                          <div className="flex self-start">
                            <button
                              className="text-xl hover:text-red-900"
                              onClick={() =>
                                handleCommentUpdate(
                                  editComment.replace(/&nbsp;/g, ""),
                                  comment.id,
                                  i
                                )
                              }
                            >
                              &#9745;
                            </button>
                            <button
                              className="text-xl hover:text-red-900"
                              onClick={() => setShowEditCommentInput(false)}
                            >
                              &#9746;
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="w-[90%] px-1 border-2 border-white">
                            {comment.content}
                          </p>
                          {showDeleteConfirmation &&
                            commentId === comment.id && (
                              <div className="flex self-start">
                                <button
                                  className="text-xl hover:text-red-900"
                                  onClick={() =>
                                    handleDeleteComment(comment.id, i)
                                  }
                                >
                                  &#9745;
                                </button>
                                <button
                                  className="text-xl hover:text-red-900"
                                  onClick={() =>
                                    setShowDeleteConfirmation(false)
                                  }
                                >
                                  &#9746;
                                </button>
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollableList>
          <ScrollableList title="All Teammates" width="sm:w-2/5">
            {teammates.map((teammate, index) => (
              <NavLink
                key={`${teammate.id}-${index}`}
                to={`/${teammate.username}`}
                className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
              >
                <div className="bg-white rounded-full w-6 h-6 mr-4" />
                <p> {teammate.username}</p>
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
    </>
  );
};

export const listingDetailsLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;
  const { data } = await axios.get("/api/session");
  if (data) {
    const [teamData, teammatesData, listingData, favoritesData, commentsData] =
      await Promise.all([
        axios.get(`/api/teams/${teamId}`),
        axios.get(`/api/teams/${teamId}/teammates`),
        axios.get(`/api/listings/${listingId}`),
        axios.get(`/api/users/${data.id}/favorites`),
        axios.get(`/api/comments/${listingId}`),
      ]);

    const team = teamData.data;
    const teammates = teammatesData.data.filter(
      (tm) => tm.status !== "invited" && tm.status !== "requested"
    );
    const listing = listingData.data;
    const favorites = favoritesData.data;
    const comments = commentsData.data;

    return { team, teammates, listing, favorites, comments };
  }
  return null;
};
