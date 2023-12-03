import { Link } from "react-router-dom";
import logoDogs from "../../assets/dogs.svg";
import iconUsuario from "../../assets/usuario.svg";

export default function Header() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <nav className="flex justify-around items-center py-5 ">
          <div>
            <Link to={"/"} aria-label="Dogs - Home">
              <img src={logoDogs} alt="Logo Dogs" />
            </Link>
          </div>
          <div className="flex items-center">
            <Link to={"/login"} className="flex items-center">
              <span>Login / Criar</span>
              <img src={iconUsuario} className="ml-2" />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
