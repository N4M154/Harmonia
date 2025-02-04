import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import DashSavedPosts from "../components/DashSavedPosts";
import DashPostedComments from "../components/DashPostedComments";
import DashSuggestion from "../components/DashSuggestion";
import DashUserSuggestion from "../components/DashUserSuggestion";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-[#18181b]">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* posts... */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments  */}
      {tab === "comments" && <DashComments />}
      {/* dashboard comp */}
      {tab === "dash" && <DashboardComp />}
      {/* savedposts by users */}
      {tab === "savedposts" && <DashSavedPosts />}
      {/* postedcomments by users */}
      {tab === "postedcomments" && <DashPostedComments />}
      {/* suggestions */}
      {tab === "suggestions" && <DashSuggestion />}
      {/* suggestions per user*/}
      {tab === "usersuggestions" && <DashUserSuggestion />}
    </div>
  );
}
