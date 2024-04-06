import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  MultiSelect,
  Code,
  Container,
  Textarea,
  Text,
  NumberInput,
  Box,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import categoryList from "../utils/categoryData";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/userProductsSlice";
import { useNavigate } from "react-router-dom";
import FormSummary from "./FormSummary";

const MultiStepForm = () => {
  const { user: userData } = useSelector((state) => state.auth);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      categories: [],
      price: 0,
      description: "",
      rentAmount: 0,
      rentDuration: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          title:
            values.title.trim().length < 3
              ? "title must include at least 3 characters"
              : null,
        };
      }

      if (active === 1) {
        return {
          categories:
            values.categories.length < 1
              ? "You must specify at least one category"
              : null,
        };
      }

      if (active === 2) {
        return {
          description:
            values.description.trim().length < 10
              ? "Description must include at least 10 characters"
              : null,
        };
      }
      if (active === 3) {
        return {
          price:
            values.price <= 0
              ? "Purchased price must be greater than zero"
              : null,
          rentAmount:
            values.rentAmount <= 0
              ? "Rent amount must be greater than zero"
              : null,
          rentDuration:
            values.rentDuration.trim().length === 0
              ? "You must specify the duration"
              : null,
        };
      }

      return {};
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productInfo = {
      name: form.values.title,
      price: form.values.price,
      description: form.values.description,
      rentalPrice: form.values.rentAmount,
      rentalDuration: form.values.rentDuration,
      categories: form.values.categories,
      userId: userData?.user?.id,
    };
    dispatch(addProduct(productInfo));
    navigate("/");
  };

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 4 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container size="sm">
      <Stepper
        active={active}
        styles={{
          stepBody: {
            display: "none",
          },
          stepIcon: {
            display: "none",
          },

          separator: {
            display: "none",
          },
        }}
      >
        <Stepper.Step>
          <Text ta="center" size="lg" fw={500} mb={8}>
            Select a title for your product
          </Text>
          <TextInput placeholder="Title" {...form.getInputProps("title")} />
        </Stepper.Step>

        <Stepper.Step>
          <MultiSelect
            data={categoryList}
            placeholder="Categories"
            {...form.getInputProps("categories")}
          />
        </Stepper.Step>

        <Stepper.Step>
          <Text ta="center" size="lg" fw={500} mb={8}>
            Select Description
          </Text>
          <Textarea
            autosize
            minRows={6}
            {...form.getInputProps("description")}
          />
        </Stepper.Step>

        <Stepper.Step>
          <Box size="xs" justify="center">
            <Text ta="center" size="lg" fw={500} mb={8}>
              Select Price
            </Text>
            <NumberInput
              placeholder="Purchase Price"
              hideControls
              {...form.getInputProps("price")}
              style={{ maxWidth: "30%" }}
            />
            <Group justify="flex-start" align="center">
              <NumberInput
                label="Rent"
                hideControls
                {...form.getInputProps("rentAmount")}
              />
              <Select
                placeholder="Select Option"
                data={["Hourly", "Daily", "Monthly", "Yearly"]}
                {...form.getInputProps("rentDuration")}
              />
            </Group>
          </Box>
        </Stepper.Step>

        <Stepper.Completed>
          <FormSummary formValues={form.values} />
        </Stepper.Completed>
      </Stepper>

      <Group justify="space-between" mt="xl">
        {active !== 0 && <Button onClick={prevStep}>Back</Button>}
        {active !== 4 && <Button onClick={nextStep}>Next</Button>}
        {active === 4 && <Button onClick={handleSubmit}>Submit</Button>}
      </Group>
    </Container>
  );
};

export default MultiStepForm;
