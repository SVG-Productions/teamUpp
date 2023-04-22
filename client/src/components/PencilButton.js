import { NavLink } from "react-router-dom";

const PencilButton = ({ href, styling }) => {
  return (
    <NavLink
      to={href}
      className={`${styling} flex justify-center items-center h-10 w-10 rounded-full bg-slate-900 hover hover:bg-slate-500`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`cursor-pointer `}
        fill="white"
        width="20px"
        viewBox="0 0 100 100"
      >
        <path d="M37.6,14.6l-23,23l-7-7C6,28.9,5,26.6,5,24.2c0-2.4,1-4.9,2.6-6.6l10-10C19.3,6,21.8,5,24.2,5c2.5,0,4.7,1,6.4,2.6  L37.6,14.6z M95,95l-8.6-30.7c-0.2-0.8-0.7-1.5-1.2-2C43,20.1,43,20.1,40.8,17.9l-6.4,6.3l47.9,48l2.8-2.8L88.6,82L82,88.6  l-12.7-3.4l9.3-9.4L30.7,27.8L17.9,40.9l44.4,44.3c0.5,0.5,1.1,1,2,1.2L95,95z"></path>
      </svg>
    </NavLink>
  );
};

export default PencilButton;
