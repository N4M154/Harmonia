// import Comment from "../models/comment.model.js";

// export const createComment = async (req, res, next) => {
//   try {
//     const { content, postId, userId } = req.body;

//     if (userId !== req.user.id) {
//       return next(
//         errorHandler(403, "You are not allowed to create this comment")
//       );
//     }

//     const newComment = new Comment({
//       content,
//       postId,
//       userId,
//     });
//     await newComment.save();

//     res.status(200).json(newComment);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPostComments = async (req, res, next) => {
//   try {
//     const comments = await Comment.find({ postId: req.params.postId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(comments);
//   } catch (error) {
//     next(error);
//   }
// };

// export const likeComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       return next(errorHandler(404, "Comment not found"));
//     }
//     const userIndex = comment.likes.indexOf(req.user.id);
//     if (userIndex === -1) {
//       comment.numberOfLikes += 1;
//       comment.likes.push(req.user.id);
//     } else {
//       comment.numberOfLikes -= 1;
//       comment.likes.splice(userIndex, 1);
//     }
//     await comment.save();
//     res.status(200).json(comment);
//   } catch (error) {
//     next(error);
//   }
// };

// export const editComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       return next(errorHandler(404, "Comment not found"));
//     }
//     if (comment.userId !== req.user.id && !req.user.isAdmin) {
//       return next(
//         errorHandler(403, "You are not allowed to edit this comment")
//       );
//     }

//     const editedComment = await Comment.findByIdAndUpdate(
//       req.params.commentId,
//       {
//         content: req.body.content,
//       },
//       { new: true }
//     );
//     res.status(200).json(editedComment);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       return next(errorHandler(404, "Comment not found"));
//     }
//     if (comment.userId !== req.user.id && !req.user.isAdmin) {
//       return next(
//         errorHandler(403, "You are not allowed to delete this comment")
//       );
//     }
//     await Comment.findByIdAndDelete(req.params.commentId);
//     res.status(200).json("Comment has been deleted");
//   } catch (error) {
//     next(error);
//   }
// };

// export const getcomments = async (req, res, next) => {
//   if (!req.user.isAdmin)
//     return next(errorHandler(403, "You are not allowed to get all comments"));
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.sort === "desc" ? -1 : 1;
//     const comments = await Comment.find()
//       .sort({ createdAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);
//     const totalComments = await Comment.countDocuments();
//     const now = new Date();
//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );
//     const lastMonthComments = await Comment.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//     });
//     res.status(200).json({ comments, totalComments, lastMonthComments });
//   } catch (error) {
//     next(error);
//   }
// };

// import Comment from "../models/comment.model.js";

// export const createComment = async (req, res, next) => {
//   try {
//     const { content, postId, userId } = req.body;

//     if (userId !== req.user.id) {
//       return next(
//         errorHandler(403, "You are not allowed to create this comment")
//       );
//     }

//     const newComment = new Comment({
//       content,
//       postId,
//       userId,
//     });
//     await newComment.save();

//     res.status(200).json(newComment);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPostComments = async (req, res, next) => {
//   try {
//     const comments = await Comment.find({ postId: req.params.postId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(comments);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPostCommentsbyUser = async (req, res, next) => {
//   try {
//     const comments = await Comment.find({
//       postId: req.params.postId,
//       userId: req.user.id, // Filter by the current user's userId
//     }).sort({ createdAt: -1 });
//     res.status(200).json(comments);
//   } catch (error) {
//     next(error);
//   }
// };

// export const likeComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       return next(errorHandler(404, "Comment not found"));
//     }
//     const userIndex = comment.likes.indexOf(req.user.id);
//     if (userIndex === -1) {
//       comment.numberOfLikes += 1;
//       comment.likes.push(req.user.id);
//     } else {
//       comment.numberOfLikes -= 1;
//       comment.likes.splice(userIndex, 1);
//     }
//     await comment.save();
//     res.status(200).json(comment);
//   } catch (error) {
//     next(error);
//   }
// };

// export const editComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       return next(errorHandler(404, "Comment not found"));
//     }
//     if (comment.userId !== req.user.id && !req.user.isAdmin) {
//       return next(
//         errorHandler(403, "You are not allowed to edit this comment")
//       );
//     }

//     const editedComment = await Comment.findByIdAndUpdate(
//       req.params.commentId,
//       {
//         content: req.body.content,
//       },
//       { new: true }
//     );
//     res.status(200).json(editedComment);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       return next(errorHandler(404, "Comment not found"));
//     }
//     if (comment.userId !== req.user.id && !req.user.isAdmin) {
//       return next(
//         errorHandler(403, "You are not allowed to delete this comment")
//       );
//     }
//     await Comment.findByIdAndDelete(req.params.commentId);
//     res.status(200).json("Comment has been deleted");
//   } catch (error) {
//     next(error);
//   }
// };

// export const getcomments = async (req, res, next) => {
//   if (!req.user.isAdmin)
//     return next(errorHandler(403, "You are not allowed to get all comments"));
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.sort === "desc" ? -1 : 1;
//     const comments = await Comment.find()
//       .sort({ createdAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);
//     const totalComments = await Comment.countDocuments();
//     const now = new Date();
//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );
//     const lastMonthComments = await Comment.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//     });
//     res.status(200).json({ comments, totalComments, lastMonthComments });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getcommentsbyUser = async (req, res, next) => {
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.sort === "desc" ? -1 : 1;

//     // Fetch only the current user's comments
//     const comments = await Comment.find({ userId: req.user.id })
//       .sort({ createdAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//     const totalComments = await Comment.countDocuments({ userId: req.user.id });
//     const now = new Date();
//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );
//     const lastMonthComments = await Comment.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//       userId: req.user.id,
//     });

//     res.status(200).json({ comments, totalComments, lastMonthComments });
//   } catch (error) {
//     next(error);
//   }
// };
//----------------------------------------------------------------------------------------------
//replies

import Comment from "../models/comment.model.js";
import Reply from "../models/reply.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getPostCommentsbyUser = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
      userId: req.user.id, // Filter by the current user's userId
    }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

export const getcommentsbyUser = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;

    // Fetch only the current user's comments
    const comments = await Comment.find({ userId: req.user.id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments({ userId: req.user.id });
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
      userId: req.user.id,
    });

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

// Create a reply to a comment
export const createReply = async (req, res, next) => {
  try {
    const { content, postId, userId, commentId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this reply")
      );
    }

    const newReply = new Reply({
      content,
      postId,
      userId,
      commentId,
    });

    const savedReply = await newReply.save();
    res.status(200).json(savedReply);
  } catch (error) {
    next(error);
  }
};

// Get replies for a specific comment
export const getReplies = async (req, res, next) => {
  try {
    const replies = await Reply.find({ commentId: req.params.commentId }).sort({
      createdAt: -1,
    });
    res.status(200).json(replies);
  } catch (error) {
    next(error);
  }
};

//edit relpy
export const editReply = async (req, res, next) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }
    if (reply.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to edit this reply"));
    }

    const editedReply = await Reply.findByIdAndUpdate(
      req.params.replyId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedReply);
  } catch (error) {
    next(error);
  }
};
//delete reply
export const deleteReply = async (req, res, next) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }
    if (reply.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this reply")
      );
    }
    await Reply.findByIdAndDelete(req.params.replyId);
    res.status(200).json("Reply has been deleted");
  } catch (error) {
    next(error);
  }
};
