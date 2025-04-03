const express= require("express");
const cors= require("cors");
const axios=require("axios");
const dotenv= require("dotenv");


const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.post("/api/test-mcp", async (req, res) => {
  const { installationCode } = req.body;

  if (!installationCode) {
    return res.status(400).json({ error: "Installation code is required" });
  }

  try {
    const testURL = `https://registry.smithery.ai/servers/${installationCode}`;
    const response = await axios.get(testURL, {
      headers: {
        "Authorization": `Bearer ${process.env.SMITHERY_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return res.json({ message: "MCP Server is functional!" });
    } else {
      return res.status(500).json({ error: "MCP Server did not respond as expected" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to connect to MCP Server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
