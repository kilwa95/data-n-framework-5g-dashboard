import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      control: "text",
      description: "The name of the user to display in the greeting",
    },
    onMenuClick: {
      action: "clicked",
      description: "Callback function when the menu button is clicked",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "Jessica",
    onMenuClick: () => console.log("Menu clicked"),
  },
};

export const LongName: Story = {
  args: {
    userName: "Alexandra Christina",
    onMenuClick: () => console.log("Menu clicked"),
  },
};

export const DarkMode: Story = {
  args: {
    userName: "Jessica",
    onMenuClick: () => console.log("Menu clicked"),
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
