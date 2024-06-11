import DeliveryList from "../components/Delivery/DeliveryList";
import PharmacistList from "../components/Pharmacist/PharmacistList";
import PharamcySelectionCard from "../components/Pharmacy/PharmacyCard";
import "./PharmacyPage.scss";
import PharmacyList2 from "../components/Pharmacy/PharmacyList2";
import DeliveryList2 from "../components/Delivery/DeliveryList2";

export default function PharmacyPage() {
   return (
      <div className="PharmacyPage slide-in-from-top">
         <PharmacyList2></PharmacyList2>
         {/* <PharmacyList selectForPharmacist={false} /> */}
         <PharmacistList enablePagination={false} />
         <PharamcySelectionCard />
         {/* <DeliveryList height={"100px"} maxHeight={"100px"} enablePagination={false} /> */}
         <DeliveryList2 enablePagination></DeliveryList2>
      </div>
   );
}
