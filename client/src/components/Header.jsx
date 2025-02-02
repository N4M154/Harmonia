import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
// import { toggleTheme } from "../redux/theme/themeSlice";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Detect window resize to update isCollapsed state
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <Navbar className="border-b-2 border-violet-200 dark:border-gray-800 bg-violet-100 dark:bg-[#18181b]">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="text-violet-500 dark:text-[#29oc5e]">N4M154</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className="w-12 h-10 lg:hidden bg-violet-200 text-black hover:!bg-violet-400 dark:bg-violet-400 dark:hover:!bg-violet-500"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2 mr-10">
        <ThemeToggle />
        {/* <Button
           className="w-12 h-10 hidden sm:inline"
          color="gray"
           pill
           onClick={() => dispatch(toggleTheme())}
         >
           {theme === "light" ? <FaSun /> : <FaMoon />}
         </Button> */}
        {currentUser ? (
          <div className="relative">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
              className="bg-violet-50 dark:bg-[#18181b]"
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item className="hover:!bg-violet-200 dark:hover:!bg-violet-700/40">
                  Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item
                className="hover:!bg-violet-200 dark:hover:!bg-violet-700/40"
                onClick={handleSignout}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <Link to="/sign-in">
            <div>
              <Button className="bg-violet-400 dark:bg-[#29oc5e] text-black hover:!bg-violet-950/20 dark:hover:!bg-violet-700">
                Sign In
              </Button>
            </div>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse className="bg-transparent">
         <Navbar.Link active={path === "/"} as={"div"}>
           <Link to="/">Home</Link>
         </Navbar.Link>
         <Navbar.Link active={path === "/about"} as={"div"}>
           <Link to="/about">About</Link>
         </Navbar.Link>
         <Navbar.Link active={path === "/projects"} as={"div"}>
           <Link to="/projects">Projects</Link>
         </Navbar.Link>
       </Navbar.Collapse> */}

      {/* Navbar Links - Handles Collapsed and Full-Width Modes */}
      <Navbar.Collapse className="bg-transparent">
        <Navbar.Link
          active={path === "/"}
          as={"div"}
          className={`
            px-3 py-2 rounded-md transition-colors duration-300
            ${isCollapsed ? "text-black dark:text-white" : ""}
            ${
              path === "/"
                ? "bg-violet-300 text-white dark:bg-violet-400"
                : "text-gray-700 hover:bg-violet-300/20 dark:text-gray-300 dark:hover:bg-violet-100/20"
            }
          `}
        >
          <Link to="/" className="w-full h-full block bg-transparent">
            Home
          </Link>
        </Navbar.Link>

        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          className={`
            px-3 py-2 rounded-md transition-colors duration-300 
            ${isCollapsed ? "text-black dark:text-white" : ""}
            ${
              path === "/about"
                ? "bg-violet-300 text-white dark:bg-violet-400"
                : "text-gray-700 hover:bg-violet-300/20 dark:text-gray-300 dark:hover:bg-violet-100/20"
            }
          `}
        >
          <Link to="/about" className="w-full h-full block">
            About
          </Link>
        </Navbar.Link>

        {/* <Navbar.Link
           active={path === "/projects"}
           as={"div"}
           className={
            path === "/projects"
               ? "bg-violet-300 text-black dark:bg-violet-400/50 rounded-md px-3 py-2"
               : "bg-transparent text-gray-700 hover:bg-opacity-50 rounded-md px-3 py-2"
           }
         >
           <Link to="/projects">Projects</Link>
         </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
