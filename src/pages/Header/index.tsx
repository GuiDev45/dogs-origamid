import { Link } from "react-router-dom";
import logoDogs from "../../assets/dogs.svg";
import iconUsuario from "../../assets/usuario.svg";
import { useAuth } from "../../contexts/authHooks";

export default function Header() {
  const { data } = useAuth();

  return (
    <header className="bg-white shadow-sm fixed w-full z-50 top-0">
      <nav className="flex justify-around items-center h-16">
        <div className="p-2">
          <Link to={"/"} aria-label="Dogs - Home">
            <img src={logoDogs} alt="Logo Dogs" />
          </Link>
        </div>
        <div className="flex items-center">
          {data.token ? (
            // Lembrando que a página conta ainda não existe.
            <Link to={"/conta"} className="flex items-center text-gray-800">
              <span className="text-gray-800">{data.user?.username}</span>
            </Link>
          ) : (
            <Link to={"/login"} className="flex items-center text-gray-800">
              <span>Login / Criar</span>
              <img
                src={iconUsuario}
                className="ml-2 w-4 h-5"
                alt="Ícone de Usuário"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
