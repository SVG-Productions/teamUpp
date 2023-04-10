import { useLoaderData } from "react-router-dom";

const TeamPage = () => {
  const { singleTeamData } = useLoaderData();
  const { name, jobField, description } = singleTeamData.data.team;

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{jobField}</p>
        <p>{description}</p>
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default TeamPage;
