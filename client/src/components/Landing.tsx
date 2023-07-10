import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Landing = () => {
  return (
    <>
      <div className="fixed top-0 bg-white flex justify-end gap-3 w-full p-4">
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="flex flex-col w-full items-center min-h-[calc(100vh-4rem)] p-6 pt-0 mt-16">
        <div className="flex flex-col items-center max-w-5xl">
          <Logo />
          <h1 className="font-semibold">Welcome to TeamApp!</h1>
          <p className="mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
            est sequi repellendus asperiores earum esse laborum? Molestias quam
            voluptatum sunt libero itaque quidem doloribus, nulla, earum soluta,
            enim eveniet nesciunt?
          </p>
          <div className="w-full mt-8 sm:flex">
            <div>
              <h3 className="font-semibold">
                Keep track of your job applications.
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                labore dolores perspiciatis tempora eum amet facilis
                voluptatibus! Aliquam nesciunt mollitia ipsa nihil! Libero
                ratione nobis cupiditate in accusamus molestias nesciunt.
              </p>
            </div>
            <img className="rounded-md sm:w-1/2" src="/landing/teams.png" />
          </div>
          <div className="w-full mt-8 sm:flex sm:flex-row-reverse">
            <div>
              <h3 className="font-semibold text-right">
                Share with your peers.
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                labore dolores perspiciatis tempora eum amet facilis
                voluptatibus! Aliquam nesciunt mollitia ipsa nihil! Libero
                ratione nobis cupiditate in accusamus molestias nesciunt.
              </p>
            </div>
            <img className="rounded-md sm:w-1/2" src="/landing/teams.png" />
          </div>
          <div className="w-full mt-8 sm:flex">
            <div>
              <h3 className="font-semibold">Post and organize job listings.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                labore dolores perspiciatis tempora eum amet facilis
                voluptatibus! Aliquam nesciunt mollitia ipsa nihil! Libero
                ratione nobis cupiditate in accusamus molestias nesciunt.
              </p>
            </div>
            <img className="rounded-md sm:w-1/2" src="/landing/teams.png" />
          </div>
          <div className="w-full mt-8 sm:flex sm:flex-row-reverse">
            <div className="">
              <h3 className="font-semibold text-right">
                Document application experiences.
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                labore dolores perspiciatis tempora eum amet facilis
                voluptatibus! Aliquam nesciunt mollitia ipsa nihil! Libero
                ratione nobis cupiditate in accusamus molestias nesciunt.
              </p>
            </div>
            <img className="rounded-md sm:w-1/2" src="/landing/teams.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
