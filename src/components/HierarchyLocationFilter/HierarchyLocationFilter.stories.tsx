import type { Meta, StoryObj } from "@storybook/react";
import { HierarchyLocationFilter } from "./HierarchyLocationFilter";
import { Location } from "../types";

const meta = {
  title: "Components/HierarchyLocationFilter",
  component: HierarchyLocationFilter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HierarchyLocationFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  regions: [
    { id: "r1", name: "Île-de-France", coordinates: [48.8566, 2.3522] },
    { id: "r2", name: "Auvergne-Rhône-Alpes", coordinates: [45.7578, 4.832] },
  ],
  departments: {
    r1: [
      { id: "d1", name: "Paris", coordinates: [48.8566, 2.3522] },
      { id: "d2", name: "Hauts-de-Seine", coordinates: [48.8924, 2.2069] },
    ],
    r2: [
      { id: "d3", name: "Rhône", coordinates: [45.7578, 4.832] },
      { id: "d4", name: "Isère", coordinates: [45.7578, 4.832] },
    ],
  },
  cities: {
    d1: [{ id: "c1", name: "Paris" }],
    d2: [
      { id: "c2", name: "Nanterre" },
      { id: "c3", name: "Boulogne-Billancourt" },
    ],
  },
};

export const Default: Story = {
  args: {
    onChange: (selection) => console.log("Selection changed:", selection),
    initialData: mockData,
  },
};

export const WithCustomLabels: Story = {
  args: {
    onChange: (selection) => console.log("Selection changed:", selection),
    initialData: mockData,
    labels: {
      region: "Région",
      department: "Département",
      city: "Ville",
    },
    placeholders: {
      region: "Sélectionnez une région",
      department: "Sélectionnez un département",
      city: "Sélectionnez une ville",
    },
  },
};

export const WithAsyncLoading: Story = {
  args: {
    onChange: (selection) => console.log("Selection changed:", selection),
    initialData: { regions: mockData.regions, departments: {}, cities: {} },
    loadData: {
      departments: async (regionId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return (mockData.departments[
          regionId as keyof typeof mockData.departments
        ] || []) as Location[];
      },
      cities: async (departmentId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return (mockData.cities[departmentId as keyof typeof mockData.cities] ||
          []) as Location[];
      },
    },
  },
};
