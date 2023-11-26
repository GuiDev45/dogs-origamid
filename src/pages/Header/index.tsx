import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="container">
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login / Criar</Link>
      </nav>
    </>
  );
}
