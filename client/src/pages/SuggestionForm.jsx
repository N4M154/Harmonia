// import { useState } from "react";
// import { useSelector } from "react-redux";

// const SuggestionForm = () => {
//   const { currentUser } = useSelector((state) => state.user); // Get the current user from the Redux state
//   const [subject, setSubject] = useState("feature"); // Default subject is 'feature'
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Handle subject change
//   const handleSubjectChange = (e) => {
//     setSubject(e.target.value);
//   };

//   // Handle content change
//   const handleContentChange = (e) => {
//     setContent(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (content.trim() === "") {
//       setMessage("Please provide some content for your suggestion.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`/api/sug/suggestions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
//         },
//         body: JSON.stringify({
//           userId: currentUser._id, // Pass the user ID from the Redux state
//           subject,
//           content,
//         }),
//       });

//       if (res.ok) {
//         setMessage("Your suggestion has been submitted successfully!");
//         setContent(""); // Clear content after submission
//       } else {
//         setMessage("Something went wrong, please try again later.");
//       }
//     } catch (error) {
//       setMessage("Something went wrong, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Submit Your Music Idea or Feature Suggestion
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Subject Selection */}
//         <div>
//           <label className="block text-lg font-semibold" htmlFor="subject">
//             Choose a subject:
//           </label>
//           <select
//             id="subject"
//             value={subject}
//             onChange={handleSubjectChange}
//             className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="feature">Feature Suggestion</option>
//             <option value="blog topic">Blog Topic</option>
//           </select>
//         </div>

//         {/* Content Box */}
//         <div>
//           <label className="block text-lg font-semibold" htmlFor="content">
//             Your Suggestion:
//           </label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={handleContentChange}
//             rows="4"
//             className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Write your suggestion here..."
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Suggestion"}
//         </button>
//       </form>

//       {/* Message After Submission */}
//       {message && (
//         <p className="mt-4 text-center text-lg font-semibold">{message}</p>
//       )}
//     </div>
//   );
// };

// export default SuggestionForm;

// import { useState } from "react";
// import { useSelector } from "react-redux";

// const SuggestionForm = () => {
//   const { currentUser } = useSelector((state) => state.user); // Get the current user from the Redux state
//   const [subject, setSubject] = useState("feature"); // Default subject is 'feature'
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const maxCharacters = 500; // Maximum character limit

//   // Handle subject change
//   const handleSubjectChange = (e) => {
//     setSubject(e.target.value);
//   };

//   // Handle content change
//   const handleContentChange = (e) => {
//     if (e.target.value.length <= maxCharacters) {
//       setContent(e.target.value);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (content.trim() === "") {
//       setMessage("Please provide some content for your suggestion.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`/api/sug/suggestions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
//         },
//         body: JSON.stringify({
//           userId: currentUser._id, // Pass the user ID from the Redux state
//           subject,
//           content,
//         }),
//       });

//       if (res.ok) {
//         setMessage("Your suggestion has been submitted successfully!");
//         setContent(""); // Clear content after submission
//       } else {
//         setMessage("Something went wrong, please try again later.");
//       }
//     } catch (error) {
//       setMessage("Something went wrong, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Submit Your Music Idea or Feature Suggestion
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Subject Selection */}
//         <div>
//           <label className="block text-lg font-semibold" htmlFor="subject">
//             Choose a subject:
//           </label>
//           <select
//             id="subject"
//             value={subject}
//             onChange={handleSubjectChange}
//             className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="feature">Feature Suggestion</option>
//             <option value="blog topic">Blog Topic</option>
//           </select>
//         </div>

//         {/* Content Box */}
//         <div>
//           <label className="block text-lg font-semibold" htmlFor="content">
//             Your Suggestion:
//           </label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={handleContentChange}
//             rows="4"
//             className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Write your suggestion here..."
//           />
//           <div className="text-right text-sm mt-1 text-gray-500">
//             {maxCharacters - content.length} characters remaining
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Suggestion"}
//         </button>
//       </form>

//       {/* Message After Submission */}
//       {message && (
//         <p className="mt-4 text-center text-lg font-semibold">{message}</p>
//       )}
//     </div>
//   );
// };

// export default SuggestionForm;

import { useState } from "react";
import { useSelector } from "react-redux";
import { Lightbulb } from "lucide-react";

const SuggestionForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [subject, setSubject] = useState("feature");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLightOn, setIsLightOn] = useState(false);
  const maxCharacters = 500;

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      setMessage("Please provide some content for your suggestion.");
      return;
    }

    setLoading(true);
    setIsLightOn(true);

    try {
      const res = await fetch(`/api/sug/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: currentUser._id,
          subject,
          content,
        }),
      });

      if (res.ok) {
        setMessage("Your suggestion has been submitted successfully!");
        setContent("");
        // Keep the light on for 3 seconds after successful submission
        setTimeout(() => {
          setIsLightOn(false);
        }, 3000);
      } else {
        setMessage("Something went wrong, please try again later.");
        setIsLightOn(false);
      }
    } catch (error) {
      setMessage("Something went wrong, please try again later.");
      setIsLightOn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black py-12">
      <div className="max-w-xl mx-auto p-6 relative">
        {/* Animated Light Bulb */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 transition-all duration-300">
          <Lightbulb
            className={`w-[70px] h-[70px] transition-colors duration-500 ${
              isLightOn
                ? "text-yellow-200 drop-shadow-[0_0_14px_rgba(255,234,0,1)]"
                : "text-violet-400"
            }`}
          />
        </div>

        <div className="bg-transparent dark:bg-[#18181b] rounded-xl shadow-xl shadow-black/60 dark:shadow-gray-500/50 p-8 mt-10">
          <h2 className="text-3xl font-thin mb-6 text-center text-black dark:text-violet-400 bg-clip-text ">
            Share Your Brilliant Idea
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-lg font-thin text-violet-800 dark:text-violet-400"
                htmlFor="subject"
              >
                Regarding
              </label>
              <select
                id="subject"
                value={subject}
                onChange={handleSubjectChange}
                className="w-full p-3 border border-gray-300 bg-violet-200 dark:bg-violet-300 rounded-lg shadow-md shadow-black/40 dark:shadow-violet-700/80 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
              >
                <option value="feature">✨ Feature</option>
                <option value="blog topic">📝 Blog</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                className="block text-lg font-thin text-violet-800 dark:text-violet-400"
                htmlFor="content"
              >
                Your Suggestion
              </label>
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                rows="6"
                className="w-full p-3 border bg-violet-100 dark:bg-violet-200 border-violet-300 rounded-lg shadow-md shadow-black/40 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-shadow text-black"
                placeholder="Describe your amazing idea here..."
              />
              <div className="flex justify-between text-sm text-violet-500 dark:text-gray-300/60">
                <span>Be creative and detailed!</span>
                <span>
                  {maxCharacters - content.length} characters remaining
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-400 to-violet-600 hover:from-violet-600 hover:to-violet-600 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/50"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Share Your Idea"
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg text-center font-medium ${
                message.includes("successfully")
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionForm;
