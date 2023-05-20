import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";
import ModalLayout from "./ModalLayout";

const CreateExperienceModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState([]);
  const [questions, setQuestions] = useState([]);

  const { authedUser } = useAuth();
  const userId = authedUser.id;

  const { team, listing } = useLoaderData();
  const { id: teamId, name } = team;
  const { id: listingId, companyName, jobTitle } = listing;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceData = {
      title,
      content,
      userId,
      listingId,
    };
    await axios.post("/api/experiences", experienceData);
    navigate(`/teams/${teamId}/listings/${listingId}/experiences`);
  };
  return <div></div>;
};

export default CreateExperienceModal;
