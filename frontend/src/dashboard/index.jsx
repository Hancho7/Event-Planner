/* eslint-disable react/prop-types */
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import { FaHotel } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoCodeReview } from "react-icons/go";
import { GrOverview } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import DropdownMenu from "./menu";

export default function Admin() {
  const { pathname } = useLocation();
  let data;
  const navigate = useNavigate();
  console.log(data);
  const [open, setOpen] = useState(true);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const pages = [
    {
      title: "Overview",
      icons: <GrOverview />,
      path: "/admin/Overview",
    },
    {
      title: "add event",
      icons: <FaHotel />,
      path: "/admin/add-new-event",
    },
    {
      title: "Attendees",
      icons: <TbBrandBooking />,
      path: "/admin/Attendees",
    },
    {
      title: "Payments",
      icons: <MdOutlinePayment />,
      path: "/admin/Payments",
    },
    {
      title: "Students",
      icons: <PiStudentBold />,
      path: "/admin/Student",
    },
    {
      title: "Review",
      icons: <GoCodeReview />,
      path: "/admin/Review",
    },
    {
      title: "",
      icons: null,
    },
    {
      title: "Profile",
      icons: <CgProfile />,
      path: "/admin/Profile",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateAreas: `"sidebar header" "sidebar props"`,
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        color: "#636363",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          gridArea: "header",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "4rem",
          padding: "1rem",
          backgroundColor: "#cffafe",
        }}
      >

        {/* Middle section: Search Field */}
        <div className="flex-grow flex justify-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>

        {/* Right section: User and Dropdown */}
        <div className="flex items-center gap-3">
          <h1
            onClick={(e) => [e.preventDefault(), navigate("/admin/Profile")]}
            className="self-center md:self-auto hover:cursor-pointer font-semibold duration-500"
          >
            Elton
          </h1>
          {isSmallScreen && <DropdownMenu pages={pages} navigate={navigate} />}
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`${
          open ? " w-60" : " w-20"
        } h-screen overflow-y-auto overflow-x-hidden bg-[#cffafe] duration-500 p-4 md:flex flex-col justify-between hidden`}
        style={{ gridArea: "sidebar", position: "relative" }}
      >
        <IoIosArrowBack
          className={`${
            !open && "rotate-180"
          } absolute text-[#18428f] w-4 -right-3 top-7 duration-500 hover:cursor-pointer`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center justify-center text-white gap-2">
          <img src={logo} className="w-11 h-11 rounded-full" />
          <span
            className={`${
              !open && " hidden"
            } duration-700 font-semibold text-[#333]`}
          >
            Event<span className=" text-[#fffb00]">Center</span>
          </span>
        </div>

        <div>
          {pages.map(({ title, icons, path }) => {
            if (!icons) {
              return (
                <h1
                  className={`${
                    !open && "hidden"
                  } font-semibold text-lg pt-2 pb-1 px-6`}
                  key={title}
                >
                  {title}
                </h1>
              );
            }
            return (
              <Link
                key={title}
                to={path}
                className={`flex gap-x-4 py-2 text-black-900 px-6 items-center font-semibold rounded-md ${
                  pathname === path
                    ? "bg-[#0ea5e9] text-black"
                    : "hover:bg-white active:bg-white duration-500"
                } ${!open && "justify-center"}`}
              >
                <span>{icons}</span>
                <p className={`${!open && "hidden"} duration-500`}>{title}</p>
              </Link>
            );
          })}
        </div>

        <div
          className={`${
            !open && "justify-center"
          } flex gap-x-4 py-2 px-6 items-center font-semibold rounded-md hover:bg-white hover:cursor-pointer`}
          onClick={() => {
            navigate("/");
          }}
        >
          <span>
            <BiLogOut />
          </span>
          <p className={`${!open && "hidden"}`}>Return</p>
        </div>
      </div>

      {/* CHILDREN */}
      <div
        style={{
          gridArea: "props",
          overflow: "auto",
        }}
        className="p-4 md:p-8"
      >
        <Outlet />
      </div>
    </div>
  );
}
