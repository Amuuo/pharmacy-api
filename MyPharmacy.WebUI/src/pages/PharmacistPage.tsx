import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";
import PharmacistCard from "../components/Pharmacist/PharmacistCard";
import PharmacistList from "../components/Pharmacist/PharmacistList";
import { pharmacyStore } from "../stores/pharmacyStore";
import "./PharmacistPage.scss";

export default function PharmacistPage() {
   useStore(pharmacyStore);

   const navigate = useNavigate();

   const handleClick = () => {
      navigate("/");
   };

   return (
      <div className="PharmacistManager slide-in-from-top">
         <PharmacistList enablePagination={false} />
         <PharmacistCard />
         {/* <AddPharmacistForm /> */}
         <button
            onClick={handleClick}
            title="click me"
            type="button"
            style={{ height: "40px", width: "150px" }}>
            Click Me
         </button>
      </div>
   );
}
