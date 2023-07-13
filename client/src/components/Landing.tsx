import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <>
      <div className="fixed top-0 bg-white flex items-center justify-between gap-3 w-full p-2 shadow-sm">
        <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full hover:bg-slate-500">
          <p className="text-white text-xs">t / a</p>
        </div>
        <div className="flex gap-3 items-center">
          <Link to="/login" className="font-lg font-semibold text-black">
            Login
          </Link>
          <Link
            to="/signup"
            className="font-semibold text-sm min-w-fit py-2 px-4 rounded-md
          border-2 border-blue-400 hover:bg-blue-100 hover:no-underline md:text-base"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] p-6 pt-0 mt-16 max-w-7xl">
        <div className="flex flex-col items-center justify-between md:flex-row-reverse">
          <Logo />
          <div className="md:w-3/4">
            <h1 className="font-semibold">Welcome to TeamApp!</h1>
            <p className="mt-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
              est sequi repellendus asperiores earum esse laborum? Molestias
              quam voluptatum sunt libero itaque quidem doloribus, nulla, earum
              soluta, enim eveniet nesciunt?
            </p>
          </div>
        </div>
        <div className="w-full mt-8 md:flex">
          <div className="self-start mb-4 md:w-2/5 md:p-4">
            <h3 className="font-semibold text-xl">
              Keep track of your job applications.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              labore dolores perspiciatis tempora eum amet facilis voluptatibus!
              Aliquam nesciunt mollitia ipsa nihil! Libero ratione nobis
              cupiditate in accusamus molestias nesciunt.
            </p>
          </div>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="shadow-md rounded-md md:w-3/5"
            src="/landing/favorites.png"
          />
        </div>
        <div className="w-full mt-8 md:flex">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="shadow-md rounded-md md:w-3/5"
            src="/landing/teams.png"
          />
          <div className="justify-end mb-4 md:w-2/5 md:p-4 md:ml-8">
            <h3 className="font-semibold text-xl">Share with your peers.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              labore dolores perspiciatis tempora eum amet facilis voluptatibus!
              Aliquam nesciunt mollitia ipsa nihil! Libero ratione nobis
              cupiditate in accusamus molestias nesciunt.
            </p>
          </div>
        </div>
        <div className="w-full mt-8 md:flex">
          <div className="self-start mb-4 md:p-4 md:mr-8">
            <h3 className="font-semibold text-xl">
              Post and organize job listings.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              labore dolores perspiciatis tempora eum amet facilis voluptatibus!
              Aliquam nesciunt mollitia ipsa nihil! Libero ratione nobis
              cupiditate in accusamus molestias nesciunt.
            </p>
          </div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="shadow-md rounded-md md:w-3/5"
            src="/landing/teamListings.png"
          />
        </div>
        <div className="w-full mt-8 md:flex">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="shadow-md rounded-md md:w-3/5"
            src="/landing/experience.png"
          />
          <div className="self-start mb-4 md:p-4 md:ml-8">
            <h3 className="font-semibold text-xl">
              Document application experiences.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              labore dolores perspiciatis tempora eum amet facilis voluptatibus!
              Aliquam nesciunt mollitia ipsa nihil! Libero ratione nobis
              cupiditate in accusamus molestias nesciunt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
