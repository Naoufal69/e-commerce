import logo from "../assets/logo.png";
import account from "../assets/account.png";
import caddi from "../assets/panier.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="h-20 w-full min-w-full bg-gradient-to-r from-zinc-700 via-black to-black flex justify-between">
      <div className="h-20 ml-2">
        <Link to="/">
          <img
            src={logo}
            alt="Image gauche"
            className="h-20 animate-spin ..."
          />
        </Link>
      </div>
      <div
        className="text-white m-auto font-mono text-5xl font-bold capitalize
                 relative
                 cursor-pointer
                 transition-all
                 duration-500
                 before:content-['']
                 before:absolute
                 before:-bottom-2
                 before:left-1/2
                 before:-translate-x-1/2
                 before:w-0
                 before:h-1
                 before:rounded-full
                 before:opacity-0
                 before:transition-all
                 before:duration-300
                 before:bg-gradient-to-r
                 before:from-white
                 before:via-white
                 before:to-white
                 hover:before:w-full
                 hover:before:opacity-100"
      >
        <Link to="/">E-Cross</Link>
      </div>
      <div className="text-white my-auto mr-2 font-mono text-xl font-bold flex justify-end animate-bounce ">
        Admin
      </div>
    </header>
  );
}
export default Header;
