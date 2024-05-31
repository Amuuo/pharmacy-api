// import LaunchIcon from "@mui/icons-material/Launch";
// import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { usePharmacyStore } from "../../stores/pharmacyStoreTest";
// import styles from "./PharmacyCard.module.scss";

// export default function PharamcySelectionCard() {

//    //const { pharmacyList, initialLoad } = useStore(pharmacyStore);
//    const { selectedPharmacy, pharmacyList, initialLoad } = usePharmacyStore();

//    const [isOutgoing, setIsOutgoing] = useState(false);
//    const [currentPharmacy, setCurrentPharmacy] = useState(selectedPharmacy);

//    useEffect(() => {
//       if (selectedPharmacy == null) setCurrentPharmacy(pharmacyList[0]);
//    }, [pharmacyList]);

//    useEffect(() => {
//       setIsOutgoing(true);

//       setTimeout(() => {
//          setCurrentPharmacy(selectedPharmacy);
//          setIsOutgoing(false);
//       }, 200);
//    }, [selectedPharmacy?.id]);

//    return (
//       <>
//          {!currentPharmacy?.name ? null : (
//             <div className={styles.pharmacy_selection}>
//                <Card className={`${styles.pharmacy_card} ${isOutgoing ? styles.outgoing : styles.incoming}`}>
//                   <CardMedia
//                      component="img"
//                      height="150px"
//                      image="src\images\frostydog2_A_Walgreens_store_front_907b0e02-577c-44f6-aac7-2080df187234.png"
//                   />
//                   <CardHeader
//                      title={currentPharmacy.name}
//                      action={<LaunchIcon style={{ cursor: "pointer" }} />}
//                   />
//                   <CardContent>
//                      <Typography> {currentPharmacy.address} </Typography>
//                      <Typography gutterBottom>
//                         {`${currentPharmacy.city}, ${currentPharmacy.state} ${currentPharmacy.zip}`}
//                      </Typography>
//                      <Typography variant="subtitle2" color="text.secondary">
//                         {" "}
//                         RX Filled{" "}
//                      </Typography>
//                      {currentPharmacy.prescriptionsFilled}
//                   </CardContent>
//                </Card>
//             </div>
//          )}
//       </>
//    );
// }

import { useEffect, useState } from "react";
import { usePharmacyStore } from "../../stores/pharmacyStoreTest";
import styles from "./PharmacyCard.module.scss";

export default function PharmacySelectionCard() {
   const { selectedPharmacy, pharmacyList } = usePharmacyStore();

   const [isOutgoing, setIsOutgoing] = useState(false);
   const [currentPharmacy, setCurrentPharmacy] = useState(selectedPharmacy);

   useEffect(() => {
      if (selectedPharmacy == null) setCurrentPharmacy(pharmacyList[0]);
   }, [pharmacyList, selectedPharmacy]);

   useEffect(() => {
      setIsOutgoing(true);

      setTimeout(() => {
         setCurrentPharmacy(selectedPharmacy);
         setIsOutgoing(false);
      }, 200);
   }, [selectedPharmacy?.id]);

   return (
      <>
         {!currentPharmacy?.name ? null : (
            <div className={styles.pharmacy_selection}>
               <div
                  className={`${styles.pharmacy_card} ${isOutgoing ? styles.outgoing : styles.incoming}`}>
                  <img
                     src="src/assets/img/frostydog2_A_Walgreens_store_front_907b0e02-577c-44f6-aac7-2080df187234.png"
                     alt="Pharmacy"
                     height="100%"
                     className={styles.card_media}
                  />
                  <div className={styles.card_header}>
                     <h2>{currentPharmacy.name}</h2>
                     <span style={{ cursor: "pointer" }}>🚀</span>{" "}
                     {/* Replaced LaunchIcon with an emoji for simplicity */}
                  </div>
                  <div className={styles.card_content}>
                     <p>{currentPharmacy.address}</p>
                     <p>
                        {`${currentPharmacy.city}, ${currentPharmacy.state} ${currentPharmacy.zip}`}
                     </p>
                     <p className={styles.text_secondary}>RX Filled</p>
                     <p>{currentPharmacy.prescriptionsFilled}</p>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
