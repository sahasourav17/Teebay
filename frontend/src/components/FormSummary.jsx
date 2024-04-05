import React from "react";
import { Text, Box } from "@mantine/core";

const FormSummary = ({
  formValues: {
    title,
    categories,
    description,
    price,
    rentAmount,
    rentDuration,
  },
}) => {
  return (
    <>
      <Text size="xl" fw={700} mb={8}>
        Summary
      </Text>
      <Box>
        <Text>{`Title: ${title}`}</Text>
        <Text>{`Categories: ${categories.join(", ")}`}</Text>
        <Text>{`Description: ${description}`}</Text>
        <Text>{`Price: $${price} To Rent: $${rentAmount} ${rentDuration}`}</Text>
      </Box>
    </>
  );
};

export default FormSummary;
