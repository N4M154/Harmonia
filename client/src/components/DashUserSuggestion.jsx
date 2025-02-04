// import { useState } from "react";

// const DashUserSuggestion = () => {
//   const [loading, setLoading] = useState(false);
//   const [userSuggestions, setUserSuggestions] = useState([]);
//   const [error, setError] = useState(null);

//   const handleFetchUserSuggestions = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/sug/user-suggestions", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setUserSuggestions(data); // Set the user's suggestions
//       } else {
//         setError("Failed to fetch your suggestions.");
//       }
//     } catch (err) {
//       setError("Something went wrong, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">Your Suggestions</h2>

//       {/* Button to Fetch User's Suggestions */}
//       <button
//         onClick={handleFetchUserSuggestions}
//         className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
//       >
//         {loading ? "Loading..." : "Show My Suggestions"}
//       </button>

//       {/* Display User's Suggestions */}
//       {error && <p className="mt-4 text-center text-red-600">{error}</p>}

//       {userSuggestions.length > 0 ? (
//         <div className="mt-6">
//           <ul className="space-y-4">
//             {userSuggestions.map((suggestion) => (
//               <li key={suggestion._id} className="p-4 border rounded-md">
//                 <h3 className="font-semibold">{suggestion.subject}</h3>
//                 <p>{suggestion.content}</p>
//                 <p className="text-sm text-gray-500">
//                   Suggested on {new Date(suggestion.date).toLocaleDateString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="mt-4 text-center">
//           You haven&apos;t submitted any suggestions yet.
//         </p>
//       )}
//     </div>
//   );
// };

// export default DashUserSuggestion;

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const DashUserSuggestion = () => {
  const [loading, setLoading] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetchUserSuggestions();
  }, []);

  const fetchUserSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/sug/user-suggestions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserSuggestions(data);
      } else {
        setError("Failed to fetch your suggestions.");
      }
    } catch (err) {
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (content) => {
    setSelectedContent(content);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedContent(null);
    document.body.style.overflow = "unset";
  };

  // Function to add line breaks after every n characters (80 characters in this case)
  const formatContentWithLineBreaks = (content, charsPerLine = 80) => {
    let formattedContent = "";
    let currentLine = "";

    for (let i = 0; i < content.length; i++) {
      currentLine += content[i];
      // Add line break after every 80 characters
      if (currentLine.length === charsPerLine) {
        formattedContent += currentLine + "\n";
        currentLine = "";
      }
    }

    // Append any remaining characters if present
    if (currentLine.length > 0) {
      formattedContent += currentLine;
    }

    return formattedContent;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center absolute top-0 left-0 right-0 h-[100vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* <div className="flex items-center justify-center gap-2 mb-6">
        <h2 className="text-3xl text-center font-thin text-violet-700">
          Your Suggestions
        </h2>
      </div> */}

      <div className="overflow-x-auto bg-transparent rounded-lg shadow-lg dark:shadow-gray-500/40 dark:border dark:border-gray-600">
        <table className="min-w-full divide-y divide-violet-200 dark:divide-gray-600">
          <thead className="bg-violet-100 dark:bg-black">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-1/6"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-1/6"
              >
                Content
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-1/6"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-violet-200 dark:divide-gray-600">
            {userSuggestions.length > 0 ? (
              userSuggestions.map((suggestion) => (
                <tr
                  key={suggestion._id}
                  className="hover:bg-violet-100/20 dark:hover:bg-black/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-thin text-black dark:text-white">
                      {suggestion.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black dark:text-white">
                      {suggestion.content.length > 40 ? (
                        <div>
                          <p>{suggestion.content.slice(0, 40)}...</p>
                          <button
                            onClick={() => openModal(suggestion.content)}
                            className="mt-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-600 hover:underline text-sm font-thin"
                          >
                            Show more
                          </button>
                        </div>
                      ) : (
                        suggestion.content
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-thin text-gray-400">
                      {new Date(suggestion.date).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-sm text-black dark:text-white"
                >
                  You haven&apos;t submitted any suggestions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-violet-50 dark:bg-black bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#18181b] border border-violet-300 dark:border-violet-700/40 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-thin text-violet-700 dark:text-violet-400">
                  Content
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="prose max-w-none">
                <p className="text-black dark:text-[#f5f5f5] font-thin whitespace-pre-wrap">
                  {formatContentWithLineBreaks(selectedContent)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashUserSuggestion;
