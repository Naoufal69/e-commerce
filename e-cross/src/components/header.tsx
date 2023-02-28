import logo from '../assets/logo.png'
import account from '../assets/account.png'
import caddi from '../assets/panier.png'
function Header() {
  return (
    <header className="h-20 bg-black flex justify-between">
      <img src={logo} alt="Image gauche" className="w-1/4 object-contain justify-start"/>
      <div className='flex w-3/4 justify-end'>
        <img src={caddi} alt="Image droite"/>
        <img src={account} alt="Image droite"/>
      </div>
    </header>
  );
}
export default Header;
