import DeliveryList2 from "../components/Delivery/DeliveryList";
import styles from "./DeliveryPage.module.scss";

export default function DeliveryPage() {
   return (
      <div className={styles.DeliveryManager + " slide-in-from-top"}>
         <DeliveryList2 />
      </div>
   );
}
