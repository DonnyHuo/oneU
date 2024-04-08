import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const logoIcon = require("../../asserts/img/logo.png");

  console.log(location.pathname);
  return (
    <div className="h-18 flex items-center justify-between pl-5 pr-5 border-spacing-1 text-white _background1 _line relative">
      <div>
        <img className="h-5 mt-6 mb-6" src={logoIcon} />
      </div>
      <div
        className="flex items-center font-medium"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: 'translate(-50%)',
        }}
      >
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/" ? "_active" : "_title"
          }`}
          to="/"
        >
          Lottery
        </Link>
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/referral" ? "_active" : "_title"
          }`}
          to="/referral"
        >
          Referral
        </Link>
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/tutorials" ? "_active" : "_title"
          }`}
          to="/tutorials"
        >
          Tutorials
        </Link>
        <a target="_blank" href="https://www.google.com"
          className={`ml-6 mr-6 ${
            location.pathname === "/discord" ? "_active" : "_title"
          }`}
        >
          Discord
        </a>
      </div>
      <div>
        <w3m-button />
      </div>
    </div>
  );
};

export default Header;
