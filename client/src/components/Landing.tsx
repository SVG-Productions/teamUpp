import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { motion } from "framer-motion";
import Carousel from "./Carousel";

const landingImages = [
  "/landing/teams.png",
  "/landing/teamListings.png",
  "/landing/favorites.png",
];

const Landing = () => {
  return (
    <div className="flex justify-center w-full bg-gradient-to-r from-white to-indigo-100">
      <div className="fixed z-10 top-0 bg-white flex items-center justify-between gap-3 w-full p-2 shadow-sm">
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
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Logo dimensions={48} textSize="2xl" />
          </motion.div>
          <div className="md:w-3/4">
            <h1 className="font-semibold text-4xl">Welcome to TeamApp!</h1>
            <p className="mt-4 text-lg sm:text-xl md:leading-8">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
              est sequi repellendus asperiores earum esse laborum? Molestias
              quam voluptatum sunt libero itaque quidem doloribus, nulla, earum
              soluta, enim eveniet nesciunt?
            </p>
          </div>
        </div>
        <div className="w-full mt-8 md:flex md:items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mr-8 md:p-4"
          >
            <h3 className="font-semibold text-3xl">
              Keep track of your job applications.
            </h3>
            <p className="md:leading-8 sm:text-lg">
              At TeamApp we want to keep things as simple as possible. Our
              mission is to make it easy for our users to organize and locate
              job listings and applications they have posted or liked. Using our
              Favorites feature along with many ways to sort you'll find what
              you need in a breeze.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1.4 }}
            className="shadow-md rounded-lg md:w-2/5 md:h-auto"
            src="/landing/organized.jpg"
          />
        </div>
        <div className="w-full mt-8 md:flex md:flex-row-reverse md:items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:p-4 md:ml-8"
          >
            <h3 className="font-semibold text-3xl">
              Document your application experiences.
            </h3>
            <p className="sm:text-lg md:leading-8">
              Keep track of your progress using the Experiences feature. Your
              "experience" can be used to provide yourself and teammates
              specific details, such as the interviewer, interview questions,
              and more.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 1.4 }}
            className="shadow-md rounded-lg md:w-2/5 md:h-auto"
            src="/landing/interview.jpg"
          />
        </div>
        <div className="w-full mt-8 md:flex md:items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:p-4 md:mr-8"
          >
            <h3 className="font-semibold text-3xl">Share with your peers.</h3>
            <p className="sm:text-lg md:leading-8">
              One of our visions here at TeamApp was to create a space that
              invites people to not only share listings with eachother, but to
              give your teammates an idea of what the hiring process at
              companies looks like.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 1.4 }}
            className="shadow-md rounded-lg md:w-2/5 md:h-auto"
            src="/landing/teamwork.jpg"
          />
        </div>
        <div className="mt-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1.4 }}
            className="font-semibold text-3xl p-4"
          >
            In-app snaps.
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 1.4 }}
          >
            <Carousel images={landingImages} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
