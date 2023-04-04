import AuthedPageContainer from "../components/AuthedPageContainer";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";

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

const teammates = [
  "Gino",
  "Schaffer",
  "Julian",
  "Vincent",
  "Olivia",
  "Ruby",
  "James",
  "Leandro",
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
        <ScrollableList title="Teams" widthString="w-2/3">
          {mockTeams.map((team, index) => {
            return (
              <li
                className="bg-white mb-2 p-2.5 rounded-md z-0"
                key={`${team}-${index}`}
              >
                {team}
              </li>
            );
          })}
        </ScrollableList>
        <ScrollableList title="All Teammates" widthString="w-1/3">
          All Team Members
        </ScrollableList>
      </div>
    </AuthedPageContainer>
  );
};

export default UserPage;
