import DeliveryList from "../components/Delivery/DeliveryList";
import PharmacistList from "../components/Pharmacist/PharmacistList";
import PharamcySelectionCard from "../components/Pharmacy/PharmacyCard";
import "./PharmacyPage.scss";
import PharmacyList2 from "../components/Pharmacy/PharmacyList2";
import PharmacyList from "../components/Pharmacy/PharmacyList";

export default function PharmacyPage() {
   const handleDeliveryButtonHover = (tmp: any) => {
      console.log(tmp);
   };

   return (
      <div className="PharmacyPage slide-in-from-top">
         <PharmacyList2></PharmacyList2>
         {/* <PharmacyList selectForPharmacist={false} /> */}
         <PharmacistList selectForPharmacy={true} enablePagination={false} />
         <PharamcySelectionCard />
         {/* <Button sx={{ height: 50, width: "fit-content" }} onMouseOver={handleDeliveryButtonHover}>
            Deliveries
         </Button> */}
         <DeliveryList height={"100px"} maxHeight={"100px"} enablePagination={true} />
         {/* <div>
            <CalendarIcon height={50} width={50} />
            <CalendarIcon height={50} width={50} />
            <CalendarIcon height={50} width={50} />
            <CalendarIcon height={50} width={50} />
         </div> */}
      </div>
   );
}
