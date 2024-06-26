import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaUser } from "react-icons/fa";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Events", href: "/events", current: false },
  { name: "About Us", href: "/about-us", icon: null, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { data } = useSelector((state) => state.login);
  const location = useLocation();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderLoggedInNav = () => {
    if (data) {
      if (data.role === "Planner") {
        return (
          <>
            <Link to="/admin">
              <button className="flex items-center rounded-sm h-8 px-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                <FaUser className="mr-2" />
                <span>Dashboard</span>
              </button>
            </Link>
            <Link to="/update-profile">
              <button className="bg-gray-500 flex items-center rounded-sm h-8 px-2 hover:bg-gray-600 text-white">
                <FaUser className="mr-2" />
                <span>Profile</span>
              </button>
            </Link>
          </>
        );
      } else if (data.role === "Client") {
        return (
          <>
            <Link to="/planner-request">
              <button className="bg-[#504ee0] flex items-center rounded-md h-8 px-2 hover:bg-[#6563d4]  text-white">
                <FaUser className="mr-2" />
                <span>Become a Planner</span>
              </button>
            </Link>
            <Link to="/update-profile">
              <button className="bg-gray-500 flex items-center rounded-sm h-8 px-2 hover:bg-gray-600 text-white">
                <FaUser className="mr-2" />
                <span>Profile</span>
              </button>
            </Link>
          </>
        );
      }
    }
    return (
      <>
        <Link to="/login">
          <button className="flex items-center rounded-sm h-8 px-2 text-gray-300 hover:bg-gray-700 hover:text-white">
            <FaSignInAlt className="mr-2" />
            <span>Log In</span>
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 flex items-center rounded-sm h-8 px-2 hover:bg-green-600 text-white">
            <FaUserPlus className="mr-2" />
            <span>Register</span>
          </button>
        </Link>
      </>
    );
  };

  return (
    <div className={sticky ? "sticky top-0 z-50" : ""}>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/">
                      <h6 className="font-extrabold text-lg">
                        <span className="text-white">Event</span>
                        <span className="text-[#DBB610]">Center</span>
                      </h6>
                    </Link>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4 items-center">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center",
                            location.pathname === item.href
                              ? "bg-gray-900 text-white"
                              : ""
                          )}
                          aria-current={
                            location.pathname === item.href ? "page" : undefined
                          }
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-4">
                    {renderLoggedInNav()}
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.icon}
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="px-2 pb-3 pt-2">
                <div className="flex flex-col items-start gap-2">
                  {renderLoggedInNav()}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
