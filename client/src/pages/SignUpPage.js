import Footer from "../components/Footer";
import AuthFormField from "../components/AuthFormField";
import AuthFormButton from "../components/AuthFormButton";

const SignUpPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="border-2 border-slate-300 w-32 h-32 my-8 bg-slate-100 rounded-full" />
        <h1 className="text-4xl text-slate-600 mb-10">Welcome to TeamApp</h1>
        <form className="border-2 border-slate-300 w-full max-w-sm mb-10 bg-slate-100 rounded-lg shadow-lg p-6">
          <AuthFormField label="Email address" id="email" type="email" />
          <AuthFormField label="Username" id="username" type="text" />
          <AuthFormField label="Password" id="password" type="password" />
          <AuthFormField
            label="Confirm password"
            id="confirmPassword"
            type="password"
          />
          <AuthFormButton>Sign Up</AuthFormButton>
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
