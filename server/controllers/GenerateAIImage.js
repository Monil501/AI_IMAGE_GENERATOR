import * as dotenv from "dotenv";
import { createError } from "../error.js";
import axios from "axios";

dotenv.config();

// Controller to generate Image using ClipDrop API
export const generateImage = async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.CLIPDROP_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "ClipDrop API key not set in environment variables." });
    }

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Prompt is required and cannot be empty." });
    }

    try {
      const response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        { prompt },
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      // Convert image buffer to base64
      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      return res.status(200).json({ photo: base64Image });
    } catch (error) {
      console.error("ClipDrop image generation error:", {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
        stack: error.stack,
      });
      return res.status(500).json({ error: "Failed to generate image." });
    }
};