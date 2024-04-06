import React from "react";
import { Text, Group, Card, Divider, Button } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";

const ProductCard = ({ product, onDelete }) => {
  const handleDelete = () => {
    onDelete(product.id);
  };
  return (
    <Card
      shadow="sm"
      padding="lg"
      withBorder
      mt={18}
      style={{ cursor: "pointer" }}
    >
      <Group ta="center" justify="space-between" mb="sm">
        <Text fw={500} size="lg">
          {product.name}
        </Text>
        <Button size="xs" variant="transparent" onClick={handleDelete}>
          <IconTrashFilled size={32} color="#3d3d3d" />
        </Button>
      </Group>
      <Text c="dimmed" fw={500} size="xs">
        Categories:{" "}
        {product.categories.map((category) => category.name).join(", ")}
      </Text>
      <Group mt={4}>
        <Text size="sm" c="dimmed">
          Price: ${product.purchasePrice}
        </Text>
        <Divider size="sm" orientation="vertical" />
        <Text size="sm" c="dimmed">
          Rent: ${product.rentalPrice} {product.rentalDuration}
        </Text>
      </Group>
      <Text size="xs" mt={12} fw={400}>
        {product.description}
      </Text>

      <Group ta="center" justify="space-between" mt={16}>
        <Text fw={600} size="xs" c="dimmed">
          Date posted: 21st August 2020
        </Text>
        <Text fw={600} size="xs" c="dimmed">
          156 views
        </Text>
      </Group>
    </Card>
  );
};

export default ProductCard;
