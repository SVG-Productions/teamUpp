import { useState, useRef } from "react";
import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import ScrollableList from "./ScrollableList";
import useOnClickOutside from "../hooks/useOnClickOutside";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";

const CommentsSection = ({ listing, authedUser, tabs }) => {
  const { comments } = useLoaderData();

  const [listingComments, setListingComments] = useState(comments);
  const [editComment, setEditComment] = useState("");
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showAddCommentInput, setShowAddCommentInput] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

  return (
    <ul className={`${tabs !== "comments" && "hidden"}`}>
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
          <div className="flex justify-end mt-3 mb-2 gap-1">
            <AcceptButton onClick={handleAddComment} iconSize="28px" />
            <DenyButton
              onClick={() => setShowAddCommentInput(false)}
              iconSize="28px"
            />
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
              {showEditCommentInput && commentId === comment.id ? (
                <div className="flex w-full justify-between" ref={editRef}>
                  <ContentEditable
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-[90%] px-1 bg-slate-100 border-2 rounded-lg border-blue-600 break-words"
                    html={editComment}
                  />
                  <div className="flex self-start">
                    <AcceptButton
                      onClick={() =>
                        handleCommentUpdate(
                          editComment.replace(/&nbsp;/g, ""),
                          comment.id,
                          i
                        )
                      }
                    />
                    <DenyButton
                      onClick={() => setShowEditCommentInput(false)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex w-full justify-between">
                  <p className="w-[90%] px-1 border-2 border-white">
                    {comment.content}
                  </p>
                  {showDeleteConfirmation && commentId === comment.id && (
                    <div className="flex self-start" ref={deleteRef}>
                      <AcceptButton
                        onClick={() => handleDeleteComment(comment.id, i)}
                      />
                      <DenyButton
                        onClick={() => setShowDeleteConfirmation(false)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </ul>
  );
};

export default CommentsSection;
