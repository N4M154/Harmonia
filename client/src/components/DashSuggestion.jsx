// import { useState, useEffect } from "react";
// import { X } from "lucide-react";

// const DashSuggestion = () => {
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedContent, setSelectedContent] = useState(null);

//   useEffect(() => {
//     fetchSuggestions();
//   }, []);

//   const fetchSuggestions = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/sug/suggestions", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setSuggestions(data);
//       } else {
//         setError("Failed to fetch suggestions.");
//       }
//     } catch (err) {
//       setError("Something went wrong, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (content) => {
//     setSelectedContent(content);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setSelectedContent(null);
//     document.body.style.overflow = "unset";
//   };

//   // Function to add line breaks after every n characters (80 characters in this case)
//   const formatContentWithLineBreaks = (content, charsPerLine = 80) => {
//     let formattedContent = "";
//     let currentLine = "";

//     for (let i = 0; i < content.length; i++) {
//       currentLine += content[i];
//       // Add line break after every 80 characters
//       if (currentLine.length === charsPerLine) {
//         formattedContent += currentLine + "\n";
//         currentLine = "";
//       }
//     }

//     // Append any remaining characters if present
//     if (currentLine.length > 0) {
//       formattedContent += currentLine;
//     }

//     return formattedContent;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center absolute top-0 left-0 right-0 h-[100vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-700 dark:border-violet-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* <div className="flex items-center justify-center gap-2 mb-6">
//         <h2 className="text-3xl text-center font-thin text-violet-700 dark:text-white">
//           Suggestions
//         </h2>
//       </div> */}

//       <div className="overflow-x-auto bg-transparent rounded-lg shadow-lg dark:shadow-gray-500/40 dark:border dark:border-gray-600">
//         <table className="min-w-full divide-y divide-violet-200 dark:divide-gray-600">
//           <thead className="bg-violet-100 dark:bg-black">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-1/6"
//               >
//                 Subject
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-3/6"
//               >
//                 Content
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-1/6"
//               >
//                 Suggested By
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-violet-700 dark:text-violet-200 uppercase tracking-wider w-1/6"
//               >
//                 Date
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-transparent divide-y divide-violet-200 dark:divide-gray-600">
//             {suggestions.length > 0 ? (
//               suggestions.map((suggestion) => (
//                 <tr
//                   key={suggestion._id}
//                   className="hover:bg-violet-100/20 dark:hover:bg-black/50"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-thin text-black dark:text-white">
//                       {suggestion.subject}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-black dark:text-white">
//                       {suggestion.content.length > 40 ? (
//                         <div>
//                           <p>{suggestion.content.slice(0, 40)}...</p>
//                           <button
//                             onClick={() => openModal(suggestion.content)}
//                             className="mt-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-600 hover:underline text-sm font-thin"
//                           >
//                             Show more
//                           </button>
//                         </div>
//                       ) : (
//                         suggestion.content
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-thin text-gray-500">
//                       {suggestion.user.username}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-thin text-gray-400">
//                       {new Date(suggestion.date).toLocaleDateString()}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="px-6 py-4 text-center text-sm text-black dark:text-white"
//                 >
//                   No suggestions available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {selectedContent && (
//         <div className="fixed inset-0 bg-violet-50 dark:bg-black bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-[#18181b] border border-violet-300 dark:border-violet-700/40 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-thin text-violet-700 dark:text-violet-400">
//                   Content
//                 </h3>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-400 hover:text-gray-500 transition-colors"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="prose max-w-none">
//                 <p className="text-black dark:text-[#f5f5f5] font-thin whitespace-pre-wrap">
//                   {formatContentWithLineBreaks(selectedContent)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashSuggestion;
// -----------------------------------------------------------------------------------------------------both work fine
import { useState, useEffect } from "react";
import { Table, Modal, Button } from "flowbite-react";
import { X } from "lucide-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashSuggestion = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [suggestionIdToDelete, setSuggestionIdToDelete] = useState("");

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sug/suggestions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      } else {
        setError("Failed to fetch suggestions.");
      }
    } catch (err) {
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteSuggestion = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/sug/deletesuggestions/${suggestionIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuggestions((prev) =>
          prev.filter((suggestion) => suggestion._id !== suggestionIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
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

  // Function to add line breaks after every n characters (70 characters in this case)
  const formatContentWithLineBreaks = (content, charsPerLine = 70) => {
    let formattedContent = "";
    let currentLine = "";

    for (let i = 0; i < content.length; i++) {
      currentLine += content[i];
      if (currentLine.length === charsPerLine) {
        formattedContent += currentLine + "\n";
        currentLine = "";
      }
    }

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
    <div className="overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {suggestions.length > 0 ? (
        <Table className="shadow-lg dark:shadow-black">
          <Table.Head>
            <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
              Subject
            </Table.HeadCell>
            <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
              Content
            </Table.HeadCell>
            <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
              Suggested By
            </Table.HeadCell>
            <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
              Date
            </Table.HeadCell>
            <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
              Delete
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {suggestions.map((suggestion) => (
              <Table.Row
                key={suggestion._id}
                className="bg-white dark:border-gray-700 dark:bg-black/10"
              >
                <Table.Cell className="dark:text-gray-200">
                  {suggestion.subject}
                </Table.Cell>
                <Table.Cell className="dark:text-gray-200">
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
                </Table.Cell>
                <Table.Cell className="dark:text-gray-200">
                  {suggestion.user.username}
                </Table.Cell>
                <Table.Cell className="dark:text-gray-200">
                  {new Date(suggestion.date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="dark:text-gray-200">
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setSuggestionIdToDelete(suggestion._id);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-gray-400">No suggestions available.</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body className="dark:bg-[#18181b] bg-violet-100">
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteSuggestion}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal for showing full content */}
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

export default DashSuggestion;
