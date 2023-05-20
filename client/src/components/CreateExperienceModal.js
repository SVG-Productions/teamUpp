import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";
import ModalLayout from "./ModalLayout";

const CreateExperienceModal = () => {
  const [experienceTitle, setExperienceTitle] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");
  return <div></div>;
};

export default CreateExperienceModal;
