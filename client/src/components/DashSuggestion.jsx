import { useState } from "react";

const DashSuggestion = () => {
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="max-w-xl mx-auto p-4">
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
    </div>
  );
};

export default DashSuggestion;
