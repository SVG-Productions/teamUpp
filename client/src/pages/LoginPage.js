import FormField from "../components/FormField";
import AuthFormButton from "../components/AuthFormButton";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="border border-slate-300 w-32 h-32 my-8 bg-slate-100 rounded-full" />
        <h1 className="text-4xl text-slate-600 mb-10">
          Sign In to <span className="font-semibold">TeamApp</span>
        </h1>
        <form className="border-slate-300 w-full max-w-sm mb-10 bg-slate-100 rounded-sm shadow-md p-6">
          <FormField label="Username/Email" id="email-username" type="text" />
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label
                className="block font-semibold text-slate-600 mb-2 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="inline-block align-baseline text-sm mb-2 text-blue-500 hover:text-blue-800"
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
          <AuthFormButton>Sign In</AuthFormButton>
        </form>
        <AuthFormRedirect
          text="New to TeamApp?"
          linkText="Create an account!"
          href="/signup"
        />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
