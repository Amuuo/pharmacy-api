import styles from "./PharmacyPage.module.scss";
import PharmacyList from "../components/Pharmacy/PharmacyList";
import PharmacistList from "../components/Pharmacist/PharmacistList";
import DeliveryList from "../components/Delivery/DeliveryList";
import PharmacyCard from "../components/Pharmacy/PharmacyCard";

export default function PharmacyPage() {
  return (
    <div className={styles.pharmacyPage}>
      <div className={styles.pharmacyList}>
        <PharmacyList maxHeight={470} />
      </div>
      <div className={styles.pharmacyCard}>
        <PharmacyCard />
      </div>
      <div className={styles.pharmacistList}>
        <PharmacistList maxHeight={250} />
      </div>
      <div className={styles.deliveryList}>
        <DeliveryList maxHeight={400} />
      </div>
    </div>
  );
}
