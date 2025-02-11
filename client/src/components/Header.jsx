import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { HiHome } from "react-icons/hi2";
import {
  Lightbulb,
  LogOut,
  Plus,
  ChevronDown,
  Telescope,
  Music2,
  Shuffle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState, useRef } from "react";
// import { toggleTheme } from "../redux/theme/themeSlice";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  //const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Detect window resize to update isCollapsed state
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsCollapsed(window.innerWidth < 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // return (
  //   <Navbar className="border-b-2 border-violet-200 dark:border-gray-800 bg-violet-100 dark:bg-[#18181b]">
  //     <Link
  //       to="/home"
  //       className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center"
  //     >
  //       <span className="text-violet-700 font-thin dark:text-violet-300 mr-5 ml-5">
  //         N4M154
  //       </span>
  //       <ThemeToggle />
  //     </Link>
  //     <form onSubmit={handleSubmit}>
  //       <TextInput
  //         type="text"
  //         placeholder="Search..."
  //         rightIcon={AiOutlineSearch}
  //         className="hidden lg:inline"
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //       />
  //     </form>
  //     <Button
  //       className="w-12 h-10 lg:hidden bg-violet-200 text-black hover:!bg-violet-400 dark:bg-violet-400 dark:hover:!bg-violet-500"
  //       pill
  //     >
  //       <AiOutlineSearch />
  //     </Button>
  //     <div className="flex gap-2 md:order-2 mr-10">
  //       {/* <Button
  //        className="w-12 h-10 hidden sm:inline"
  //       color="gray"
  //        pill
  //        onClick={() => dispatch(toggleTheme())}
  //      >
  //        {theme === "light" ? <FaSun /> : <FaMoon />}
  //      </Button> */}
  //       {currentUser ? (
  //         <div className="relative">
  //           <Dropdown
  //             arrowIcon={false}
  //             inline
  //             label={
  //               <Avatar alt="user" img={currentUser.profilePicture} rounded />
  //             }
  //             className="bg-violet-50 dark:bg-[#18181b]"
  //           >
  //             <Dropdown.Header>
  //               <span className="block text-sm">@{currentUser.username}</span>
  //               <span className="block text-sm font-medium truncate">
  //                 {currentUser.email}
  //               </span>
  //             </Dropdown.Header>
  //             <Link to={"/dashboard?tab=profile"}>
  //               <Dropdown.Item className="hover:!bg-violet-200 dark:hover:!bg-violet-700/40">
  //                 Profile
  //               </Dropdown.Item>
  //             </Link>
  //             <Dropdown.Divider />
  //             <Dropdown.Item
  //               className="hover:!bg-violet-200 dark:hover:!bg-violet-700/40"
  //               onClick={handleSignout}
  //             >
  //               Sign out
  //             </Dropdown.Item>
  //           </Dropdown>
  //         </div>
  //       ) : (
  //         <Link to="/sign-in">
  //           <div>
  //             <Button className="bg-violet-400 dark:bg-[#29oc5e] text-black hover:!bg-violet-950/20 dark:hover:!bg-violet-700">
  //               Sign In
  //             </Button>
  //           </div>
  //         </Link>
  //       )}
  //       <Navbar.Toggle />
  //     </div>
  //     {/* <Navbar.Collapse className="bg-transparent">
  //      <Navbar.Link active={path === "/"} as={"div"}>
  //        <Link to="/">Home</Link>
  //      </Navbar.Link>
  //      <Navbar.Link active={path === "/about"} as={"div"}>
  //        <Link to="/about">About</Link>
  //      </Navbar.Link>
  //      <Navbar.Link active={path === "/projects"} as={"div"}>
  //        <Link to="/projects">Projects</Link>
  //      </Navbar.Link>
  //    </Navbar.Collapse> */}

  //     {/* Navbar Links - Handles Collapsed and Full-Width Modes */}
  //     <Navbar.Collapse className="bg-transparent">
  //       <Navbar.Link
  //         active={path === "/home"}
  //         as={"div"}
  //         className={`
  //         px-3 py-2 rounded-md transition-colors duration-300 font-thin text-[17px]
  //         ${
  //           isCollapsed
  //             ? "text-black dark:text-white"
  //             : "!text-black dark:!text-white"
  //         }
  //         ${
  //           path === "/home"
  //             ? "bg-violet-300 text-white"
  //             : "text-gray-700 hover:bg-violet-300/20 dark:!text-gray-300 dark:hover:bg-violet-100/20"
  //         }
  //         ${
  //           !isCollapsed && path === "/home"
  //             ? "!text-violet-700 dark:!text-violet-500 !font-semibold !scale-110 transition-all duration-300"
  //             : "!text-black dark:hover:!text-violet-700 hover:!text-violet-950 hover:!font-semibold hover:!scale-110 transition-all duration-300"
  //         }
  //       `}
  //       >
  //         <Link to="/home" className="w-full h-full block bg-transparent">
  //           <HiHome className="text-2xl" />
  //         </Link>
  //       </Navbar.Link>

  //       <Navbar.Link
  //         active={path === "/about"}
  //         as={"div"}
  //         className={`
  //         px-3 py-2 rounded-md transition-colors duration-300 font-thin text-[17px]
  //         ${
  //           isCollapsed
  //             ? "text-black dark:text-white"
  //             : "!text-black dark:!text-white"
  //         }
  //         ${
  //           path === "/about"
  //             ? "bg-violet-300 text-white"
  //             : "text-gray-700 hover:bg-violet-300/20 dark:!text-gray-300 dark:hover:bg-violet-100/20"
  //         }
  //         ${
  //           !isCollapsed && path === "/about"
  //             ? "!text-violet-700 dark:!text-violet-500 !font-semibold !scale-105 transition-all duration-300"
  //             : "!text-black dark:hover:!text-violet-700 hover:!text-violet-950 hover:!font-semibold hover:!scale-105 transition-all duration-300"
  //         }
  //       `}
  //       >
  //         <Link to="/about" className="w-full h-full block bg-transparent">
  //           About
  //         </Link>
  //       </Navbar.Link>

  //       {/* <Navbar.Link
  //        active={path === "/projects"}
  //        as={"div"}
  //        className={
  //         path === "/projects"
  //            ? "bg-violet-300 text-black dark:bg-violet-400/50 rounded-md px-3 py-2"
  //            : "bg-transparent text-gray-700 hover:bg-opacity-50 rounded-md px-3 py-2"
  //        }
  //      >
  //        <Link to="/projects">Projects</Link>
  //      </Navbar.Link> */}
  //     </Navbar.Collapse>
  //   </Navbar>
  // );

  return (
    <Navbar
      className={`dark:border-gray-800 bg-violet-100 dark:bg-[#18181b] ${
        path === "/home"
          ? "sticky top-0 z-50 backdrop-blur-md transition-all duration-300 bg-violet-300/40 dark:bg-black/90"
          : ""
      }`}
    >
      {/* Left side - Logo and Theme Toggle */}
      <div className="flex items-center">
        <Link
          to="/home"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center"
        >
          <span className="text-violet-700 text-[18px] font-thin dark:text-violet-300 mr-5 ml-5">
            Harmonia
          </span>
        </Link>
        <ThemeToggle />
        {currentUser.isAdmin && (
          <Link to="/create-post">
            <div className="relative group">
              <Button
                type="button"
                className="group relative ml-5 mr-5 w-10 h-10 rounded-full !bg-violet-400 border-2 dark:!border-violet-800 !border-violet-600/50 !text-violet-800 !shadow-lg hover:!shadow-xl hover:!shadow-black/60 !shadow-black/40 dark:!shadow-gray-600 dark:hover:!shadow-gray-600 hover:!scale-110 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-tr from-violet-300/0 to-violet-300/30 dark:from-white/0 dark:to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Plus className="w-6 h-6 -my-[3px] transform group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" />
                <span className="absolute -inset-full group-hover:inset-0 bg-gradient-to-r from-violet-400/0 via-white/10 to-violet-400/0 group-hover:-translate-x-full transition-all duration-1000 ease-out" />
              </Button>
              {/* Tooltip positioned on the right */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 -ml-3 hidden group-hover:block">
                <div className="relative bg-violet-200 text-violet-800 font-thin dark:bg-violet-900 dark:text-violet-100 px-3 py-1.5 text-sm rounded-xl border border-violet-300 dark:border-violet-700 shadow-lg">
                  {/* Arrow pointing to the left */}
                  <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-violet-200 dark:bg-violet-900 border-t border-l border-violet-400 dark:border-violet-700 rotate-45"></div>
                  new post
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
      {/* Search (hidden on mobile) */}
      <form
        onSubmit={handleSubmit}
        className="flex-grow justify-center hidden lg:flex"
      >
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="max-w-md !rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {/* Right side - Navigation and Profile */}
      <div className="flex items-center gap-4 mr-10">
        {/* Mobile Search Button */}
        <Button
          className="w-12 h-10 lg:hidden bg-violet-200 text-black hover:!bg-violet-400 dark:bg-violet-400 dark:hover:!bg-violet-500"
          pill
        >
          <AiOutlineSearch />
        </Button>

        {/* Navigation Links */}
        <Link
          to="/home"
          className={`hidden md:flex items-center px-2 py-1 rounded-md transition-all duration-300
            ${
              path === "/home"
                ? "bg-violet-300/20 text-violet-700 scale-110 dark:text-violet-400 font-semibold"
                : "text-black hover:bg-violet-300/20 hover:text-violet-700 dark:hover:text-violet-400 hover:scale-110 transition-all duration-300 dark:text-gray-300"
            }`}
        >
          <HiHome className="text-2xl mr-1" />
        </Link>

        <Link
          to="/about"
          className={`hidden font-thin md:flex items-center px-2 py-1 rounded-md transition-all duration-300
            ${
              path === "/about"
                ? "bg-violet-300/20 text-violet-700 scale-110 text-sm dark:text-violet-400 font-thin"
                : "text-black hover:bg-violet-300/20 hover:text-violet-700 dark:hover:text-violet-400 text-sm hover:scale-110 transition-all duration-300 dark:text-gray-300"
            }`}
        >
          About
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-thin flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-violet-300 dark:border-violet-900
                   bg-transparent hover:scale-105 transition-all duration-200 hover:bg-violet-300/20 dark:text-white"
          >
            {" "}
            <Telescope className="w-6 h-6 text-violet-500" />
            Explore
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              className="absolute z-10 mt-2 w-48 rounded-md shadow-lg 
                        bg-violet-50 dark:bg-black 
                        border border-violet-200 dark:border-violet-950/70"
            >
              <div className="py-1">
                <Link
                  to="/lyric-card"
                  className="px-4 py-2 text-sm text-black dark:text-white
                         hover:bg-violet-200 dark:hover:bg-violet-700/40 hover:scale-105
                         transition-all duration-200 font-thin flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  Lyric Card Maker
                  <Music2 className="w-5 h-5 text-rose-400 drop-shadow-[0_0_6px_rgba(163,49,83,1)]" />
                </Link>
                <div className="border-t border-violet-200 dark:border-violet-950/70 my-1"></div>
                <Link
                  to="/music"
                  className="px-4 py-2 text-sm text-black dark:text-white
                 hover:bg-violet-200 dark:hover:bg-violet-700/40 hover:scale-105
                 transition-all duration-200 font-thin flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  Mood Based Playlist
                  <Shuffle className="w-5 h-5 text-blue-700 drop-shadow-[0_0_4px_rgba(35,64,145,1)]" />
                </Link>
                <div className="border-t border-violet-200 dark:border-violet-950/70 my-1"></div>
                <Link
                  to="/suggest"
                  className="px-4 py-2 text-sm text-black dark:text-white
                 hover:bg-violet-200 dark:hover:bg-violet-700/40 hover:scale-105
                 transition-all duration-200 font-thin flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  Have a suggestion?
                  <Lightbulb className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_4px_rgba(255,234,0,1)]" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
            className="bg-violet-50 dark:!bg-[#18181b]"
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item className="hover:!bg-violet-200 dark:hover:!bg-violet-700/40">
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            {/* <Link to="/suggest">
              <Dropdown.Item className="hover:!bg-violet-200 dark:hover:!bg-violet-700/40 flex items-center gap-2">
                Have a suggestion?
                <Lightbulb className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_4px_rgba(255,234,0,1)]" />
              </Dropdown.Item>
            </Link>{" "}
            <Dropdown.Divider /> */}
            <Dropdown.Item
              className="flex justify-center items-center hover:scale-110 transition-all duration-300 hover:rounded-full hover:!bg-violet-200 dark:hover:!bg-violet-700/40"
              onClick={handleSignout}
            >
              <LogOut className="w-6 h-6 hover:scale-110 transition-all duration-300" />
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-violet-400 dark:bg-[#29oc5e] text-black hover:!bg-violet-950/20 dark:hover:!bg-violet-700">
              Sign In
            </Button>
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <Navbar.Toggle />
      </div>

      {/* Mobile Menu */}
      <Navbar.Collapse className="md:hidden bg-transparent">
        <Link
          to="/home"
          className={`block px-3 py-2 rounded-md transition-all duration-300
            ${
              path === "/home"
                ? "bg-violet-600/10 text-violet-700 dark:text-violet-400"
                : "text-gray-700 hover:bg-violet-300 hover:scale-105 dark:hover:bg-violet-600/20 hover:text-violet-700 dark:text-gray-300"
            }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`block px-3 py-2 rounded-md transition-all duration-300
            ${
              path === "/about"
                ? "bg-violet-600/10 text-violet-700 dark:text-violet-400"
                : "text-gray-700 hover:bg-violet-300 hover:scale-105 dark:hover:bg-violet-600/20 hover:text-violet-700 dark:text-gray-300"
            }`}
        >
          About
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
