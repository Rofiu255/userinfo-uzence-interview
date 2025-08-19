import type { Meta, StoryObj } from "@storybook/react";
import DataTable, { type DataTableProps, type Column } from "./DataTable";

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "age", title: "Age" },
];

// ✅ Wrapper to lock generic type for Storybook
const DataTableUser = (props: DataTableProps<User>) => <DataTable<User> {...props} />;

const meta: Meta<typeof DataTableUser> = {
  title: "Components/DataTable",
  component: DataTableUser,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible DataTable with support for row selection, loading, and empty states.",
      },
    },
  },
  argTypes: {
    selectable: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof DataTableUser>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
