import { AppBar, Avatar, Toolbar } from "@mui/material";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import CalendarIcon from "./CalendarIcon";

export default function Header() {
   return (
      <AppBar position="sticky" sx={{ gridArea: "header" }}>
         <Toolbar className={styles.toolbar}>
            <div className={styles.menu_container}>
               <a href="/" className={styles.brand_link}>
                  MyPharmacy®
               </a>
               <div className={styles.menu_container_links}>
                  <NavLink to="/">Pharmacies</NavLink>
                  <NavLink to="/pharmacists">Pharmacists</NavLink>
                  <NavLink to="/deliveries">Deliveries</NavLink>
                  <NavLink to="/reports">Reporting</NavLink>
                  <NavLink to="/warehouse">Warehouse</NavLink>
               </div>
            </div>
            <CalendarIcon height={40} width={40} />
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
               <Avatar></Avatar>
               <span className={styles.env_text}>{import.meta.env.MODE}</span>
            </div>
         </Toolbar>
      </AppBar>
   );
}
