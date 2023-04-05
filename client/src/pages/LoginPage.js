const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
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
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
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
    </div>
  );
};

export default LoginPage;
