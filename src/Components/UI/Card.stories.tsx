import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: "This is inside a card",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div>
        <h3>Custom Card</h3>
        <p>This card contains a title and some extra content.</p>
      </div>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <div>
        <h3>Interactive Card</h3>
        <button style={{ marginTop: "8px", padding: "4px 8px" }}>
          Click Me
        </button>
      </div>
    ),
  },
};
