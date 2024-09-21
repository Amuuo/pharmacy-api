import { useEffect } from "react";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";
import { usePharmacyStore } from "../../stores/pharmacyStore";
import styles from "./PharmacyList.module.scss";
import usePagination from "../../hooks/usePagination";
import DataGrid from "../_shared/DataGrid/DataGrid";

interface PharmacyListProps {
  selectForPharmacist?: boolean;
  maxHeight?: number;
}

export default function PharmacyList({ selectForPharmacist, maxHeight }: PharmacyListProps) {
  const {
    selectedPharmacistPharmacies,
    pharmacyList,
    initialLoad,
    fetchPharmacyListByPharmacistId,
    setPharmacySelection,
    totalCount,
    fetchPharmacyList,
  } = usePharmacyStore();

  const { selectedPharmacist } = usePharmacistStore();
  const { paginationModel, handlePaginationModelChange } = usePagination({
    page: 0,
    pageSize: 50,
  });

  useEffect(() => {
    if (selectForPharmacist && selectedPharmacist?.id) {
      fetchPharmacyListByPharmacistId(selectedPharmacist.id);
    } else {
      fetchPharmacyList(paginationModel);
    }
  }, [
    paginationModel,
    selectForPharmacist,
    selectedPharmacist?.id,
    fetchPharmacyList,
    fetchPharmacyListByPharmacistId,
  ]);

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
    <div className={styles.PharmacyListContainer} style={{ maxHeight }}>
      {initialLoad ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          data={selectForPharmacist ? selectedPharmacistPharmacies : pharmacyList}
          columns={columns}
          enableFilters={false}
          onRowSelect={handleRowSelect}
          pageNumber={paginationModel.page}
          pageSize={paginationModel.pageSize}
          totalCount={totalCount}
          onPageChange={(newPage) =>
            handlePaginationModelChange({ ...paginationModel, page: newPage })
          }
          onPageSizeChange={(newSize) =>
            handlePaginationModelChange({ page: 0, pageSize: newSize })
          }
          maxHeight={maxHeight}
        />
      )}
    </div>
  );
}
