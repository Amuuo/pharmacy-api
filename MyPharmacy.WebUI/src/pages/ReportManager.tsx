import { LinearProgress } from "@mui/material";
import { useStore } from "effector-react";
import PharmacyList from "../components/Pharmacy/PharmacyList";
import { pharmacyStore } from "../stores/pharmacyStore";

export default function ReportManager() {
   const { loading } = useStore(pharmacyStore);

   return <>{loading ? <LinearProgress /> : <PharmacyList />}</>;
}
