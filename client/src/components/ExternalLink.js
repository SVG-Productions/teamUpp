const ExternalLink = ({ dimensions }) => {
  return (
    <div>
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9"
          className="icon_svg-stroke"
          strokename="#666"
          strokeWidth="1.5"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};

export default ExternalLink;
