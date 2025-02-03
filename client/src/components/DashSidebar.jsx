import { Sidebar } from "flowbite-react";
import {
  HiUser,
  // HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiChatAlt2,
  HiBookmark,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { signoutSuccess } from "../redux/user/userSlice";
//import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function DashSidebar() {
  const location = useLocation();
  //const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch("/api/user/signout", {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       dispatch(signoutSuccess());
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <Sidebar className="w-full md:w-56 dark:!g-black">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                className={
                  tab === "dash" || !tab
                    ? "bg-violet-200 dark:bg-violet-800"
                    : "bg-white dark:bg-black"
                }
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              className={
                tab === "profile" || !tab
                  ? "bg-violet-200 dark:bg-violet-800"
                  : "bg-white dark:bg-black"
              }
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {/* <Link to="/dashboard?tab=savedposts">
            <Sidebar.Item
              active={tab === "savedposts"}
              icon={HiBookmark}
              className={
                tab === "savedposts" || !tab
                  ? "bg-violet-200 dark:bg-violet-800"
                  : "bg-white dark:bg-black"
              }
              as="div"
            >
              Saved Posts
            </Sidebar.Item>
          </Link> */}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                className={
                  tab === "posts" || !tab
                    ? "bg-violet-200 dark:bg-violet-800"
                    : "bg-white dark:bg-black"
                }
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  className={
                    tab === "users" || !tab
                      ? "bg-violet-200 dark:bg-violet-800"
                      : "bg-white dark:bg-black"
                  }
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments" || !tab}
                icon={HiAnnotation}
                className={
                  tab === "comments" || !tab
                    ? "bg-violet-200 dark:bg-violet-800"
                    : "bg-white dark:bg-black"
                }
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <div className="border-t border-gray-300 dark:border-black my-2" />{" "}
          {/* Add border */}
          <div className="px-4 py-2 text-lg text-center font-semibold text-violet-700">
            ANALYTICS
          </div>
          <Link to="/dashboard?tab=savedposts">
            <Sidebar.Item
              active={tab === "savedposts"}
              icon={HiBookmark}
              className={
                tab === "savedposts" || !tab
                  ? "bg-violet-200 dark:bg-violet-800"
                  : "bg-white dark:bg-black"
              }
              as="div"
            >
              Saved Posts
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=postedcomments">
            <Sidebar.Item
              active={tab === "postedcomments"}
              icon={HiChatAlt2}
              className={
                tab === "postedcomments" || !tab
                  ? "bg-violet-200 dark:bg-violet-800"
                  : "bg-white dark:bg-black"
              }
              as="div"
            >
              Posted Comments
            </Sidebar.Item>
          </Link>
          {/* <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer mt-[150px] bg-violet-50 dark:!bg-transparent hover:bg-violet-100 border border-violet-200 dark:border-gray-600 transition-all duration-300 hover:scale-105"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
