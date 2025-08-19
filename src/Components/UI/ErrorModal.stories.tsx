import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ErrorModal from "./ErrorModal";

const meta: Meta<typeof ErrorModal> = {
  title: "UI/ErrorModal",
  component: ErrorModal,
};

export default meta;
type Story = StoryObj<typeof ErrorModal>;

export const Default: Story = {
  args: {
    title: "Error!",
    message: "Something went wrong.",
    onConfirmError: () => alert("Confirmed"),
  },
};
