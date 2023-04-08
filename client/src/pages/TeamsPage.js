import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const TeamsPage = () => {
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser]);

  return <div>TEAMS</div>;
};

export default TeamsPage;
