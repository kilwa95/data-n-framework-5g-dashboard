import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigation } from "./SidebarNavigation";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#1C1E21] text-white transition-all duration-300 flex flex-col`}
    >
      <SidebarHeader isOpen={isOpen} />
      <SidebarNavigation
        isOpen={isOpen}
        menuItems={menuItems}
        organizationItems={organizationItems}
      />
    </aside>
  );
};

const menuItems = [{ name: "Home", href: "/", icon: "🏠", active: true }];

const organizationItems = [
  { name: "Integrations", href: "/integrations", icon: "🔄" },
];
