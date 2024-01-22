import { Link } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
export const Header = () => {
  return (
    <div className="shadow-md p-2 ">
      <Link to="/">
        <img src={logo} alt="logo" className="w-40 h-10" />
      </Link>
    </div>
  );
};
