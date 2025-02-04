import { useState } from "react";

const DashUserSuggestion = () => {
  const [loading, setLoading] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="max-w-xl mx-auto p-4">
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
          You haven&apos;t submitted any suggestions yet.
        </p>
      )}
    </div>
  );
};

export default DashUserSuggestion;
