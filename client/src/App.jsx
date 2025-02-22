import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
//import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import SuggestionForm from "./pages/SuggestionForm";
import LyricCardMaker from "./pages/LyricCardMaker";
import Mood from "./pages/MoodBasedPlaylistGenerator";
import Song from "./pages/Upload";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/suggest" element={<SuggestionForm />} />
          <Route path="/lyric-card" element={<LyricCardMaker />} />
          <Route path="/music" element={<Mood />} />
          <Route path="/upload" element={<Song />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
