import React from "react";
import { useLoaderData } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const HomePage = () => {
  // This hook retrieves the data collected by router loader
  const { users } = useLoaderData();
  console.log(users);
  return <Dashboard />;
};

export default HomePage;
