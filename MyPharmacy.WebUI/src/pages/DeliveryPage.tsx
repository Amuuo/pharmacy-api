import DeliveryList from "../components/Delivery/DeliveryList";
import styles from "./DeliveryPage.module.scss";

export default function DeliveryPage() {
   return (
      <div className={styles.DeliveryManager + " slide-in-from-top"}>
         <DeliveryList />
      </div>
   );
}
