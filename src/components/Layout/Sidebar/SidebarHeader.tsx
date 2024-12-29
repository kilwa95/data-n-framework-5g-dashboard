import { FreeLogo } from "../../icons/FreeLogo";

interface SidebarHeaderProps {
  isOpen: boolean;
}

export const SidebarHeader = ({ isOpen }: SidebarHeaderProps) => {
  return (
    <div className="h-16 flex items-center px-4 border-b border-gray-700">
      <FreeLogo className="w-8 h-8 text-primary-500" />
      {isOpen && <span className="ml-3 font-semibold text-lg">Free</span>}
    </div>
  );
};
