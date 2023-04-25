import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const DeleteExperienceModal = ({ isOpen, onClose }) => {
  const { experience } = useLoaderData();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteExperience = async () => {
    setIsDeleting(true);
    await axios.delete(`/api/experiences/${experience.id}`);
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

        <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              Are you sure you want to delete this experience?
            </h2>

            <div className="flex justify-end">
              <button
                className="bg-gray-100 text-gray-700 font-medium px-4 py-2 mr-2 rounded-lg"
                onClick={onClose}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteExperienceModal;
