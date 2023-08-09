import React, { useState } from "react";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import parse from "html-react-parser";

const BoardAppDescription = ({
  data,
  title,
  key,
}: {
  data: string;
  title: string;
  key: string;
}) => {
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-sm py-1 px-1.5">{title}</h3>
      {showDescriptionEdit ? (
        <ReactQuill
          id={key}
          modules={basicModules}
          className="flex flex-col mt-1"
          theme="snow"
          value={data}
        />
      ) : (
        <div
          className="text-sm py-1 px-1.5 rounded-sm hover:bg-tertiary"
          onClick={() => setShowDescriptionEdit(true)}
        >
          {parse(data)}
        </div>
      )}
    </div>
  );
};

export default BoardAppDescription;
