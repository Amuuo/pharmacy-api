import LaunchIcon from "@mui/icons-material/Launch";
import { Button, LinearProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";
import { usePharmacyStore } from "../../stores/pharmacyStoreTest";

import styles from "./PharmacistList.module.scss";
import DataGrid from "../_shared/DataGrid/DataGrid";

interface PharmacistListProps {
   selectForPharmacy?: boolean;
   enablePagination?: boolean;
}

export default function PharmacistList({ enablePagination = true }: PharmacistListProps) {
   const { paginationModel, handlePaginationModelChange } = usePagination({
      page: 0,
      pageSize: 10,
   });
   const {
      pharmacistList,
      loadingPharmacistList,
      totalCount,
      setPharmacistSelection,
      fetchPharmacistList,
      fetchPharmacistListByPharmacyId,
   } = usePharmacistStore();
   const { selectedPharmacy } = usePharmacyStore();
   const { selectedPharmacist } = usePharmacistStore();

   const navigate = useNavigate();

   useEffect(() => {
      if (!selectedPharmacy) fetchPharmacistList(paginationModel);
   }, [paginationModel]);

   useEffect(() => {
      fetchPharmacistListByPharmacyId(selectedPharmacy?.id ?? 0);
   }, [selectedPharmacy?.id]);

   const columns = useMemo(
      () => [
         {
            header: "Pharmacist",
            accessor: "fullName",
            width: "150px",
            render: (item: any) => `${item.firstName} ${item.lastName}`,
         },
         {
            header: "Primary RX",
            accessor: "primaryRx",
            width: "150px",
         },
         { header: "ID", accessor: "id", width: "100px", visible: false },
         { header: "First Name", accessor: "firstName", width: "130px", visible: false },
         { header: "Last Name", accessor: "lastName", width: "130px", visible: false },
         { header: "Age", accessor: "age", width: "80px", visible: false },
         { header: "Hire Date", accessor: "hireDate", width: "150px", visible: false },
         // {
         //    header: "Action",
         //    accessor: "actions",
         //    width: "75px",
         //    render: () => (
         //       <Button>
         //          <LaunchIcon />
         //       </Button>
         //    ),
         // },
      ],
      []
   );

   const handlePharmacistSelectionChange = (newSelectedPharmacist: any) => {
      const selectedPharmacist = pharmacistList.find(
         (pharmacist) => pharmacist.id === newSelectedPharmacist[0]
      );
      setPharmacistSelection(selectedPharmacist || null);
   };

   const handleRowDoubleClick = (params: any) => {
      setPharmacistSelection(params);
      navigate("/pharmacists");
   };

   if (loadingPharmacistList) {
      return <LinearProgress className={styles.pharmacistGrid} sx={{ gridArea: "pharmacist" }} />;
   } else if (pharmacistList.length === 0) {
      return (
         <h3 style={{ textAlign: "center", gridArea: "pharmacist" }}>No pharmacists found...</h3>
      );
   }

   return (
      <div className={styles.pharmacistGrid}>
         <DataGrid
            onRowSelect={handlePharmacistSelectionChange}
            onDoubleClick={handleRowDoubleClick}
            data={pharmacistList}
            columns={columns}                  
         />
      </div>
   );
}
