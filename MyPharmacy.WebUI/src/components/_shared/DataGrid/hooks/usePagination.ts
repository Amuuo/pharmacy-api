import { useState } from "react";
import _ from "lodash"; // Added

export interface GridPaginationModel { // Moved locally
   page: number;
   pageSize: number;
}

export default function usePagination(initialState: GridPaginationModel) {
   const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(initialState);

   const handlePaginationModelChange = (newModel: GridPaginationModel) => {
      if (!_.isEqual(paginationModel, newModel)) { // Added lodash usage
         if (paginationModel.pageSize !== newModel.pageSize) {
            newModel.page = 0;
         }
         setPaginationModel(newModel);
      }
   };

   return {
      paginationModel,
      handlePaginationModelChange,
   };
}