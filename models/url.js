const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
);
const URL = mongoose.model("url", urlSchema);
module.exports = URL;
