import React from "react";
import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
};

export const Primary = () => <Button>Click Me</Button>;
export const Secondary = () => <Button className="bg-purple-500">Click Me</Button>;
