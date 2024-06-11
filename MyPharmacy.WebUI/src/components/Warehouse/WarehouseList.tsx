import { useEffect } from "react";
import { useStore } from "effector-react";
import { getWarehouseList, warehouseStore } from "../../stores/warehouseStore";
import styles from "./WarehouseList.module.scss";
import DataGrid from "../_shared/DataGrid/DataGrid";

export default function WarehouseList() {
   const { warehouseList, warehouseLoading } = useStore(warehouseStore);

   useEffect(() => {
      getWarehouseList();
   }, []);

   const columns = [
      { header: "Name", accessor: "name", visible: true },
      { header: "Address", accessor: "address", visible: true },
      { header: "City", accessor: "city", visible: true },
      { header: "State", accessor: "state", visible: true },
      { header: "Zip", accessor: "zip", visible: true },
   ];

   return (
      <div className={styles.WarehouseListContainer}>
         {warehouseLoading ? (
            <div>Loading...</div>
         ) : (
            <DataGrid data={warehouseList} columns={columns} enableFilters={true} />
         )}
      </div>
   );
}
