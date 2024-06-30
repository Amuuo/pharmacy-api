import DeliveryList from "../components/Delivery/DeliveryList";
import PharmacistList from "../components/Pharmacist/PharmacistList";
import PharamcySelectionCard from "../components/Pharmacy/PharmacyCard";
import "./PharmacyPage.scss";
import PharmacyList from "../components/Pharmacy/PharmacyList";

export default function PharmacyPage() {
   return (
      <div className="PharmacyPage slide-in-from-top">
         <PharmacyList></PharmacyList>
         {/* <PharmacyList selectForPharmacist={false} /> */}
         <PharmacistList enablePagination={false} />
         <PharamcySelectionCard />
         {/* <DeliveryList height={"100px"} maxHeight={"100px"} enablePagination={false} /> */}
         <DeliveryList enablePagination></DeliveryList>
      </div>
   );
}
