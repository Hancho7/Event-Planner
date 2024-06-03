import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Navbar() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}

export default Navbar;
