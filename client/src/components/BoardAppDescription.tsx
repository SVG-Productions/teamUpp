import React, { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import parse from "html-react-parser";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import axios from "axios";

const BoardAppDescription = ({
  title,
  value,
  name,
  appId,
  setAppData,
}: {
  title: string;
  value: string;
  name: string;
  appId: string;
  setAppData: any;
}) => {
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);
  const [description, setDescription] = useState(value);

  const handleAcceptEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (value === description) {
      setShowDescriptionEdit(false);
      return;
    }
    try {
      setAppData((prev: any) => ({
        ...prev,
        [name]: description,
      }));
      await axios.patch(`/api/listings/${appId}`, {
        [name]: description,
      });
      setShowDescriptionEdit(false);
    } catch (error) {
      toast.error("Error updating application.", basicToast);
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-sm py-1 px-1.5">{title}</h3>
      <form className="flex flex-col gap-2" onSubmit={handleAcceptEdit}>
        {showDescriptionEdit ? (
          <>
            <ReactQuill
              id={name}
              modules={basicModules}
              className="flex flex-col mt-1"
              theme="snow"
              value={description}
              onChange={setDescription}
            />
            <div className="flex gap-2 justify-end">
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => {
                  setShowDescriptionEdit(false);
                  setDescription(value);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div
            className="text-sm py-1 px-1.5 rounded-sm hover:bg-tertiary"
            onClick={() => setShowDescriptionEdit(true)}
          >
            {parse(value)}
          </div>
        )}
      </form>
    </div>
  );
};

export default BoardAppDescription;
