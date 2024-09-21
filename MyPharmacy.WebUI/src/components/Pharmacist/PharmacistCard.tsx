import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState, useMemo } from "react";
import styles from "./PharmacistCard.module.scss";
import PharmacyList2 from "../Pharmacy/PharmacyList";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";

export default function PharmacistCard() {
  const { selectedPharmacist } = usePharmacistStore();
  const [isOutgoing, setIsOutgoing] = useState(false);
  const [currentPharmacist, setCurrentPharmacist] = useState(selectedPharmacist);

  useEffect(() => {
    if (selectedPharmacist?.id) {
      setIsOutgoing(true);
      const timer = setTimeout(() => {
        setCurrentPharmacist(selectedPharmacist);
        setIsOutgoing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [selectedPharmacist?.id]);

  const formattedHireDate = useMemo(() => {
    return currentPharmacist
      ? moment(currentPharmacist.hireDate).format("MM-DD-YYYY")
      : "";
  }, [currentPharmacist]);

  if (!currentPharmacist?.id) return null;

  return (
    <div className={styles.pharmacist_selection}>
      <Card
        className={`${styles.pharmacist_card} ${
          isOutgoing ? styles.outgoing : styles.incoming
        }`}
      >
        <CardHeader
          title={`${currentPharmacist.firstName} ${currentPharmacist.lastName}`}
          subheader={
            <div className={styles.card_buttons}>
              <button
                className={styles.add_button}
                type="button"
                title="Assign Pharmacist"
              >
                Assign Pharmacist
              </button>
              <button
                className={styles.edit_button}
                type="button"
                title="Edit Pharmacist"
              >
                Edit Pharmacist
              </button>
            </div>
          }
          action={
            <Avatar
              sx={{
                bgcolor: "teal",
                height: 60,
                width: 60,
                stroke: "white",
                strokeWidth: 5,
              }}
              aria-label="pharmacist-avatar"
            >
              {selectedPharmacist?.firstName?.charAt(0)}
            </Avatar>
          }
        />
        <CardContent className={styles.cardContentStyle}>
          <div className={styles.card_body}>
            <div className={styles.card_content}>
              <div>
                <Typography variant="subtitle2">Age:</Typography>
                <span>{currentPharmacist.age}</span>
              </div>
              <div>
                <Typography variant="subtitle2">Primary RX:</Typography>
                <span>{currentPharmacist.primaryRx}</span>
              </div>
              <div>
                <Typography variant="subtitle2">Hire Date:</Typography>
                <span>{formattedHireDate}</span>
              </div>
            </div>
          </div>
          <div className={styles.pharmacyListContainer}>
            <Typography gutterBottom>Assigned Pharmacies:</Typography>
            <PharmacyList2 maxHeight={200} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
