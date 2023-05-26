import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import NullInfo from "./NullInfo";

const UserReadMe = () => {
  const { user } = useLoaderData();
  const { readme } = user;

  return (
    <div className="flex flex-col sm:my-2">
      <p className="font-bold text-slate-400 pb-2">README</p>
      <div className="px-2 py-1 border-l-2">
        {readme ? parse(readme) : <NullInfo />}
      </div>
    </div>
  );
};

export default UserReadMe;
