// //individually posted comments

// import { Modal, Table, Button } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// // import { FaCheck, FaTimes } from "react-icons/fa";

// export default function DashComments() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [comments, setComments] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [commentIdToDelete, setCommentIdToDelete] = useState("");
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await fetch(`/api/comment/getcommentsbyUser`);
//         const data = await res.json();
//         if (res.ok) {
//           setComments(data.comments);
//           if (data.comments.length < 9) {
//             setShowMore(false);
//           }
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     if (currentUser) {
//       fetchComments();
//     }
//   }, [currentUser._id]);

//   const handleShowMore = async () => {
//     const startIndex = comments.length;
//     try {
//       const res = await fetch(
//         `/api/comment/getcommentsbyUser?startIndex=${startIndex}`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setComments((prev) => [...prev, ...data.comments]);
//         if (data.comments.length < 9) {
//           setShowMore(false);
//         }
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleDeleteComment = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch(
//         `/api/comment/deleteComment/${commentIdToDelete}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setComments((prev) =>
//           prev.filter((comment) => comment._id !== commentIdToDelete)
//         );
//         setShowModal(false);
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//       {comments.length > 0 ? (
//         <>
//           <Table className="shadow-lg dark:shadow-black">
//             <Table.Head>
//               <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
//                 Date updated
//               </Table.HeadCell>
//               <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
//                 Comment content
//               </Table.HeadCell>
//               <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
//                 Number of likes
//               </Table.HeadCell>
//               <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
//                 PostId
//               </Table.HeadCell>
//               <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
//                 UserId
//               </Table.HeadCell>
//               <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
//                 Delete
//               </Table.HeadCell>
//             </Table.Head>
//             {comments.map((comment) => (
//               <Table.Body className="divide-y" key={comment._id}>
//                 <Table.Row className="bg-white dark:border-gray-700 dark:bg-black/10">
//                   <Table.Cell className="dark:text-gray-200">
//                     {new Date(comment.updatedAt).toLocaleDateString()}
//                   </Table.Cell>
//                   <Table.Cell className="dark:text-gray-200">
//                     {comment.content}
//                   </Table.Cell>
//                   <Table.Cell className="dark:text-gray-200">
//                     {comment.numberOfLikes}
//                   </Table.Cell>
//                   <Table.Cell className="dark:text-gray-200">
//                     {comment.postId}
//                   </Table.Cell>
//                   <Table.Cell className="dark:text-gray-200">
//                     {comment.userId}
//                   </Table.Cell>
//                   <Table.Cell className="dark:text-gray-200">
//                     <span
//                       onClick={() => {
//                         setShowModal(true);
//                         setCommentIdToDelete(comment._id);
//                       }}
//                       className="font-medium text-red-500 hover:underline cursor-pointer"
//                     >
//                       Delete
//                     </span>
//                   </Table.Cell>
//                 </Table.Row>
//               </Table.Body>
//             ))}
//           </Table>
//           {showMore && (
//             <button
//               onClick={handleShowMore}
//               className="w-full text-teal-500 self-center text-sm py-7"
//             >
//               Show more
//             </button>
//           )}
//         </>
//       ) : (
//         <p className="text-gray-400">You have no comments yet!</p>
//       )}
//       <Modal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         popup
//         size="md"
//       >
//         <Modal.Header />
//         <Modal.Body className="dark:bg-[#18181b] bg-violet-100">
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
//             <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete this comment?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={handleDeleteComment}>
//                 Yes, I&apos;m sure
//               </Button>
//               <Button color="gray" onClick={() => setShowModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

//--------------------------------------------------------------------------------------------------------------individually posted comments

import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { X } from "lucide-react";
// import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcommentsbyUser`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcommentsbyUser?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
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
      // Add line break after every 70 characters
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

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {comments.length > 0 ? (
        <>
          <Table className="shadow-lg dark:shadow-black">
            <Table.Head>
              <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
                Date updated
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
                Comment content
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
                Number of likes
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
                PostId
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
                UserId
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black dark:text-white">
                Delete
              </Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-black/10">
                  <Table.Cell className="dark:text-gray-200">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="dark:text-gray-200">
                    {comment.content.length > 40 ? (
                      <div>
                        <p>{comment.content.slice(0, 40)}...</p>
                        <button
                          onClick={() => openModal(comment.content)}
                          className="mt-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-600 hover:underline text-sm font-thin"
                        >
                          Show more
                        </button>
                      </div>
                    ) : (
                      comment.content
                    )}
                  </Table.Cell>
                  <Table.Cell className="dark:text-gray-200">
                    {comment.numberOfLikes}
                  </Table.Cell>
                  <Table.Cell className="dark:text-gray-200">
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell className="dark:text-gray-200">
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell className="dark:text-gray-200">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-400">You have no comments yet!</p>
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
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
}
