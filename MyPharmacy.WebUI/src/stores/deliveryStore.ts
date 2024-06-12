// import { createStore, createEffect } from "effector";
// import { Delivery } from "../models/delivery";
// import { GridPaginationModel } from "@mui/x-data-grid";

// type DeliveryState = {
//    deliveryList: Delivery[];
//    loading: boolean;
//    totalCount: number;
// };

// export const deliveryStore = createStore<DeliveryState>({
//    deliveryList: [],
//    loading: true,
//    totalCount: 0,
// });

// export const getDeliveryListByPharmacyIdFx = createEffect<number, any, Error>();
// export const getDeliveryList = createEffect<GridPaginationModel, any, Error>();

// getDeliveryListByPharmacyIdFx.use(async (pharmacyId: number) => {
//    const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/delivery/by-pharmacy/${pharmacyId}`,
//    );
//    return await response.json();
// });

// getDeliveryList.use(async (paginationModel: GridPaginationModel) => {
//    const url =
//       `${import.meta.env.VITE_API_URL}/delivery` +
//       `?pageNumber=${paginationModel.page}&pageSize=${paginationModel.pageSize}`;

//    const response = await fetch(url, {
//       method: "GET",
//       headers: {
//          "Content-Type": "application/json",
//       },
//    });
//    return await response.json();
// });

// deliveryStore
//    .on(getDeliveryListByPharmacyIdFx, (state) => {
//       return { ...state, loading: true };
//    })
//    .on(getDeliveryListByPharmacyIdFx.done, (state, { result }) => {
//       return {
//          ...state,
//          deliveryList: result,
//          loading: false,
//          totalCount: result.count,
//       };
//    })
//    .on(getDeliveryListByPharmacyIdFx.fail, (state, {}) => {
//       return { ...state, loading: false, deliveryList: [] };
//    })
//    .on(getDeliveryList, (state) => {
//       return { ...state, loading: true };
//    })
//    .on(getDeliveryList.done, (state, { result }) => {
//       return {
//          ...state,
//          loading: false,
//          deliveryList: result.data,
//          totalCount: result.count,
//       };
//    })
//    .on(getDeliveryList.fail, (state) => {
//       return { ...state, loading: false, deliveryList: [] };
//    });
import { create } from "zustand";
import { Delivery } from "../models/delivery";
import { GridPaginationModel } from "@mui/x-data-grid";

type DeliveryState = {
  deliveryList: Delivery[];
  loading: boolean;
  totalCount: number;
  cache: { [key: string]: { data: Delivery[]; count: number } };
  fetchDeliveryList: (paginationModel: GridPaginationModel) => Promise<void>;
  fetchDeliveryListByPharmacyId: (pharmacyId: number) => Promise<void>;
};

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  deliveryList: [],
  loading: true,
  totalCount: 0,
  cache: {},

  fetchDeliveryList: async paginationModel => {
    set(state => ({ ...state, loading: true }));

    const cacheKey = `${paginationModel.page}-${paginationModel.pageSize}`;
    const cachedData = get().cache[cacheKey];

    if (cachedData) {
      set(state => ({
        ...state,
        loading: false,
        deliveryList: cachedData.data,
        totalCount: cachedData.count,
      }));
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/delivery?pageNumber=${paginationModel.page}&pageSize=${paginationModel.pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      set(state => ({
        ...state,
        loading: false,
        deliveryList: result.data,
        totalCount: result.count,
        cache: {
          ...state.cache,
          [cacheKey]: { data: result.data, count: result.count },
        },
      }));
    } catch (error) {
      console.error("fetchDeliveryList error:", error);
      set(state => ({
        ...state,
        loading: false,
        deliveryList: [],
      }));
    }
  },

  fetchDeliveryListByPharmacyId: async pharmacyId => {
    set(state => ({ ...state, loading: true }));

    const cacheKey = `pharmacy-${pharmacyId}`;
    const cachedData = get().cache[cacheKey];

    if (cachedData) {
      set(state => ({
        ...state,
        loading: false,
        deliveryList: cachedData.data,
        totalCount: cachedData.count,
      }));
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/delivery/by-pharmacy/${pharmacyId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      set(state => ({
        ...state,
        loading: false,
        deliveryList: result,
        totalCount: result.count,
        cache: {
          ...state.cache,
          [cacheKey]: { data: result, count: result.count },
        },
      }));
    } catch (error) {
      console.error("fetchDeliveryListByPharmacyId error:", error);
      set(state => ({
        ...state,
        loading: false,
        deliveryList: [],
      }));
    }
  },
}));
