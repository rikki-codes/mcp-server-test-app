import axios from "axios";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [installationCode, setInstallationCode] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testMCPServer = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await axios.post("http://localhost:5000/api/test-mcp", {
        installationCode,
      });
      setResponse(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to connect to MCP server");
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <h1 className="title">MCP Server Tester</h1>
      <input
        type="text"
        placeholder="Enter MCP Installation Code"
        value={installationCode}
        onChange={(e) => setInstallationCode(e.target.value)}
        className="input"
      />
      <button onClick={testMCPServer} disabled={loading} className="button">
        {loading ? "Testing..." : "Test MCP Server"}
      </button>
      {response && <p className="success-message">{response}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default App;
