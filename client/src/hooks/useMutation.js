import { useState } from "react";

const useMutation = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return { loading, error, success };
};

export default useMutation;
