 // Start of Selection
import { LinearProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";
import { usePharmacyStore } from "../../stores/pharmacyStore";

import styles from "./PharmacistList.module.scss";
import DataGrid from "../_shared/DataGrid/DataGrid";
import { Pharmacist } from "../../models/pharmacist";

interface PharmacistListProps {
  selectForPharmacy?: boolean;
  enablePagination?: boolean;
  maxHeight?: number;  // Add maxHeight prop
}

const PharmacistList: React.FC<PharmacistListProps> = ({ enablePagination = true, maxHeight }) => {
  const { paginationModel, handlePaginationModelChange } = usePagination({
    page: 0,
    pageSize: 10,
  });

  const {
    pharmacistList,
    loadingPharmacistList,
    setPharmacistSelection,
    fetchPharmacistList,
    fetchPharmacistListByPharmacyId,
    selectedPharmacist,
    totalCount,
  } = usePharmacistStore();

  const { selectedPharmacy } = usePharmacyStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (enablePagination && !selectedPharmacy) {
      fetchPharmacistList(paginationModel);
    }
  }, [paginationModel, selectedPharmacy, fetchPharmacistList, enablePagination]);

  useEffect(() => {
    if (selectedPharmacy?.id) {
      fetchPharmacistListByPharmacyId(selectedPharmacy.id);
    }
  }, [selectedPharmacy?.id, fetchPharmacistListByPharmacyId]);

  const columns = useMemo(
    () => [
      {
        header: "Pharmacist",
        accessor: "fullName",
        width: "150px",
        render: (pharmacist: Pharmacist) => `${pharmacist.firstName} ${pharmacist.lastName}`,
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
    ],
    []
  );

  const handlePharmacistSelectionChange = (selectedIds: number[]) => {
    const selected = pharmacistList.find((pharmacist) => pharmacist.id === selectedIds[0]) || null;
    setPharmacistSelection(selected);
  };

  const handleRowDoubleClick = (pharmacist: Pharmacist) => {
    setPharmacistSelection(pharmacist);
    navigate("/pharmacists");
  };

  if (loadingPharmacistList) {
    return <LinearProgress className={styles.pharmacistGrid} sx={{ gridArea: "pharmacist" }} />;
  }

  if (pharmacistList.length === 0) {
    return <h3 style={{ textAlign: "center", gridArea: "pharmacist" }}>No pharmacists found...</h3>;
  }

  return (
    <div className={styles.pharmacistListContainer}>
      <DataGrid
        data={pharmacistList}
        columns={columns}
        enableFilters={false}
        onRowSelect={handlePharmacistSelectionChange}
        onDoubleClick={handleRowDoubleClick}
        pageNumber={paginationModel.page}        // Added
        pageSize={paginationModel.pageSize}      // Added
        totalCount={totalCount}                  // Added
        onPageChange={(newPage) => handlePaginationModelChange({ ...paginationModel, page: newPage })} // Added
        onPageSizeChange={(newSize) => handlePaginationModelChange({ page: 0, pageSize: newSize })} // Added
        maxHeight={maxHeight}  // Pass maxHeight prop
      />
    </div>
  );
};

export default PharmacistList;
