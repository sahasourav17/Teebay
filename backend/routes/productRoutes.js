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

router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categories, rentalPrice, rentalDuration } =
    req.body;

  const parsedPurchasedPrice = parseFloat(price);
  const parsedRentalPrice = parseFloat(rentalPrice);

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        purchasePrice: parsedPurchasedPrice,
        rentalPrice: parsedRentalPrice,
        rentalDuration,
        categories: {
          set: categories.map((category) => ({ name: category })),
        },
      },
      include: {
        categories: true,
      },
    });
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/details", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { categories: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error getting product details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
