import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useLoaderData } from "react-router-dom";
import trimUrl from "../utils/trimUrl";

const UserSocials = () => {
  const { userData } = useLoaderData();
  const { socials } = userData;

  return (
    <div className="flex flex-col">
      {socials.map((s, i) => {
        let icon;
        if (s.includes("linkedin.com")) {
          icon = (
            <FontAwesomeIcon
              icon={faLinkedin}
              size="sm"
              className="text-slate-500 mr-2"
            />
          );
        } else if (s.includes("github.com")) {
          icon = (
            <FontAwesomeIcon
              icon={faGithub}
              size="sm"
              className="text-slate-500 mr-2"
            />
          );
        } else if (s.includes("facebook.com")) {
          icon = (
            <FontAwesomeIcon
              icon={faFacebook}
              size="sm"
              className="text-slate-500 mr-2"
            />
          );
        } else {
          icon = (
            <FontAwesomeIcon
              icon={faLink}
              size="sm"
              className="text-slate-500 mr-2"
            />
          );
        }
        return (
          <div key={s + i} className="py-1 flex items-center lg:px-8">
            {icon}
            <a
              target="_blank"
              rel="noreferrer"
              className="flex overflow-hidden items-center"
              href={s}
            >
              <div className="truncate">{trimUrl(s)}</div>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                size="xs"
                className="ml-2 text-slate-600"
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default UserSocials;
