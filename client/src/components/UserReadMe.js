import { useLoaderData } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserReadMe = () => {
  const { user } = useLoaderData();
  const { readme } = user;

  return (
    <div className="flex flex-col">
      <div className="flex pb-2">
        <p className="font-bold text-slate-400">README</p>
      </div>
      <div className="px-2">{readme ? readme : <NullInfo />}</div>
    </div>
  );
};

export default UserReadMe;
