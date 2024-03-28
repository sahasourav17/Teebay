const express = require("express");
const dotenv = require("dotenv");
const { health } = require("./routes/health");
const app = express();
dotenv.config();

app.get("/health", health);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
