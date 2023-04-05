import AuthFormField from "../components/AuthFormField";
import AuthFormButton from "../components/AuthFormButton";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Footer from "../components/Footer";

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
        <AuthFormRedirect
          text="Already have an account?"
          linkText="Login!"
          href="/login"
        />
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
