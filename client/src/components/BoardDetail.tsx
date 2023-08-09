import React from "react";

const BoardDetail = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="flex">
      <span className="text-sm w-2/5 font-semibold">{title}</span>
      <span className="text-sm w-3/5">{data}</span>
    </div>
  );
};

export default BoardDetail;
