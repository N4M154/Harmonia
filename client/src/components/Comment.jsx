// import moment from 'moment';
// import { useEffect, useState } from 'react';
// import { FaThumbsUp } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Button, Textarea } from 'flowbite-react';
// import { set } from 'mongoose';

// export default function Comment({ comment, onLike, onEdit, onDelete }) {
//   const [user, setUser] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(comment.content);
//   const { currentUser } = useSelector((state) => state.user);
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await fetch(`/api/user/${comment.userId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     getUser();
//   }, [comment]);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedContent(comment.content);
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`/api/comment/editComment/${comment._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content: editedContent,
//         }),
//       });
//       if (res.ok) {
//         setIsEditing(false);
//         onEdit(comment, editedContent);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
//       <div className='flex-shrink-0 mr-3'>
//         <img
//           className='w-10 h-10 rounded-full bg-gray-200'
//           src={user.profilePicture}
//           alt={user.username}
//         />
//       </div>
//       <div className='flex-1'>
//         <div className='flex items-center mb-1'>
//           <span className='font-bold mr-1 text-xs truncate'>
//             {user ? `@${user.username}` : 'anonymous user'}
//           </span>
//           <span className='text-gray-500 text-xs'>
//             {moment(comment.createdAt).fromNow()}
//           </span>
//         </div>
//         {isEditing ? (
//           <>
//             <Textarea
//               className='mb-2'
//               value={editedContent}
//               onChange={(e) => setEditedContent(e.target.value)}
//             />
//             <div className='flex justify-end gap-2 text-xs'>
//               <Button
//                 type='button'
//                 size='sm'
//                 gradientDuoTone='purpleToBlue'
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//               <Button
//                 type='button'
//                 size='sm'
//                 gradientDuoTone='purpleToBlue'
//                 outline
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </>
//         ) : (
//           <>
//             <p className='text-gray-500 pb-2'>{comment.content}</p>
//             <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
//               <button
//                 type='button'
//                 onClick={() => onLike(comment._id)}
//                 className={`text-gray-400 hover:text-blue-500 ${
//                   currentUser &&
//                   comment.likes.includes(currentUser._id) &&
//                   '!text-blue-500'
//                 }`}
//               >
//                 <FaThumbsUp className='text-sm' />
//               </button>
//               <p className='text-gray-400'>
//                 {comment.numberOfLikes > 0 &&
//                   comment.numberOfLikes +
//                     ' ' +
//                     (comment.numberOfLikes === 1 ? 'like' : 'likes')}
//               </p>
//               {currentUser &&
//                 (currentUser._id === comment.userId || currentUser.isAdmin) && (
//                   <>
//                     <button
//                       type='button'
//                       onClick={handleEdit}
//                       className='text-gray-400 hover:text-blue-500'
//                     >
//                       Edit
//                     </button>
//                     <button
//                       type='button'
//                       onClick={() => onDelete(comment._id)}
//                       className='text-gray-400 hover:text-red-500'
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
//-------------------------------------------------------------------------------------------------------------replies

import { useEffect, useState } from "react";
import { FaThumbsUp, FaReply } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import moment from "moment";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([]);
  const [replyUsers, setReplyUsers] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditingReply, setIsEditingReply] = useState({});
  const [editedReplyContent, setEditedReplyContent] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();

    const getReplies = async () => {
      try {
        const res = await fetch(`/api/comment/getReplies/${comment._id}`);
        const data = await res.json();
        if (res.ok) {
          setReplies(data);
          // Fetch user information for each reply
          const replyUsersData = {};
          for (let reply of data) {
            const resUser = await fetch(`/api/user/${reply.userId}`);
            const userData = await resUser.json();
            replyUsersData[reply._id] = userData;
          }
          setReplyUsers(replyUsersData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getReplies();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleReplyEdit = (replyId) => {
    setIsEditingReply({ ...isEditingReply, [replyId]: true });
    setEditedReplyContent({
      ...editedReplyContent,
      [replyId]: replies.find((reply) => reply._id === replyId).content,
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comment/createReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: replyContent,
          postId: comment.postId,
          userId: currentUser._id,
          commentId: comment._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setReplyContent("");
        setReplies([data, ...replies]);
        setIsReplying(false);
        setReplyUsers({
          ...replyUsers,
          [data._id]: currentUser,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyContent("");
  };

  const handleReplyCancel = (replyId) => {
    setIsEditingReply({ ...isEditingReply, [replyId]: false });
  };

  // const handleReplyEdit = async (replyId, newContent) => {
  //   try {
  //     const res = await fetch(`/api/comment/editReply/${replyId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: newContent }),
  //     });
  //     if (res.ok) {
  //       const updatedReply = await res.json();
  //       setReplies(
  //         replies.map((reply) =>
  //           reply._id === replyId ? { ...reply, content: newContent } : reply
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleReplySave = async (replyId) => {
    try {
      const newContent = editedReplyContent[replyId];
      const res = await fetch(`/api/comment/editReply/${replyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });
      if (res.ok) {
        const updatedReply = await res.json();
        setReplies(
          replies.map((reply) =>
            reply._id === replyId ? { ...reply, content: newContent } : reply
          )
        );
        setIsEditingReply({ ...isEditingReply, [replyId]: false });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReplyDelete = async (replyId) => {
    try {
      const res = await fetch(`/api/comment/deleteReply/${replyId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReplies(replies.filter((reply) => reply._id !== replyId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 hover:scale-110 transition-all durattion-300 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-green-400 hover:scale-110 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </>
                )}
              <button
                type="button"
                onClick={() => setIsReplying(!isReplying)}
                className="text-gray-400 hover:text-violet-500 hover:scale-110 transition-all duration-300"
              >
                <FaReply className="text-sm" />
              </button>
            </div>

            {isReplying && (
              <form onSubmit={handleReplySubmit} className="mt-3">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows="2"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="mt-2 !bg-violet-500 hover:!bg-violet-600"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="!bg-red-400 hover:!bg-red-500 mt-2 !text-black"
                    onClick={handleCancelReply}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {replies.length > 0 && (
              <div className="ml-6 mt-3">
                {replies.map((reply) => (
                  <div
                    key={reply._id}
                    className="flex p-2 border-b dark:border-gray-600"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <img
                        className="w-8 h-8 rounded-full bg-gray-200"
                        src={
                          replyUsers[reply._id]?.profilePicture ||
                          "/default-avatar.png"
                        }
                        alt={replyUsers[reply._id]?.username || "anonymous"}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-bold mr-1 text-xs truncate">
                          {replyUsers[reply._id]
                            ? `@${replyUsers[reply._id]?.username}`
                            : "anonymous user"}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {moment(reply.createdAt).fromNow()}
                        </span>
                      </div>
                      {isEditingReply[reply._id] ? (
                        <>
                          <Textarea
                            value={
                              editedReplyContent[reply._id] || reply.content
                            }
                            onChange={(e) =>
                              setEditedReplyContent({
                                ...editedReplyContent,
                                [reply._id]: e.target.value,
                              })
                            }
                          />
                          <div className="flex justify-end gap-2 text-xs">
                            <Button
                              type="button"
                              size="sm"
                              className="mt-2 !bg-violet-500 hover:!bg-violet-600"
                              onClick={() => handleReplySave(reply._id)}
                            >
                              Save
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="mt-2 !text-black !bg-red-400 hover:!bg-red-500"
                              onClick={() => handleReplyCancel(reply._id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-500 pb-2">{reply.content}</p>
                          <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                            {currentUser &&
                              (currentUser._id === reply.userId ||
                                currentUser.isAdmin) && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleReplyEdit(reply._id)}
                                    className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all duration-300"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleReplyDelete(reply._id)}
                                    className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
