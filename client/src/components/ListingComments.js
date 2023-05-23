import { useState, useRef } from "react";
import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import useOnClickOutside from "../hooks/useOnClickOutside";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";

const ListingComments = ({ listing, authedUser, tabs, mobileTabs }) => {
  const { comments } = useLoaderData();

  const [listingComments, setListingComments] = useState(comments);
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentId, setCommentId] = useState("");

  const editRef = useRef();
  const deleteRef = useRef();
  useOnClickOutside(editRef, () => setShowEditCommentInput(false));
  useOnClickOutside(deleteRef, () => setShowDeleteConfirmation(false));

  const handleAddComment = async () => {
    const commentData = {
      userId: authedUser.id,
      listingId: listing.id,
      content: newComment.trim(),
    };
    const addedComment = await axios.post("/api/comments", commentData);
    setListingComments([addedComment.data, ...listingComments]);
    setNewComment("");
  };

  const handleEditClick = (commentId, content) => {
    setCommentId(commentId);
    setEditComment(content);
    setShowDeleteConfirmation(false);
    setShowEditCommentInput(true);
  };

  const handleDeleteClick = (commentId) => {
    setCommentId(commentId);
    setShowEditCommentInput(false);
    setShowDeleteConfirmation(true);
  };

  const handleAccept = async (id) => {
    if (showEditCommentInput) {
      const content = editComment.replace(/&nbsp;/g, "");
      await axios.patch(`/api/comments/${id}`, {
        content,
      });
      setListingComments((prev) =>
        prev.map((c) => {
          if (c.id === id) c.content = content;
          return c;
        })
      );
      setShowEditCommentInput(false);
    }
    if (showDeleteConfirmation) {
      await axios.delete(`/api/comments/${id}`);
      setListingComments((prev) => prev.filter((c) => c.id !== id));
      setShowDeleteConfirmation(false);
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
    <div
      className={`pt-4 ${mobileTabs !== "comments" && "hidden"} ${
        tabs !== "comments" && "sm:hidden"
      }`}
    >
      <div className="flex flex-col bg-slate-100 mb-4 p-2 rounded-sm">
        <textarea
          rows="6"
          cols="5"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
        />
        <div className="flex justify-end mt-3 mb-2 gap-1">
          <button
            onClick={handleAddComment}
            className="p-2 text-sm bg-bluegray text-white font-semibold rounded"
          >
            Add Comment
          </button>
        </div>
      </div>
      <ul>
        {listingComments.map((comment) => {
          const editReference =
            comment.id === commentId ? { ref: editRef } : {};
          const deleteReference =
            comment.id === commentId ? { ref: deleteRef } : {};

          return (
            <li
              key={comment.id}
              className="flex flex-start p-2.5 bg-white break-words"
            >
              <div className="flex flex-col">
                <NavLink
                  to={`/${comment.username}`}
                  className="flex bg-slate-900 rounded-full w-9 h-9 mr-3 hover:bg-blue-100 "
                ></NavLink>
              </div>
              <div className="flex flex-col w-full max-w-[90%]">
                <div className="flex justify-between items-center font-bold">
                  <span>{comment.username}</span>
                  <span className="ml-2 text-[8px] text-slate-500 font-normal sm:text-[12px]">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div
                  className="flex flex-col w-full justify-between"
                  {...editReference}
                >
                  {showEditCommentInput && commentId === comment.id ? (
                    <ContentEditable
                      onChange={(e) => setEditComment(e.target.value)}
                      className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words"
                      html={editComment}
                    />
                  ) : (
                    <p className="px-1 border-2 border-white">
                      {comment.content}
                    </p>
                  )}
                  <div
                    className={`flex justify-between h-5 items-center ${
                      authedUser.id !== comment.userId && "hidden"
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
                          className="flex self-start items-center"
                          {...deleteReference}
                        >
                          <AcceptButton
                            onClick={() => handleAccept(comment.id)}
                          />
                          <DenyButton onClick={handleDeny} />
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
