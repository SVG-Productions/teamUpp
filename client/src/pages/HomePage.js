import React from "react";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  // This hook retrieves the data collected by router loader
  const { users } = useLoaderData();
  console.log(users);
  return (
    <div className="bg-red-500">
      <h1 className="font-extrabold">TEAMAPP - SPLASH/LOGIN</h1>
      <ol className="bg-blue-200">
        <h2 className="font-bold">DATA</h2>
        {users.map((user, i) => (
          <li key={i}>
            Username: {user.username} | Email: {user.email} | Id: {user.id}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HomePage;
