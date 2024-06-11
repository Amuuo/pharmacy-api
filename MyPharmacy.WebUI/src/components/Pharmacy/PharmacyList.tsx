import { useEffect } from "react";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";
import { usePharmacyStore } from "../../stores/pharmacyStoreTest";
import styles from "./PharmacyList.module.scss";
import usePagination from "../../hooks/usePagination";
import DataGrid from "../_shared/DataGrid/DataGrid";

interface PharmacyListProps {
   selectForPharmacist?: boolean;
   maxHeight?: number;
}

export default function PharmacyList2({ selectForPharmacist, maxHeight }: PharmacyListProps) {
   const {
      selectedPharmacistPharmacies,
      pharmacyList,
      loading,
      initialLoad,
      fetchPharmacyListByPharmacistId,
      setPharmacySelection,
   } = usePharmacyStore();

   const { selectedPharmacist } = usePharmacistStore();
   const { paginationModel, handlePaginationModelChange } = usePagination({
      page: 0,
      pageSize: 50,
   });
   const { fetchPharmacyList } = usePharmacyStore();

   useEffect(() => {
      fetchPharmacyList(paginationModel);
   }, []);

   useEffect(() => {
      if (selectForPharmacist && selectedPharmacist?.id)
         fetchPharmacyListByPharmacistId(selectedPharmacist?.id);
   }, [selectedPharmacist]);

   const handleRowSelect = (selectedRow: any) => {
      setPharmacySelection(selectedRow);
   };

   const columns = [
      { header: "Name", accessor: "name", visible: true },
      { header: "City", accessor: "city", visible: true },
      { header: "State", accessor: "state", visible: true },
      { header: "Zip", accessor: "zip", visible: true },
      { header: "Address", accessor: "address", visible: true },
      { header: "RX Filled", accessor: "prescriptionsFilled", visible: true },
      { header: "Created Date", accessor: "createdDate", visible: false },
      { header: "Updated Date", accessor: "updatedDate", visible: false },
   ];

   return (
      <div className={styles.PharmacyListContainer} style={{ maxHeight: maxHeight }}>
         {initialLoad ? (
            <div>Loading...</div> // Replace with a loading indicator as needed
         ) : (
            <DataGrid
               data={selectForPharmacist ? selectedPharmacistPharmacies : pharmacyList}
               columns={columns}
               enableFilters={false}
               onRowSelect={handleRowSelect} // Pass the callback
            />
         )}
      </div>
   );
}
