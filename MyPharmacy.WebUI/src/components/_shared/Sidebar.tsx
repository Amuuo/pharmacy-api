import { useState } from "react";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
   const [isOpen, setIsOpen] = useState(true);

   const toggleSidebar = () => setIsOpen(!isOpen);

   return (
      <div className={styles.container} style={{ height: "100%" }}>
         <span
            onClick={toggleSidebar}
            className={`${styles.toggleButton} ${!isOpen && styles.toggleButtonClosed}`}>
            ⥢
         </span>
         <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <ul>
               <li>Home</li>
               <li>About</li>
               <li>Services</li>
               <li>Contact</li>
            </ul>
         </div>
      </div>
   );
}
