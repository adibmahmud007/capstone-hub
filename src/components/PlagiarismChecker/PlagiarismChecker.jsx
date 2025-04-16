import { useState } from "react";
import axios from "axios";

const PlagiarismChecker = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null); // clear previous result
  };

  const handleUpload = async () => {
    // if (!file) return alert("Please upload a file first.");
    // setLoading(true);

    // const formData = new FormData();
    // formData.append("file", file);

    // try {
    //   const res = await axios.post("http://localhost:5000/api/plagiarism-check", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   setResult(res.data);
    // } catch (err) {
    //   alert("Error checking plagiarism.");
    //   console.error(err);
    // }

    // setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">📝 Plagiarism Checker</h2>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Plagiarism"}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Result:</h3>
          {result.matches.length === 0 ? (
            <p className="text-green-600">✅ No plagiarism found!</p>
          ) : (
            <>
              <p className="text-red-600 font-medium">
                ⚠️ {result.percentage.toFixed(2)}% Plagiarized
              </p>
              <ul className="mt-2 list-disc list-inside text-sm">
                {result.matches.map((match, index) => (
                  <li key={index}>
                    <a href={match.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {match.url}
                    </a>{" "}
                    - {match.score.toFixed(2)}%
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
