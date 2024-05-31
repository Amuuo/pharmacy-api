import { Button } from "@mui/material";
import DeliveryList from "../components/Delivery/DeliveryList";
import PharmacistList from "../components/Pharmacist/PharmacistList";
import PharamcySelectionCard from "../components/Pharmacy/PharmacyCard";
import PharmacyList from "../components/Pharmacy/PharmacyList";
import CalendarIcon from "../components/_shared/CalendarIcon";
import "./PharmacyManager.scss";

export default function PharmacyManager() {
   const handleDeliveryButtonHover = (tmp: any) => {
      console.log(tmp);
   };

   return (
      <div className="PharmacyManager slide-in-from-top">
         <PharmacyList selectForPharmacist={false} />
         <PharmacistList selectForPharmacy={true} enablePagination={false} />
         <PharamcySelectionCard />
         <Button sx={{ height: 50, width: "fit-content" }} onMouseOver={handleDeliveryButtonHover}>
            Deliveries
         </Button>
         <DeliveryList height={"100px"} maxHeight={"100px"} enablePagination={true} />
         <div>
            <CalendarIcon height={50} width={50} />
            <CalendarIcon height={50} width={50} />
            <CalendarIcon height={50} width={50} />
            <CalendarIcon height={50} width={50} />
         </div>
      </div>
   );
}
