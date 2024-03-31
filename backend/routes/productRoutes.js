const router = require("express").Router();
const prisma = require("../config/db");

router.post("/create", async (req, res) => {
  const {
    name,
    description,
    price,
    categories,
    rentalPrice,
    rentalDuration,
    userId,
  } = req.body;


  const parsedPrice = parseFloat(price);
  const parsedRentalPrice = parseFloat(rentalPrice);

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        purchasePrice: parsedPrice,
        rentalPrice: parsedRentalPrice,
        rentalDuration,
        userId,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: { name: category },
          })),
        },
      },
      include: {
        categories: true,
      },
    });
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
