import { ReactNode, useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-[#F0F2F5] dark:bg-[#18191A]">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Jessica"
        />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
