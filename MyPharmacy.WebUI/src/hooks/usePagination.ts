import { useState } from "react";
import isEqual from "lodash/isEqual";

export interface GridPaginationModel {
  page: number;
  pageSize: number;
}

export default function usePagination(initialState: GridPaginationModel) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(initialState);

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    if (!isEqual(paginationModel, newModel)) {
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
