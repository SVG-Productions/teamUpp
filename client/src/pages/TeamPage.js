import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const TeamPage = () => {
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser]);

  return <div>SINGLE TEAM PAGE</div>;
};

export default TeamPage;
