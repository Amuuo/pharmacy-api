import LaunchIcon from "@mui/icons-material/Launch";
import { Button, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener, GridRowSelectionModel } from "@mui/x-data-grid";
import { useStore } from "effector-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { Pharmacist } from "../../models/pharmacist";
import {
   fetchPharmacistListByPharmacyIdFx,
   fetchPharmacistListFx,
   pharmacistStore,
   setPharmacistSelection,
} from "../../stores/pharmacistStore";
import { usePharmacyStore } from "../../stores/pharmacyStoreTest";
import styles from "./PharmacistList.module.scss";

interface PharmacistListProps {
   selectForPharmacy?: boolean;
   enablePagination?: boolean;
}

export default function PharmacistList({ enablePagination = true }: PharmacistListProps) {
   const { paginationModel, handlePaginationModelChange } = usePagination({
      page: 0,
      pageSize: 10,
   });
   const { pharmacistList, loadingPharmacistList, totalCount } = useStore(pharmacistStore);
   const { selectedPharmacy } = usePharmacyStore(); //useStore(pharmacyStore);

   const navigate = useNavigate();

   useEffect(() => {
      if (!selectedPharmacy) fetchPharmacistListFx(paginationModel);
   }, [paginationModel]);

   useEffect(() => {
      fetchPharmacistListByPharmacyIdFx(selectedPharmacy?.id ?? 0);
   }, [selectedPharmacy?.id]);

   const columns = useMemo<GridColDef<Pharmacist>[]>(
      () => [
         {
            field: "fullName",
            headerName: "Pharmacist",
            width: 150,
            flex: 2,
            maxWidth: 150,
            valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
         },
         {
            field: "primaryRx",
            headerName: "Primary RX",
            width: 150,
            flex: 1,
            editable: true,
         },
         { field: "id", headerName: "ID", width: 100, hideable: true },
         {
            field: "firstName",
            headerName: "First Name",
            width: 130,
            hideable: true,
         },
         {
            field: "lastName",
            headerName: "Last Name",
            width: 130,
            hideable: true,
         },
         { field: "age", headerName: "Age", width: 80, hideable: true },
         {
            field: "hireDate",
            headerName: "Hire Date",
            width: 150,
            maxWidth: 150,
            hideable: true,
         },
         {
            field: "actions",
            headerName: "Action",
            renderHeader: () => <LaunchIcon />,
            width: 75,
            flex: 0.75,
            renderCell: () => {
               return (
                  <Button>
                     <LaunchIcon />
                  </Button>
               );
            },
         },
      ],
      [],
   );

   const handlePharmacistSelectionChange = (newSelectedPharmacist: GridRowSelectionModel) => {
      const selectedPharmacist = pharmacistList.find(
         (pharmacist) => pharmacist.id === newSelectedPharmacist[0],
      );
      setPharmacistSelection(selectedPharmacist || null);
   };

   const handleRowDoubleClick: GridEventListener<"rowDoubleClick"> = (params, _event) => {
      setPharmacistSelection(params.row);
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
      <DataGrid
         initialState={{
            columns: {
               columnVisibilityModel: {
                  firstName: false,
                  lastName: false,
                  hireDate: false,
                  age: false,
                  id: false,
               },
            },
         }}
         className={styles.pharmacistGrid}
         pagination={enablePagination ? true : undefined}
         paginationMode={enablePagination ? "server" : undefined}
         paginationModel={enablePagination ? paginationModel : undefined}
         hideFooter={!enablePagination}
         pageSizeOptions={[5, 10, 15]}
         rowCount={totalCount}
         rows={pharmacistList}
         onRowDoubleClick={handleRowDoubleClick}
         columns={columns}
         loading={loadingPharmacistList}
         rowHeight={30}
         columnHeaderHeight={35}
         onPaginationModelChange={handlePaginationModelChange}
         onRowSelectionModelChange={handlePharmacistSelectionChange}
      />
   );
}
