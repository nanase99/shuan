import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "radio" },
      description: "variantを設定します。",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "radio" },
      description: "sizeを設定します。",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    children: {
      control: "text",
      description: "sizeを設定します。",
      table: {
        defaultValue: { summary: "Button" },
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
};
