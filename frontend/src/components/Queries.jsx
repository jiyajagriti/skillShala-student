import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Queries = () => {
  const { token, user } = useAuth();
  const [question, setQuestion] = useState("");
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/queries");
      const data = await res.json();
      setQueries(data.filter(q => q.studentEmail === user?.email));
    } catch (err) {
      console.error("Failed to fetch queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: user?.name || "Unknown",
          studentEmail: user?.email || "unknown@example.com",
          course: user?.course || "Not specified",
          query: question, // 👈 match admin backend field
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setQuestion("");
        fetchQueries();
      } else {
        alert(data.message || "Failed to submit query");
      }
    } catch (err) {
      console.error("Failed to submit query:", err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchQueries();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl p-6 mb-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Query</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Type your query here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Submit Query
          </button>
        </form>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Previous Queries</h3>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : queries.length === 0 ? (
        <p className="text-gray-500">You haven’t submitted any queries yet.</p>
      ) : (
        <div className="space-y-5">
          {queries.map((q) => (
            <div
              key={q._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 transition hover:shadow-2xl"
            >
              <p className="text-gray-800 font-medium">Q: {q.query}</p>
              <p className="text-sm text-gray-500 mt-1">
                Status: <span className="capitalize">{q.status}</span>
              </p>
              {q.answer && (
                <p className="text-sm text-green-700 mt-2">Admin: {q.answer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Queries;