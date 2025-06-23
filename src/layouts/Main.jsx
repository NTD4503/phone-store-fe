import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <Header onMenuClick={openSidebar} />
      <div className="flex min-h-screen">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <main className="flex-1 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Main;
