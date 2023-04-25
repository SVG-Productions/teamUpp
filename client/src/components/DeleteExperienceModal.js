import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const DeleteExperienceModal = ({ isOpen, onClose }) => {
  //   const { experience } = useLoaderData();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteExperience = async () => {
    setIsDeleting(true);
    // await axios.delete(`/api/experiences/${experience.id}`);
    setIsDeleting(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"} overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-white w-full max-w-sm mx-auto rounded-sm shadow-lg z-10">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-center">
              Delete this experience?
            </h2>
            <p className="text-sm">
              You're about to permanently delete this experience and all of its
              data.
            </p>

            <div className="flex justify-center mt-6 gap-3">
              <button
                className="bg-red-400 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-sm"
                onClick={handleDeleteExperience}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 mr-2 rounded-sm"
                onClick={onClose}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteExperienceModal;
