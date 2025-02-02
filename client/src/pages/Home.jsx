// import { Link } from "react-router-dom";
// //import CallToAction from "../components/CallToAction";
// import { useEffect, useState } from "react";
// import PostCard from "../components/PostCard";

// export default function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await fetch("/api/post/getPosts");
//       const data = await res.json();
//       setPosts(data.posts);
//     };
//     fetchPosts();
//   }, []);
//   return (
//     <div>
//       <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
//         <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
//         <p className="text-gray-500 text-xs sm:text-sm">
//           Here you&apos;ll find a variety of articles and tutorials on topics
//           such as web development, software engineering, and programming
//           languages.
//         </p>
//         <Link
//           to="/search"
//           className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
//         >
//           View all posts
//         </Link>
//       </div>
//       {/* <div className="p-3 bg-amber-100 dark:bg-slate-700">
//         <CallToAction />
//       </div> */}

//       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
//         {posts && posts.length > 0 && (
//           <div className="flex flex-col gap-6">
//             <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
//             <div className="flex flex-wrap gap-4">
//               {posts.map((post) => (
//                 <PostCard key={post._id} post={post} />
//               ))}
//             </div>
//             <Link
//               to={"/search"}
//               className="text-lg text-teal-500 hover:underline text-center"
//             >
//               View all posts
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PostCard from "../components/PostCard";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const mainContentRef = useRef(null);

  const handleExplore = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="text-black dark:text-white">
      {/* Initial View */}
      <div className="h-screen relative bg-violet-100/50 dark:bg-black pointer-events-none">
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage:
              'url("https://i.pinimg.com/originals/b8/ba/79/b8ba798cc393f599e41b7d2a52ea0ee2.gif")',

            // 'url("https://gifsec.com/wp-content/uploads/2022/11/purple-anime-gif-7.gif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8">
          <h1 className="text-8xl font-light tracking-wider">Harmonia</h1>
          <button
            onClick={handleExplore}
            className="flex flex-col items-center gap-2 group transition-all duration-300 hover:opacity-80 pointer-events-auto"
          >
            <span className="text-sm tracking-widest">EXPLORE</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section
        ref={mainContentRef}
        className="min-h-screen bg-violet-100 relative"
      >
        {/* Main Content */}
        <div className="relative h-screen">
          {/* Blog Posts */}
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">
                Recent Posts
              </h2>
              {posts && posts.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">No posts available.</p>
              )}
              <a
                href="/search"
                className="text-lg text-teal-500 hover:underline text-center"
              >
                View all posts
              </a>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/20 transform -rotate-45 origin-top z-[-1]" />
          <div className="absolute top-1/4 left-24 space-y-4 pointer-events-none">
            <h1 className="text-7xl font-light">
              Create
              <br />
              <span className="ml-24">Destroy</span>
            </h1>
          </div>
          <div className="absolute top-1/3 right-24 max-w-md pointer-events-none">
            <p className="text-lg text-gray-300 mb-16">
              The Brigade is a digital agency. We create moments for people that
              forge indelible bonds with our clients.
            </p>
          </div>
        </div>

        {/* Background Image Overlay */}
        {/* <div
          className="absolute inset-0 z-[-1] opacity-50"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
      </section>
    </div>
  );
}

export default App;
