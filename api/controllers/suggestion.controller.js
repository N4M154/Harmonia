import Suggestion from "../models/suggestion.model.js";
import { errorHandler } from "../utils/error.js";

// Handle the creation of a new suggestion
// export const createSuggestion = async (req, res, next) => {
//   const { subject, content } = req.body;

//   // Check if content is provided
//   if (!content || content.trim() === "") {
//     return next(
//       errorHandler(400, "Please provide some content for your suggestion.")
//     );
//   }

//   // Create a new suggestion document
//   const newSuggestion = new Suggestion({
//     user: req.user.id, // Getting user id from the logged-in user
//     subject,
//     content,
//   });

//   try {
//     const savedSuggestion = await newSuggestion.save();
//     res.status(201).json(savedSuggestion); // Send the saved suggestion as response
//   } catch (error) {
//     next(error);
//   }
// };

export const createSuggestion = async (req, res, next) => {
  const { subject, content } = req.body;

  // Check if content is provided
  if (!content || content.trim() === "") {
    return next(
      errorHandler(400, "Please provide some content for your suggestion.")
    );
  }

  // Create a new suggestion document
  const newSuggestion = new Suggestion({
    user: req.user.id, // Getting user id from the logged-in user
    subject,
    content,
  });

  try {
    const savedSuggestion = await newSuggestion.save();
    // Send the success message along with the saved suggestion
    res.status(201).json({
      message: "Your suggestion has been submitted successfully!",
      suggestion: savedSuggestion,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSuggestions = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));
  try {
    const suggestions = await Suggestion.find()
      .populate("user", "username email") // Optionally populate user details
      .sort({ date: -1 }); // Sort by the most recent suggestion

    res.status(200).json(suggestions);
  } catch (error) {
    next(error);
  }
};

export const getUserSuggestions = async (req, res, next) => {
  try {
    // Find suggestions by the logged-in user (using req.user.id)
    const userSuggestions = await Suggestion.find({ user: req.user.id })
      .populate("user", "username email") // Optionally populate user details
      .sort({ date: -1 }); // Sort by the most recent suggestion

    if (userSuggestions.length === 0) {
      return res
        .status(404)
        .json({ message: "No suggestions found for this user." });
    }

    res.status(200).json(userSuggestions);
  } catch (error) {
    next(error);
  }
};

export const deleteSuggestion = async (req, res, next) => {
  console.log("User ID:", req.user.id); // Log the user ID
  const suggestion = await Suggestion.findById(req.params.suggestionId);
  if (!suggestion) {
    return next(errorHandler(404, "Suggestion not found"));
  }

  console.log("Suggestion Owner ID:", suggestion.user); // Log the suggestion's user ID
  if (suggestion.user.toString() !== req.user.id && !req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this suggestion")
    );
  }

  await Suggestion.findByIdAndDelete(req.params.suggestionId);
  res.status(200).json("Suggestion has been deleted");
};
