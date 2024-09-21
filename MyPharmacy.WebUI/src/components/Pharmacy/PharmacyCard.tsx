import { useEffect, useState } from "react";
import { usePharmacyStore } from "../../stores/pharmacyStore";
import styles from "./PharmacyCard.module.scss";

export default function PharmacyCard() {
  const { selectedPharmacy, pharmacyList } = usePharmacyStore();
  const [isOutgoing, setIsOutgoing] = useState(false);
  const [currentPharmacy, setCurrentPharmacy] = useState(selectedPharmacy);

  useEffect(() => {
    if (!selectedPharmacy) setCurrentPharmacy(pharmacyList[0]);
  }, [pharmacyList, selectedPharmacy]);

  useEffect(() => {
    setIsOutgoing(true);
    const timeoutId = setTimeout(() => {
      setCurrentPharmacy(selectedPharmacy);
      setIsOutgoing(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [selectedPharmacy?.id]);

  if (!currentPharmacy?.name) return null;

  return (
    <div className={styles.pharmacy_selection}>
      <div
        className={`${styles.pharmacy_card} ${
          isOutgoing ? styles.outgoing : styles.incoming
        }`}
      >
        <img
          src="src/assets/img/frostydog2_A_Walgreens_store_front.png"
          alt="Pharmacy"
          width="100%"
          className={styles.card_media}
        />
        <div className={styles.card_header}>
          <span>{currentPharmacy.name}</span>
        </div>
        <div className={styles.card_content}>
          <div>
            <label>Address</label>
            <span>
              {currentPharmacy.address}
              <br />
              {`${currentPharmacy.city}, ${currentPharmacy.state} ${currentPharmacy.zip}`}
            </span>
          </div>
          <div>
            <label className={styles.text_secondary}>RX #</label>
            <span style={{ fontSize: "24px" }}>
              {currentPharmacy.prescriptionsFilled}
            </span>
          </div>
          <div>
            <label className={styles.text_secondary}>ID</label>
            <span style={{ fontSize: "24px" }}>{currentPharmacy.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
