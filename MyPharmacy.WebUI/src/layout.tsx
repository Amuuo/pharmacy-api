import Header from "./components/_shared/Header.tsx";
import Sidebar from "./components/_shared/Sidebar.tsx";
import SidebarNav from "./components/_shared/SidebarNav.tsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
   return (
      <>
         {/* <Header /> */}
         <Sidebar />
         {/* <SidebarNav /> */}
         <Outlet />
      </>
   );
}
