import React, { useState } from "react";
import { useSelector } from "react-redux";

const SuggestionForm = () => {
  const { currentUser } = useSelector((state) => state.user); // Get the current user from the Redux state
  const [subject, setSubject] = useState("feature"); // Default subject is 'feature'
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/sug/suggestions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestions(data); // Set the fetched suggestions in state
      } else {
        setError("Failed to fetch suggestions.");
      }
    } catch (err) {
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUserSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/sug/user-suggestions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserSuggestions(data); // Set the user's suggestions
      } else {
        setError("Failed to fetch your suggestions.");
      }
    } catch (err) {
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };
  // Handle subject change
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value);
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

      <h2 className="text-2xl font-bold mb-4 text-center">
        View All Suggestions
      </h2>

      {/* Button to Fetch All Suggestions */}
      <button
        onClick={handleFetchSuggestions}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
      >
        {loading ? "Loading..." : "Show All Suggestions"}
      </button>

      {/* Display Suggestions */}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {suggestions.length > 0 ? (
        <div className="mt-6">
          <ul className="space-y-4">
            {suggestions.map((suggestion) => (
              <li key={suggestion._id} className="p-4 border rounded-md">
                <h3 className="font-semibold">{suggestion.subject}</h3>
                <p>{suggestion.content}</p>
                <p className="text-sm text-gray-500">
                  Suggested by {suggestion.user.username} on{" "}
                  {new Date(suggestion.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-center">No suggestions available.</p>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center">Your Suggestions</h2>

      {/* Button to Fetch User's Suggestions */}
      <button
        onClick={handleFetchUserSuggestions}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
      >
        {loading ? "Loading..." : "Show My Suggestions"}
      </button>

      {/* Display User's Suggestions */}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {userSuggestions.length > 0 ? (
        <div className="mt-6">
          <ul className="space-y-4">
            {userSuggestions.map((suggestion) => (
              <li key={suggestion._id} className="p-4 border rounded-md">
                <h3 className="font-semibold">{suggestion.subject}</h3>
                <p>{suggestion.content}</p>
                <p className="text-sm text-gray-500">
                  Suggested on {new Date(suggestion.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-center">
          You haven't submitted any suggestions yet.
        </p>
      )}
    </div>
  );
};

export default SuggestionForm;
