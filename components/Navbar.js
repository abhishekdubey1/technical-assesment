import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../pages/_app";
import logo from "../public/logo.jpg";

export default function Navbar() {
  const length = useContext(Context).books?.length;

  const navEl =
    length === 0 ? "empty" : `${length} book${length === 1 ? "" : "s"}`;
  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo">
          <Image src={logo} alt="Book Store Logo" />
        </div>
      </div>
      <ul className="navbar-links">
        <li>{navEl}</li>
        <li>
          <Link href="/basket">View Basket</Link>
        </li>
      </ul>
    </nav>
  );
}
