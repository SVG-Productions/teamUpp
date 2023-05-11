import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const DeleteAccountModal = ({ handleModal }) => {
  const { logout } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await axios.delete("/api/session/user");
    logout();
  };
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity"
          onClick={() => handleModal(false)}
        ></div>
        <div className="fixed inset-0 bg-white transition-opacity sm:hidden"></div>

        <div className="relative bg-white w-full max-w-sm mx-auto rounded-sm z-10 sm:shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-center">
              Delete your account?
            </h2>
            <p className="text-sm">
              You're about to permanently delete this account and all of its
              data. This is irreversible.
            </p>
            <div className="flex justify-center mt-6 gap-3">
              <button
                className="bg-red-400 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-sm"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 mr-2 rounded-sm"
                onClick={() => handleModal(false)}
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

export default DeleteAccountModal;
