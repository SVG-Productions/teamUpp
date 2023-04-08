import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser]);

  return <Dashboard />;
};

export default HomePage;
