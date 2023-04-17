import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";

export const CreateListingPage = () => {
  return (
    <>
      <AuthedPageTitle>Teams / Team Name / Create Listing</AuthedPageTitle>
      <div className="flex justify-center">
        <form className="max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow">
          <div className="sm:w-2/3">
            <FormField
              label="Job Title"
              id="jobTitle"
              type="text"
              placeholder="Enter job title..."
            />
            <FormField
              label="Link to Application"
              id="link"
              type="url"
              placeholder="Enter link to application..."
            />
            <FormField
              label="Company Name"
              id="companyName"
              type="text"
              placeholder="Enter company name..."
            />
            <FormField
              label="Company Details"
              id="companyDetails"
              type="text"
              placeholder="Enter company details..."
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              Job Description
            </label>
            <textarea
              id="description"
              rows="11"
              cols="50"
              placeholder="Enter job description..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              required={false}
            />
          </div>
        </form>
      </div>
    </>
  );
};
