import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import NullInfo from "./NullInfo";
import { UserType } from "../../type-definitions";
import React from "react";

const UserReadMe = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const { readme } = userData;

  return (
    <div className="flex flex-col sm:my-2">
      <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
        ReadMe
      </h1>
      <div className="px-2 py-1">{readme ? parse(readme) : <NullInfo />}</div>
    </div>
  );
};

export default UserReadMe;
