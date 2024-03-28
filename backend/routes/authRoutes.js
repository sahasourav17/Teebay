const router = require("express").Router();
const bcrypt = require("bcrypt");
const prisma = require("../config/db");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, password } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
        password: hashedPassword,
      },
    });
    return res
      .status(201)
      .json({ message: "User Registered Successfully", user });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    return res
      .status(200)
      .json({ message: "User Logged In Successfully", user });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
