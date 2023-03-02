import logo from "../assets/logo.png";
import account from "../assets/account.png";
import caddi from "../assets/panier.png";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="h-20 w-full min-w-full bg-black flex justify-between">
      <div className="h-20">

          <img src={logo} alt="Image gauche" className="h-20" />

      </div>
      
    </header>
  );
}
export default Header;