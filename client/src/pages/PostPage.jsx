// import { Button, Spinner } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// //import CallToAction from "../components/CallToAction";
// import CommentSection from "../components/CommentSection";
// import PostCard from "../components/PostCard";
// import { FaRegBookmark, FaBookmark } from "react-icons/fa";

// export default function PostPage() {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [post, setPost] = useState(null);
//   const [recentPosts, setRecentPosts] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//         const data = await res.json();
//         if (!res.ok) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         if (res.ok) {
//           setPost(data.posts[0]);
//           setLoading(false);
//           setError(false);
//         }
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [postSlug]);

//   useEffect(() => {
//     try {
//       const fetchRecentPosts = async () => {
//         const res = await fetch(`/api/post/getposts?limit=3`);
//         const data = await res.json();
//         if (res.ok) {
//           setRecentPosts(data.posts);
//         }
//       };
//       fetchRecentPosts();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }, []);

//   useEffect(() => {
//     // Fetch if the post is already saved
//     const fetchSavedStatus = async () => {
//       try {
//         const res = await fetch(`/api/post/savedPost/${post._id}`);
//         const data = await res.json();
//         if (data.isSaved) {
//           setIsSaved(true);
//         }
//       } catch (error) {
//         console.error("Error fetching saved status:", error);
//       }
//     };

//     if (post) {
//       fetchSavedStatus();
//     }
//   }, [post]);

//   const handleSavePost = async () => {
//     const res = await fetch(`/api/post/save`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ postId: post._id }),
//     });
//     if (res.ok) {
//       setIsSaved(true);
//     }
//   };

//   const handleUnsavePost = async () => {
//     const res = await fetch(`/api/post/unsave/${post._id}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       setIsSaved(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen dark:bg-black">
//         <Spinner size="xl" />
//       </div>
//     );
//   return (
//     <div className=" bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black">
//       {" "}
//       <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
//         <div className="flex flex-col items-center justify-center">
//           <h1 className="text-3xl mt-10 p-3 font-thin max-w-2xl mx-auto lg:text-4xl dark:text-violet-300 flex justify-between items-center">
//             <span className="mr-5">{post && post.title}</span>
//             <button
//               className="mt-3"
//               onClick={isSaved ? handleUnsavePost : handleSavePost}
//               title={
//                 isSaved
//                   ? "Psst!You've already saved this.Unsave?"
//                   : "Save it for later"
//               }
//               // className={`px-4 py-2 rounded-full text-white ${
//               //   isSaved ? "bg-red-500" : "bg-green-500"
//               // }`}
//             >
//               {/* Use the icon instead of text */}
//               {isSaved ? (
//                 <FaBookmark className="h-7 w-7 text-red-500 hover:scale-110 transition-all duration-300" />
//               ) : (
//                 <FaRegBookmark className="h-7 w-7 text-green-700 hover:scale-110 transition-all duration-300" />
//               )}
//             </button>
//           </h1>
//           <Link
//             to={`/search?category=${post && post.category}`}
//             className="self-center mt-5"
//           >
//             <button className="w-full sm:w-auto font-thin bg-violet-100 dark:bg-gray-500/40 hover:bg-violet-400/40 dark:hover:bg-gray-600/40 border border-gray-400/40 text-black dark:text-white/70 px-2 py-1 rounded-full text-[10px]">
//               {post && post.category}
//             </button>
//           </Link>
//         </div>

//         <div>
//           {/* <Link
//             to={`/search?category=${post && post.category}`}
//             className="self-center mt-5"
//           >
//             <Button color="gray" pill size="xs">
//               {post && post.category}
//             </Button>
//           </Link> */}
//           <img
//             src={post && post.image}
//             alt={post && post.title}
//             className="mt-10 p-3 max-h-[600px] w-full object-cover"
//           />
//           <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs dark:text-gray-300">
//             <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
//             <span className="italic">
//               {post && (post.content.length / 1000).toFixed(0)} mins read
//             </span>
//           </div>
//           <div
//             className="p-3 max-w-2xl mx-auto w-full post-content dark:text-white font-thin"
//             dangerouslySetInnerHTML={{ __html: post && post.content }}
//           ></div>
//           <div className="max-w-4xl mx-auto w-full">
//             {/* <CallToAction /> */}
//           </div>
//           <CommentSection postId={post._id} />

//           <div className="flex flex-col justify-center items-center mb-5">
//             <h1 className="text-xl mt-5 font-thin">Recent articles</h1>
//             <div className="flex flex-wrap gap-5 mt-5 justify-center">
//               {recentPosts &&
//                 recentPosts.map((post) => (
//                   <PostCard key={post._id} post={post} />
//                 ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
//-----------------------------------------------------------------------------------------------------custom tooltip
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    // Fetch if the post is already saved
    const fetchSavedStatus = async () => {
      try {
        const res = await fetch(`/api/post/savedPost/${post._id}`);
        const data = await res.json();
        if (data.isSaved) {
          setIsSaved(true);
        }
      } catch (error) {
        console.error("Error fetching saved status:", error);
      }
    };

    if (post) {
      fetchSavedStatus();
    }
  }, [post]);

  const handleSavePost = async () => {
    const res = await fetch(`/api/post/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: post._id }),
    });
    if (res.ok) {
      setIsSaved(true);
    }
  };

  const handleUnsavePost = async () => {
    const res = await fetch(`/api/post/unsave/${post._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setIsSaved(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-black">
        <Spinner size="xl" />
      </div>
    );
  return (
    <div className=" bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black">
      {" "}
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mt-10 p-3 font-thin max-w-2xl mx-auto lg:text-4xl dark:text-violet-300 flex justify-between items-center">
            <span className="mr-5">{post && post.title}</span>
            <button
              className="relative mt-3 group"
              onClick={isSaved ? handleUnsavePost : handleSavePost}
              aria-label={
                isSaved
                  ? "Psst! You've already saved this. Unsave?"
                  : "Save it for later"
              }
            >
              {isSaved ? (
                <FaBookmark className="h-7 w-7 text-red-500 hover:scale-110 transition-all duration-300" />
              ) : (
                <FaRegBookmark className="h-7 w-7 text-green-700 hover:scale-110 transition-all duration-300" />
              )}
              {/* Custom Tooltip */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="relative bg-violet-100 text-violet-800 dark:bg-violet-500/40 dark:text-violet-100 px-3 py-1.5 text-sm font-thin rounded-lg border border-violet-200 dark:border-violet-700 shadow-lg whitespace-nowrap">
                  <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-violet-100 dark:bg-violet-900 border-t border-l border-violet-200 dark:border-violet-700 rotate-45"></div>
                  {isSaved
                    ? "Psst! You've already saved this. Unsave?"
                    : "Save it for later"}
                </div>
              </div>
            </button>
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <button className="w-full sm:w-auto font-thin bg-violet-100 dark:bg-gray-500/40 hover:bg-violet-400/40 dark:hover:bg-gray-600/40 border border-gray-400/40 text-black dark:text-white/70 px-2 py-1 rounded-full text-[10px]">
              {post && post.category}
            </button>
          </Link>
        </div>

        <div>
          {/* <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link> */}
          <img
            src={post && post.image}
            alt={post && post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs dark:text-gray-300">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content dark:text-white font-thin"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
          <div className="max-w-4xl mx-auto w-full">
            {/* <CallToAction /> */}
          </div>
          <CommentSection postId={post._id} />

          <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl mt-5 font-thin">Recent articles</h1>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {recentPosts &&
                recentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
