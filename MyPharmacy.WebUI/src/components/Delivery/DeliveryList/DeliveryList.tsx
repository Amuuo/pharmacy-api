import { useEffect, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./DeliveryList.module.scss";
import { LinearProgress } from "@mui/material";
import { useStore } from "effector-react";
import {
  deliveryStore,
  getDeliveryList,
  getDeliveryListByPharmacyIdFx,
} from "../../../stores/deliveryStore";
import usePagination from "../../../hooks/usePagination";
import { pharmacyStore } from "../../../stores/pharmacyStore";
import { Delivery } from "../../../models/delivery";
import moment from "moment";

interface DeliveryListProps {
  height?: string;
  maxHeight?: string;
  enablePagination?: boolean;
}

export default function DeliveryList({
  height = "150px",
  maxHeight,
  enablePagination = true,
}: DeliveryListProps) {
  const { selectedPharmacy } = useStore(pharmacyStore);
  const { deliveryList, loading, totalCount } = useStore(deliveryStore);
  const { paginationModel, handlePaginationModelChange } = usePagination({
    page: 0,
    pageSize: 15,
  });

  useEffect(() => {
    if (selectedPharmacy?.id) {
      getDeliveryListByPharmacyIdFx(selectedPharmacy.id);
    } else {
      getDeliveryList(paginationModel);
    }
  }, [selectedPharmacy?.id]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  //const formatDate = (date: string) => moment(date).format("MM-DD-YY");

  const columns = useMemo<GridColDef<Delivery>[]>(
    () => [
      { field: "drugName", headerName: "Drug Name", width: 120 },
      { field: "unitCount", headerName: "Count", width: 60, type: "number" },
      {
        field: "unitPrice",
        headerName: "Price",
        width: 80,
        type: "number",
        valueFormatter: (price) => formatCurrency(price.value),
      },
      {
        field: "totalPrice",
        headerName: "Total",
        width: 100,
        type: "number",
        valueFormatter: (total) => formatCurrency(total.value),
      },
      {
        field: "deliveryDate",
        headerName: "Delivery Date",
        width: 150,
        valueFormatter: (deliveryDate) =>
          moment(deliveryDate.value).format("MM-DD-YY"),
      },
    ],
    [],
  );

  const isPharmacySelected = () => {
    return !selectedPharmacy?.id && deliveryList.length === 0;
  };

  return isPharmacySelected() ? null : loading ? (
    <LinearProgress sx={{ gridArea: "order" }} />
  ) : deliveryList.length === 0 ? (
    <h3 style={{ textAlign: "center" }} className="delivery-list">
      No deliveries found...
    </h3>
  ) : (
    <DataGrid
      sx={{ height: height, maxHeight: maxHeight }}
      className={styles.delivery_list}
      columns={columns}
      rows={deliveryList}
      rowHeight={30}
      rowCount={totalCount}
      pagination={enablePagination ? true : undefined}
      paginationMode={enablePagination ? "server" : undefined}
      paginationModel={enablePagination ? paginationModel : undefined}
      pageSizeOptions={[5, 10, 15]}
      onPaginationModelChange={
        enablePagination ? handlePaginationModelChange : undefined
      }
      hideFooter={!enablePagination}
      columnHeaderHeight={35}
    />
  );
}