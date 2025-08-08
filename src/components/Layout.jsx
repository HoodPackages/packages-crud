import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`flex-1 p-6 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
        <Outlet />
      </main>
    </div>
  );
}
