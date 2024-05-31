import Header from "./components/_shared/Header.tsx";
import SidebarNav from "./components/_shared/SidebarNav.tsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
   return (
      <>
         <Header />
         <SidebarNav />
         <Outlet />
      </>
   );
}
