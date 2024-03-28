const express = require("express");
const dotenv = require("dotenv");
const { health } = require("./routes/health");
const authRoutes = require("./routes/authRoutes");
const app = express();
dotenv.config();

app.use(express.json());
app.use("/health", health);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
