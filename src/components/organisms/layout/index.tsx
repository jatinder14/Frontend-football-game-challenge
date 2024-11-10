import Sidebar from '../../molecules/sidebar';
import { ReactNode } from 'react';
import Tabs from '../tabs';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {

  return (
    <div className="flex bg-[#1d1d1d] h-screen">
      <Sidebar />
      <main className="flex-1 p-10 h-full">
        {children}
      </main>
    </div>
  );
};

