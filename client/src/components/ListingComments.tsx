import React, { useState, useRef } from "react";
import axios from "axios";
import { NavLink, useLoaderData, useRevalidator } from "react-router-dom";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";
import { commentModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { formatCommentDate } from "../utils/dateFormatters";
import { basicToast } from "../utils/toastOptions";
import { toast } from "react-hot-toast";
import { CommentType, ListingType, TeamType } from "../../type-definitions";

const ListingComments = ({ tabs }: { tabs: string }) => {
  const { listingData, commentData, teamData } = useLoaderData() as {
    listingData: ListingType;
    commentData: { comments: CommentType[] };
    teamData: TeamType;
  };
  const { authedUser } = useAuth();
  const revalidator = useRevalidator();
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentId, setCommentId] = useState("");

  const editRef = useRef<HTMLInputElement>(null);
  const deleteRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(editRef, () => setShowEditCommentInput(false));
  useOnClickOutside(deleteRef, () => setShowDeleteConfirmation(false));

  const handleAddComment = async () => {
    try {
      if (!newComment) {
        throw new Error("Oops! Comment cannot be empty.");
      }
      const commentData = {
        userId: authedUser?.id,
        listingId: listingData.id,
        teamId: teamData.id,
        content: newComment.trim(),
      };
      await axios.post("/api/comments", commentData);
      revalidator.revalidate();
      setNewComment("");
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const handleEditClick = (commentId: string, content: string) => {
    setCommentId(commentId);
    setEditComment(content);
    setShowDeleteConfirmation(false);
    setShowEditCommentInput(true);
  };

  const handleDeleteClick = (commentId: string) => {
    setCommentId(commentId);
    setShowEditCommentInput(false);
    setShowDeleteConfirmation(true);
  };

  const handleAccept = async (id: string) => {
    if (showEditCommentInput) {
      try {
        if (!editComment) {
          throw new Error("Comment cannot be empty!");
        }
        const content = editComment.replace(/&nbsp;/g, "");
        await axios.patch(`/api/comments/${id}`, {
          content,
        });
        revalidator.revalidate();
        setShowEditCommentInput(false);
      } catch (error: any) {
        toast.error(error.response.data.message, basicToast);
      }
    }
    if (showDeleteConfirmation) {
      try {
        await axios.delete(`/api/comments/${id}`);
        revalidator.revalidate();
        setShowDeleteConfirmation(false);
      } catch (error: any) {
        toast.error(error.response.data.message, basicToast);
      }
    }
  };

  const handleDeny = () => {
    if (showEditCommentInput) {
      setShowEditCommentInput(false);
    }
    if (showDeleteConfirmation) {
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div className={`pt-4  ${tabs !== "comments" && "hidden"}`}>
      <div className="flex flex-col mb-4 py-2 px-0 rounded-sm sm:px-2">
        <ReactQuill
          value={newComment}
          onChange={setNewComment}
          modules={commentModules}
          theme="snow"
        />
        <div className="flex justify-end mt-3 mb-2 gap-1">
          <button
            onClick={handleAddComment}
            className="p-2 text-sm bg-buttonPrimary hover:bg-buttonSecondary text-white font-semibold rounded"
          >
            Add Comment
          </button>
        </div>
      </div>
      <ul>
        {commentData.comments.map((comment: CommentType) => {
          const editReference =
            comment.id === commentId ? { ref: editRef } : {};
          const deleteReference =
            comment.id === commentId ? { ref: deleteRef } : {};

          return (
            <li
              key={comment.id}
              className="flex flex-start py-2 px-0 break-words sm:px-2"
            >
              <div className="flex flex-col">
                <NavLink to={`/${comment.username}`}>
                  <img
                    src={comment.photo || comment.avatar}
                    className="flex rounded-full w-9 h-9 mr-3"
                    height={36}
                    width={36}
                    alt={comment.username}
                  />
                </NavLink>
              </div>
              <div className="flex flex-col w-full max-w-[90%]">
                <div className="flex justify-between items-center font-bold">
                  <span>{comment.username}</span>
                  <span className="ml-2 text-[8px] italic text-slate-500 font-normal sm:text-[12px]">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>
                <div
                  className="flex flex-col w-full justify-between"
                  {...editReference}
                >
                  {showEditCommentInput && commentId === comment.id ? (
                    <div className="py-2">
                      <ReactQuill
                        value={editComment}
                        onChange={setEditComment}
                        modules={commentModules}
                        theme="snow"
                      />
                    </div>
                  ) : (
                    <div className="px-2 my-2 border-l-2 border-slate-300">
                      {parse(comment.content)}
                    </div>
                  )}
                  <div
                    className={`flex justify-between h-5 items-center ${
                      authedUser?.id !== comment.userId && "hidden"
                    }`}
                  >
                    <div className="text-xs text-slate-600 font-bold">
                      <button
                        onClick={() =>
                          handleEditClick(comment.id, comment.content)
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
                    {(showEditCommentInput || showDeleteConfirmation) &&
                      commentId === comment.id && (
                        <div
                          className="flex self-start items-center gap-1"
                          {...deleteReference}
                        >
                          <FontAwesomeIcon
                            icon={faCheckSquare}
                            className="text-iconPrimary cursor-pointer hover:text-green-500"
                            onClick={() => handleAccept(comment.id)}
                          />
                          <FontAwesomeIcon
                            icon={faXmarkSquare}
                            className="text-iconPrimary cursor-pointer hover:text-red-500"
                            onClick={handleDeny}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListingComments;
