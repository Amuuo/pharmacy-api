import { useEffect } from "react";
import moment from "moment";
import usePagination from "../../hooks/usePagination";
import { Delivery } from "../../models/delivery";

import { usePharmacyStore } from "../../stores/pharmacyStore";
import styles from "./DeliveryList.module.scss";
import DataGrid, { Column } from "../_shared/DataGrid/DataGrid";
import { useDeliveryStore } from "../../stores/deliveryStore";

interface DeliveryListProps {
   height?: string;
   maxHeight?: number;  // Add maxHeight prop
   enablePagination?: boolean;
}

export default function DeliveryList({
   height = "150px",
   maxHeight = 400,  // Set maxHeight to 400px
   enablePagination = true,
}: DeliveryListProps) {
   const { selectedPharmacy } = usePharmacyStore();
   const { deliveryList, loading, totalCount, fetchDeliveryList, fetchDeliveryListByPharmacyId } =
      useDeliveryStore();
   const { paginationModel, handlePaginationModelChange } = usePagination({
      page: 0,
      pageSize: 15,
   });

   useEffect(() => {
      if (selectedPharmacy?.id) {
         fetchDeliveryListByPharmacyId(selectedPharmacy.id, paginationModel);
      } else {
         fetchDeliveryList(paginationModel);
      }
   }, [selectedPharmacy?.id, fetchDeliveryList, fetchDeliveryListByPharmacyId, paginationModel.page, paginationModel.pageSize]);

   const formatCurrency = (value: number) =>
      new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
      }).format(value);

   const columns: Column[] = [
      { header: "Drug Name", accessor: "drugName", visible: true },
      { header: "Count", textAlign: "right", accessor: "unitCount", visible: true },
      {
         header: "Price",
         accessor: "unitPrice",
         textAlign: "right",
         visible: true,
         render: (item: Delivery) => formatCurrency(item.unitPrice),
      },
      {
         header: "Total",
         accessor: "totalPrice",
         textAlign: "right",
         visible: true,
         render: (item: Delivery) => formatCurrency(item.totalPrice ?? 0),
      },
      {
         header: "Delivery Date",
         accessor: "deliveryDate",
         textAlign: "center",
         visible: true,
         render: (item: Delivery) => moment(item.deliveryDate).format("MM-DD-YY"),
      },
   ];

   const isPharmacySelected = () => {
      return !selectedPharmacy?.id && deliveryList?.length === 0;
   };

   return isPharmacySelected() ? null : loading ? (
      <div>Loading...</div>
   ) : deliveryList?.length === 0 ? (
      <h3 style={{ textAlign: "center" }} className="delivery-list">
         No deliveries found...
      </h3>
   ) : (
      <div className={styles.DeliveryListContainer} style={{ maxHeight: maxHeight }}>
         <DataGrid
            data={deliveryList || []}  // Ensure deliveryList is defined
            columns={columns}
            enableFilters={false}
            pageNumber={paginationModel.page}
            pageSize={paginationModel.pageSize}
            totalCount={totalCount}
            onPageChange={(newPage) => handlePaginationModelChange({ ...paginationModel, page: newPage })}
            onPageSizeChange={(newSize) => handlePaginationModelChange({ page: 0, pageSize: newSize })}
            maxHeight={maxHeight}  // Pass maxHeight prop
         />
      </div>
   );
}
