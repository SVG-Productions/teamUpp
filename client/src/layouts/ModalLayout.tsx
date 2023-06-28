import React, { ReactElement } from "react";

interface ModalLayoutProps {
  children: ReactElement;
  handleClickOut: (bool: boolean) => void;
}

const ModalLayout = ({ children, handleClickOut }: ModalLayoutProps) => {
  return (
    <div className="fixed inset-0 z-20 top-[64px] overflow-y-auto">
      <div className="flex items-center w-full justify-center h-full">
        <div
          className="sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75"
          onClick={() => handleClickOut(false)}
        ></div>
        <div className="fixed bg-primary inset-0 top-[64px] sm:hidden"></div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
