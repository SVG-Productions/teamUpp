import AuthedPageContainer from "../components/AuthedPageContainer";
import AuthedPageTitle from "../components/AuthedPageTitle";

const mockTeams = [
  "Team 1",
  "Team 2",
  "Team 3",
  "Team 4",
  "Team 5",
  "Team 6",
  "Team 7",
  "Team 8",
  "Team 9",
  "Team 10",
  "Team 11",
  "Team 12",
  "Team 13",
  "Team 14",
  "Team 15",
  "Team 16",
];

const UserPage = () => {
  return (
    <AuthedPageContainer>
      <AuthedPageTitle>Username</AuthedPageTitle>
      <div className="flex gap-10 my-8 h-2/3">
        <div className="flex flex-col items-center gap-8 p-4 rounded-md w-72 bg-slate-100">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white">
            Profile Pic
          </div>
          <div className="self-start">
            <div className="p-4">Name</div>
            <div className="p-4">Date Joined</div>
            <div className="p-4">LinkedIn</div>
            <div className="p-4">Github</div>
          </div>
        </div>
        <div className="p-4 w-3/4 rounded-md bg-slate-100">User ReadME</div>
      </div>
      <div className="flex h-1/3 gap-10">
        <div className=" flex flex-col rounded-md w-2/3 bg-slate-100 overflow-hidden">
          <div>
            <p className="p-3">Teams</p>
          </div>
          <div className="p-4 pt-0 pb-2 max-h-full overflow-auto">
            <ul>
              {mockTeams.map((team) => {
                return (
                  <li className="bg-white mb-2 p-2.5 rounded-md" key={team}>
                    {team}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="p-4 rounded-md w-1/3 bg-slate-100 ">
          All Team Members
        </div>
      </div>
    </AuthedPageContainer>
  );
};

export default UserPage;
