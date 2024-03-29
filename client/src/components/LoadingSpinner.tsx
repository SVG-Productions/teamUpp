import React from "react";

const LoadingSpinner = ({ message }: { message?: string }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-borderprimary"></div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
