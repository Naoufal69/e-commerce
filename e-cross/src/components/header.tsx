import logo from "../assets/logo.png";
import account from "../assets/account.png";
import caddi from "../assets/panier.png";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="h-20 w-full min-w-full bg-black flex justify-between">
      <div className="h-20">
        <Link to="/">
          <img src={logo} alt="Image gauche" className="h-20" />
        </Link>
      </div>
      <div className="flex w-3/4 justify-end">
        <Link to="/Pannier">
          <img src={caddi} alt="Image droite" className="h-20" />
        </Link>
        <Link to="/Profile">
          <img src={account} alt="Image droite" className="h-20" />
        </Link>
      </div>
    </header>
  );
}
export default Header;
