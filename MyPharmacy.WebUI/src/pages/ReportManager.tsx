import { LinearProgress } from "@mui/material";
import { useStore } from "effector-react";
import PharmacyList from "../components/Pharmacy/PharmacyList";
import { usePharmacyStore } from "../stores/pharmacyStore";

export default function ReportManager() {
   const { loading } = usePharmacyStore();

   return <>{loading ? <LinearProgress /> : <PharmacyList />}</>;
}
