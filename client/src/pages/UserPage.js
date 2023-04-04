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
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-[55%] min-h-[430px]">
        <div className="flex flex-col items-center gap-4 sm:gap-8 p-4 rounded-md sm:w-72 bg-slate-100">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white">
            Profile Pic
          </div>
          <div className="self-start">
            <div className="sm:p-4 py-1 px-4">Name</div>
            <div className="sm:p-4 py-1 px-4">Date Joined</div>
            <div className="sm:p-4 py-1 px-4">LinkedIn</div>
            <div className="sm:p-4 py-1 px-4">Github</div>
          </div>
        </div>
        <div className="flex flex-col sm:w-3/4 h-80 sm:h-auto rounded-md bg-slate-100">
          <p className="p-4">User ReadME</p>
          <div className="h-full p-4 m-8 mt-0 bg-white rounded-md overflow-auto">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consectetur temporibus quae aliquam nobis nam accusantium, minima
              quam iste magnam autem neque laborum nulla esse cupiditate modi
              impedit sapiente vero?
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-1/3 gap-10">
        <ScrollableList title="Teams" width="sm:w-2/3">
          {mockTeams.map((team, index) => (
            <li className="bg-white p-2.5 rounded-md" key={`${team}-${index}`}>
              {team}
            </li>
          ))}
        </ScrollableList>
        <ScrollableList title="All Teammates" width="sm:w-1/3">
          {teammates.map((teammate, index) => (
            <li
              className="flex items-center mb-2 p-1.5"
              key={`${teammate}-${index}`}
            >
              <div className="bg-white rounded-full w-7 h-7 mr-4" />
              <p> {teammate}</p>
            </li>
          ))}
        </ScrollableList>
      </div>
    </AuthedPageContainer>
  );
};

export default UserPage;
