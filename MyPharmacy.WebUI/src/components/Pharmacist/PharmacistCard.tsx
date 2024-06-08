import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useStore } from "effector-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { pharmacistStore } from "../../stores/pharmacistStore";
import PharmacyList from "../Pharmacy/PharmacyList";
import styles from "./PharmacistCard.module.scss";
import PharmacyList2 from "../Pharmacy/PharmacyList2";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";

export default function PharmacistCard() {
   //const { selectedPharmacist } = useStore(pharmacistStore);
   const { selectedPharmacist } = usePharmacistStore();

   const [isOutgoing, setIsOutgoing] = useState(false);
   const [currentPharmacist, setCurrentPharmacist] = useState(selectedPharmacist);

   useEffect(() => {
      setIsOutgoing(true);

      setTimeout(() => {
         setCurrentPharmacist(selectedPharmacist);
         setIsOutgoing(false);
      }, 200);
   }, [selectedPharmacist?.id]);

   const currentPharmacistHireDate = () =>
      moment(currentPharmacist?.hireDate?.toString(), "YYYY-MM-DD").format("MM-DD-YYYY");

   return (
      <>
         {!currentPharmacist?.id ? null : (
            <div className={styles.pharmacist_selection}>
               <Card
                  className={`${styles.pharmacist_card} ${isOutgoing ? styles.outgoing : styles.incoming}`}>
                  <CardHeader
                     title={`${currentPharmacist.firstName} ${currentPharmacist.lastName}`}
                     subheader={
                        <div className={styles.card_buttons} style={{ marginTop: "20px" }}>
                           <button
                              className={styles.add_button}
                              type="button"
                              title="Assign Pharmacist">
                              Assign Pharamcist
                           </button>
                           <button
                              className={styles.edit_button}
                              type="button"
                              title="Edit Pharmacist">
                              Edit Pharamcist{" "}
                           </button>
                        </div>
                     }
                     action={
                        <Avatar
                           sx={{
                              bgcolor: "teal",
                              height: "60px",
                              width: "60px",
                              stroke: "white",
                              strokeWidth: "5px",
                           }}
                           aria-label="recipe">
                           {selectedPharmacist?.firstName}
                        </Avatar>
                     }></CardHeader>
                  <CardContent className={styles.cardContentStyle}>
                     <div className={styles.card_body}>
                        <div className={styles.card_content}>
                           <div>
                              <Typography variant="subtitle2"> Age: </Typography>
                              {currentPharmacist.age}
                           </div>
                           <div>
                              <Typography variant="subtitle2"> Primary RX: </Typography>
                              {currentPharmacist.primaryRx}
                           </div>
                           <div>
                              <Typography variant="subtitle2"> Hire Date: </Typography>
                              {currentPharmacistHireDate()}
                           </div>
                        </div>
                     </div>
                     <div className={styles.pharmacyListContainer}>
                        <Typography gutterBottom>Assigned Pharmacies:</Typography>
                        {/* <PharmacyList
                           columnHeaderHeight={30}
                           maxHeight={200}
                           selectForPharmacist={true}
                           enablePagination={false}
                           enableFilters={false}
                        /> */}
                        <PharmacyList2/>
                     </div>
                  </CardContent>
               </Card>
            </div>
         )}
      </>
   );
}
