const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="border-2 border-slate-300 w-full max-w-md mb-10 bg-slate-100 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="block font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <a
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <div className="border-2 border-slate-300 w-full max-w-md bg-slate-100 rounded-lg shadow-lg p-6"></div>
    </div>
  );
};

export default LoginPage;
