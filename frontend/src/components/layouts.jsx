import { Outlet } from "react-router-dom";
import Header from "./header";

function Navbar() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Navbar;
