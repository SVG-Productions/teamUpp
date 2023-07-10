import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Landing = () => {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] p-6">
      <div className="flex self-end gap-3">
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="flex flex-col items-center max-w-screen-md">
        <Logo />
        <h1>Welcome to TeamApp!</h1>
        <p className="mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis est
          sequi repellendus asperiores earum esse laborum? Molestias quam
          voluptatum sunt libero itaque quidem doloribus, nulla, earum soluta,
          enim eveniet nesciunt?
        </p>
        <div className="w-full mt-4">
          <h3>Keep track of you applications.</h3>
          <img className="rounded-md" src="/landing/teams.png" />
        </div>
        <div className="w-full mt-4">
          <h3 className="text-right">Share with your peers.</h3>
          <img className="rounded-md" src="/landing/teams.png" />
        </div>
        <div className="w-full mt-4">
          <h3>Post and organize job listings</h3>
          <img className="rounded-md" src="/landing/teams.png" />
        </div>
        <div className="w-full mt-4">
          <h3 className="text-right">Document application experiences.</h3>
          <img className="rounded-md" src="/landing/teams.png" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
