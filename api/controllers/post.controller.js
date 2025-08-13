import Post from "../models/post.model.js";
import SavedPost from "../models/savedPost.model.js";
import Comment from "../models/comment.model.js";
import Reply from "../models/reply.model.js";

import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// export const deletepost = async (req, res, next) => {
//   if (!req.user.isAdmin || req.user.id !== req.params.userId) {
//     return next(errorHandler(403, "You are not allowed to delete this post"));
//   }
//   try {
//     await Post.findByIdAndDelete(req.params.postId);
//     res.status(200).json("The post has been deleted");
//   } catch (error) {
//     next(error);
//   }
// };
export const deletepost = async (req, res, next) => {
  // Check if the user is allowed to delete the post
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }

  try {
    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    if (!deletedPost) {
      return next(errorHandler(404, "Post not found"));
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ postId: req.params.postId });

    // Delete all replies associated with the post
    await Reply.deleteMany({ postId: req.params.postId });

    // Delete all saved posts referencing the deleted post
    await SavedPost.deleteMany({ post: req.params.postId });

    res
      .status(200)
      .json(
        "The post and its associated comments, replies, and saved posts have been deleted"
      );
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Save a post
export const savePost = async (req, res, next) => {
  try {
    // Check if the post is already saved by the user
    const existingSavedPost = await SavedPost.findOne({
      user: req.user.id,
      post: req.body.postId,
    });

    if (existingSavedPost) {
      return next(errorHandler(400, "Post is already saved"));
    }

    // Save the post
    const savedPost = new SavedPost({
      user: req.user.id,
      post: req.body.postId,
    });
    await savedPost.save();
    res.status(201).json({ message: "Post saved successfully" });
  } catch (error) {
    next(error);
  }
};

// Unsave a post
export const unsavePost = async (req, res, next) => {
  try {
    // Check if the post is saved by the user
    const savedPost = await SavedPost.findOne({
      user: req.user.id,
      post: req.params.postId,
    });

    if (!savedPost) {
      return next(errorHandler(404, "Post not found in saved list"));
    }

    // Unsave the post
    await SavedPost.deleteOne({ _id: savedPost._id });
    res.status(200).json({ message: "Post unsaved successfully" });
  } catch (error) {
    next(error);
  }
};
export const checkSavedPost = async (req, res, next) => {
  try {
    // Check if the post is saved by the user
    const savedPost = await SavedPost.findOne({
      user: req.user.id,
      post: req.params.postId,
    });

    if (savedPost) {
      res.status(200).json({ isSaved: true });
    } else {
      res.status(200).json({ isSaved: false });
    }
  } catch (error) {
    next(error);
  }
};
export const getSavedPosts = async (req, res, next) => {
  try {
    // Find saved posts by the user
    const savedPosts = await SavedPost.find({ user: req.user.id })
      .populate("post")
      .sort({ saveDate: -1 });

    res.status(200).json(savedPosts);
  } catch (error) {
    next(error);
  }
};
