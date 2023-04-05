import Footer from "../components/Footer";

const SignUpPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="border-2 border-slate-300 w-32 h-32 my-8 bg-slate-100 rounded-full" />
        <h1 className="text-4xl text-slate-600 mb-10">Welcome to TeamApp</h1>
        <form className="border-2 border-slate-300 w-full max-w-sm mb-10 bg-slate-100 rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <label
              className="block font-semibold text-slate-600 mb-2 text-sm"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold text-slate-600 mb-2 text-sm"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
              id="username"
              type="text"
              placeholder="username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold text-slate-600 mb-2 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
              id="password"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block font-semibold text-slate-600 mb-2 text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="border-2 border-slate-300 w-full max-w-sm bg-slate-100 mb-20 rounded-lg shadow-lg p-5 text-center">
          <p className="font-semibold text-sm text-slate-600">
            Already have an account?
            <a
              className="mx-2 inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
            >
              Login!
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
