import LaunchIcon from "@mui/icons-material/Launch";
import { Button, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import _ from "lodash";
import { useEffect, useMemo } from "react";
import usePagination from "../../hooks/usePagination";
import { Pharmacy } from "../../models/pharmacy";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";
import { usePharmacyStore } from "../../stores/pharmacyStoreTest";
import styles from "./PharmacyList.module.scss";

interface PharmacyListProps {
   selectForPharmacist?: boolean;
   selectAll?: boolean;
   hasAnimation?: boolean;
   maxHeight?: number;
   enablePagination?: boolean;
   enableFilters?: boolean;
   columnHeaderHeight?: number;
}

export default function PharmacyList({
   selectForPharmacist,
   maxHeight,
   enablePagination = true,
   enableFilters = true,
   columnHeaderHeight = 40,
}: PharmacyListProps) {
   const {
      selectedPharmacistPharmacies,
      pharmacyList,
      loading,
      initialLoad,
      totalCount,
      setPharmacySelection,
      fetchPharmacyList,
      editPharmacy,
      fetchPharmacyListByPharmacistId,
   } = usePharmacyStore();

   const { selectedPharmacist } = usePharmacistStore();

   const { paginationModel, handlePaginationModelChange } = usePagination({
      page: 0,
      pageSize: 15,
   });

   useEffect(() => {
      console.log("about to fetch pharmacy list");
      if (!selectForPharmacist) {
         fetchPharmacyList(paginationModel);
      }
   }, [paginationModel]);

   useEffect(() => {
      if (selectForPharmacist && selectedPharmacist?.id)
         fetchPharmacyListByPharmacistId(selectedPharmacist?.id);
   }, [selectedPharmacist]);

   const handlePharmacySelectionChange = (
      newSelectedPharmacy: GridRowSelectionModel,
   ) => {
      const selectedPharmacy = pharmacyList.find(
         (pharmacy) => pharmacy.id === newSelectedPharmacy[0],
      );
      setPharmacySelection(selectedPharmacy || null);
   };

   const handleEditCellChange = (
      updatedPharmacy: Pharmacy,
      originalPharmacy: Pharmacy,
   ) => {
      if (!_.isEqual(updatedPharmacy, originalPharmacy))
         editPharmacy(updatedPharmacy);
      return updatedPharmacy;
   };

   const columns = useMemo<GridColDef<Pharmacy>[]>(() => [
      {
         field: "name",
         headerName: "Name",
         width: 200,
         editable: true,
         flex: 2,
         hideable: true,
         resizable: true,
      },
      {
         field: "city",
         headerName: "City",
         width: 100,
         editable: true,
         flex: 1.5,
         hideable: true,
      },
      {
         field: "state",
         headerName: "State",
         width: 50,
         editable: true,
         flex: 0.75,
         hideable: true,
      },
      {
         field: "zip",
         headerName: "Zip",
         width: 80,
         editable: true,
         flex: 0.75,
         hideable: true,
      },
      { field: "id", headerName: "ID", width: 50, hideable: true },
      {
         field: "address",
         headerName: "Address",
         width: 200,
         flex: 1,
         editable: true,
         hideable: true,
      },
      {
         field: "actions",
         headerName: "",
         width: 25,
         flex: 0.75,
         renderCell: () => (
            <Button sx={{ color: "white" }}>
               <LaunchIcon sx={{ height: "15px", color: "cyan" }} />
            </Button>
         ),
      },
      {
         field: "prescriptionsFilled",
         headerName: "RX Filled",
         width: 100,
         type: "number",
         editable: true,
         hideable: true,
      },
      {
         field: "createdDate",
         headerName: "Created Date",
         width: 150,
         type: "date",
         editable: true,
         hideable: true,
      },
      {
         field: "updatedDate",
         headerName: "Updated Date",
         width: 150,
         type: "date",
         editable: true,
         hideable: true,
      },
   ], []);

   return (
      <>
         {initialLoad ? (
            <LinearProgress className={styles.PharmacyGrid} />
         ) : (
            <DataGrid
               className={styles.PharmacyGrid}
               sx={{ maxHeight: maxHeight, height: "auto" }}
               initialState={{
                  columns: {
                     columnVisibilityModel: {
                        id: false,
                        address: false,
                        prescriptionsFilled: false,
                        createdDate: false,
                        updatedDate: false,
                     },
                  },
               }}
               disableColumnFilter={!enableFilters}
               disableColumnSelector={!enableFilters}
               disableDensitySelector={!enableFilters}
               rows={
                  selectForPharmacist ? selectedPharmacistPharmacies : pharmacyList
               }
               disableColumnMenu={false}
               columns={columns}
               loading={loading}
               hideFooterSelectedRowCount={true}
               rowCount={totalCount}
               hideFooter={!enablePagination}
               pagination={enablePagination ? true : undefined}
               paginationMode={enablePagination ? "server" : undefined}
               paginationModel={enablePagination ? paginationModel : undefined}
               onPaginationModelChange={
                  enablePagination ? handlePaginationModelChange : undefined
               }
               pageSizeOptions={[5, 10, 15]}
               processRowUpdate={handleEditCellChange}
               onRowSelectionModelChange={handlePharmacySelectionChange}
               rowHeight={30}
               columnHeaderHeight={columnHeaderHeight}
               keepNonExistentRowsSelected={true}
            />
         )}
      </>
   );
}
