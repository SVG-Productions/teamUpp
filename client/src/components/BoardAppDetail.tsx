import React from "react";

const BoardAppDetail = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="flex">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      <span className="text-sm w-3/5 py-1 px-1.5 rounded-sm hover:bg-tertiary">
        {data}
      </span>
    </div>
  );
};

export default BoardAppDetail;
