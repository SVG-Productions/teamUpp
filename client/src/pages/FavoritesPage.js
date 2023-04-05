import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";

const jobListings = [
  {
    company: "Acme Inc",
    title: "Full Stack Engineer",
    date: "2023-04-03"
  },
  {
    company: "TechCorp",
    title: "Senior Software Engineer",
    date: "2023-04-02"
  },
  {
    company: "InnovateX",
    title: "Backend Developer",
    date: "2023-04-01"
  },
  {
    company: "BlueSky Co",
    title: "Frontend Developer",
    date: "2023-03-31"
  },
  {
    company: "BigData Corp",
    title: "Data Engineer",
    date: "2023-03-30"
  },
  {
    company: "CodeCloud",
    title: "Cloud Solutions Architect",
    date: "2023-03-29"
  },
  {
    company: "Rocket Software",
    title: "DevOps Engineer",
    date: "2023-03-28"
  },
  {
    company: "ByteCorp",
    title: "Software Developer",
    date: "2023-03-27"
  },
  {
    company: "GlobalTech",
    title: "Mobile Developer",
    date: "2023-03-26"
  },
  {
    company: "Code4U",
    title: "UI/UX Designer",
    date: "2023-03-25"
  },
  {
    company: "CloudBuilders",
    title: "Cloud Infrastructure Engineer",
    date: "2023-03-24"
  },
  {
    company: "RedDev",
    title: "Software Engineer",
    date: "2023-03-23"
  },
  {
    company: "SaaS Inc",
    title: "Senior Java Developer",
    date: "2023-03-22"
  },
  {
    company: "AI Technologies",
    title: "Machine Learning Engineer",
    date: "2023-03-21"
  },
  {
    company: "GreenTech",
    title: "Frontend Web Developer",
    date: "2023-03-20"
  },
  {
    company: "DataWorks",
    title: "Data Analyst",
    date: "2023-03-19"
  },
  {
    company: "AgileSoft",
    title: "Agile Coach",
    date: "2023-03-18"
  },
  {
    company: "SmartSolutions",
    title: "Technical Lead",
    date: "2023-03-17"
  },
  {
    company: "SecureSoft",
    title: "Security Engineer",
    date: "2023-03-16"
  },
  {
    company: "CodeX",
    title: "Full Stack Developer",
    date: "2023-03-15"
  }
];

const FavoritesPage = () => {
  return (
    <>
      <AuthedPageTitle>User Favorites</AuthedPageTitle>
      {/* <div className="flex flex-col sm:flex-row sm:min-h-[650px] sm:h-[90%] min-h-[430px] -mx-3 sm:mx-0 gap-10 mt-10"> */}
      <div className='mt-8 h-full overflow-auto -mx-4 sm:mx-0'>
        <ScrollableList title="Favorite Listings" width="w-full min-w-[325px]" height="h-[40rem] sm:h-[100%] min-h-[430px]">
          {jobListings.map((job, index) => (
            <div key={index} className="flex flex-row bg-white p-2.5 rounded-md">
              <div className="flex flex-row w-2/3 items-center">
                <div className="text-yellow-400 pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 14.535l-4.954 3.033 1.182-5.484-3.972-3.44 5.51-.472L10 3.273l2.234 5.899 5.51.472-3.972 3.44 1.182 5.484z" />
                  </svg>
                </div>
                <div className="text-xs sm:text-lg font-bold">{job.company}</div>
                <div className="hidden sm:block sm:text-lg font-bold mx-2">/</div>
                <div className="text-xs sm:text-base px-3 sm:px-0">{job.title}</div>
              </div>
              <div className="flex flex-row justify-end w-1/3 items-center">
                <div className="text-xs sm:text-sm">{job.date}</div>
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-slate-300 ml-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-black">
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="6.5" cy="12" r="1.5" />
                    <circle cx="17.5" cy="12" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </ScrollableList>
      </div>
      {/* </div> */}





    </>
  )
};

export default FavoritesPage;
