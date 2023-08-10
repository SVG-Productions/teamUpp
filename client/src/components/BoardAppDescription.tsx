import React, { useState } from "react";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import parse from "html-react-parser";

const BoardAppDescription = ({
  title,
  value,
  name,
}: {
  title: string;
  value: string;
  name: string;
}) => {
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-sm py-1 px-1.5">{title}</h3>
      <form className="flex flex-col gap-2">
        {showDescriptionEdit ? (
          <>
            <ReactQuill
              id={name}
              modules={basicModules}
              className="flex flex-col mt-1"
              theme="snow"
              value={value}
            />
            <div className="flex gap-2 justify-end">
              <button>Save</button>
              <button
                onClick={() => {
                  setShowDescriptionEdit(false);
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
