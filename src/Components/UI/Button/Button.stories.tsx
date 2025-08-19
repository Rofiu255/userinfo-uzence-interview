import React from "react";
import Button from "./Button/Button";

export default {
  title: "UI/Button",
  component: Button,
};

export const Primary = {
  args: {
    label: 'Click Me!',  // change the text
    primary: true,
  },
};



export const Secondary = {
  args: {
    label: 'Click Me!',
    primary: false,
  },
};
