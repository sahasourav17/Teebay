const router = require("express").Router();
const prisma = require("../config/db");
router.get("/:id/products", async (req, res) => {
  const { id } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: { userId: parseInt(id) },
      include: { categories: true },
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error getting user products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
