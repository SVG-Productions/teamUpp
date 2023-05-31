import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import NullInfo from "./NullInfo";

const UserReadMe = () => {
  const { userData } = useLoaderData();
  const { readme } = userData;

  return (
    <div className="flex flex-col sm:my-2">
      <h3 className="font-bold text-headingColor pb-2">README</h3>
      <div className="px-2 py-1 border-l-2">
        {readme ? parse(readme) : <NullInfo />}
      </div>
    </div>
  );
};

export default UserReadMe;
