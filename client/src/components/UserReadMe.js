import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import NullInfo from "./NullInfo";

const UserReadMe = () => {
  const { userData } = useLoaderData();
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
