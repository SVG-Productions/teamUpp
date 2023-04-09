import { useLoaderData } from "react-router-dom";

const TeamPage = () => {
  const { singleTeamData } = useLoaderData();
  const { name, jobField, description } = singleTeamData.data.team;

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{jobField}</p>
      <p>{description}</p>
    </div>
  );
};

export default TeamPage;
