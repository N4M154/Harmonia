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

import { useState } from "react";
import { useSelector } from "react-redux";

const SuggestionForm = () => {
  const { currentUser } = useSelector((state) => state.user); // Get the current user from the Redux state
  const [subject, setSubject] = useState("feature"); // Default subject is 'feature'
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const maxCharacters = 500; // Maximum character limit

  // Handle subject change
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Handle content change
  const handleContentChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setContent(e.target.value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      setMessage("Please provide some content for your suggestion.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/sug/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          userId: currentUser._id, // Pass the user ID from the Redux state
          subject,
          content,
        }),
      });

      if (res.ok) {
        setMessage("Your suggestion has been submitted successfully!");
        setContent(""); // Clear content after submission
      } else {
        setMessage("Something went wrong, please try again later.");
      }
    } catch (error) {
      setMessage("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Submit Your Music Idea or Feature Suggestion
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Selection */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="subject">
            Choose a subject:
          </label>
          <select
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="feature">Feature Suggestion</option>
            <option value="blog topic">Blog Topic</option>
          </select>
        </div>

        {/* Content Box */}
        <div>
          <label className="block text-lg font-semibold" htmlFor="content">
            Your Suggestion:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            rows="4"
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your suggestion here..."
          />
          <div className="text-right text-sm mt-1 text-gray-500">
            {maxCharacters - content.length} characters remaining
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Suggestion"}
        </button>
      </form>

      {/* Message After Submission */}
      {message && (
        <p className="mt-4 text-center text-lg font-semibold">{message}</p>
      )}
    </div>
  );
};

export default SuggestionForm;
