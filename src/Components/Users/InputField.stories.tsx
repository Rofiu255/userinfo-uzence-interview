import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Users/InputField",
  component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    value: "",
  },
};

export const WithValue: Story = {
  args: {
    label: "Name",
    placeholder: "Enter name",
    value: "John Doe",
  },
};
