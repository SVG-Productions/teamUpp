import React from "react";
import { useLoaderData } from "react-router-dom";

const Splash = () => {
  // This hook retrieves the data collected by router loader
  const { users } = useLoaderData();
  return (
    <div className="bg-red-500">
      TEAMAPP - SPLASH/LOGIN
      <ul className="bg-blue-200">
        <p>DATA</p>
        {users.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Splash;
