import { create } from "zustand";
import { Delivery } from "../models/delivery";
import { GridPaginationModel } from "@mui/x-data-grid";

type DeliveryState = {
  deliveryList: Delivery[];
  loading: boolean;
  totalCount: number;
  cache: { [key: string]: { data: Delivery[]; count: number } };
  fetchDeliveryList: (paginationModel: GridPaginationModel) => Promise<void>;
  fetchDeliveryListByPharmacyId: (pharmacyId: number, paginationModel: GridPaginationModel) => Promise<void>;
};

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  deliveryList: [],
  loading: true,
  totalCount: 0,
  cache: {},

  fetchDeliveryList: async (paginationModel) => {
    set(state => ({ ...state, loading: true }));

    const pageNumber = paginationModel.page + 1; // 1-based
    const cacheKey = `${pageNumber}-${paginationModel.pageSize}`;
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
      const url = `${import.meta.env.VITE_API_URL}/delivery?pageNumber=${pageNumber}&pageSize=${paginationModel.pageSize}`;
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

  fetchDeliveryListByPharmacyId: async (pharmacyId, paginationModel) => {
    set(state => ({ ...state, loading: true }));

    const pageNumber = paginationModel.page + 1; // 1-based
    const cacheKey = `pharmacy-${pharmacyId}-page-${pageNumber}-size-${paginationModel.pageSize}`;
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
      const url = `${import.meta.env.VITE_API_URL}/delivery/by-pharmacy/${pharmacyId}?pageNumber=${pageNumber}&pageSize=${paginationModel.pageSize}`;
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
      console.error("fetchDeliveryListByPharmacyId error:", error);
      set(state => ({
        ...state,
        loading: false,
        deliveryList: [],
      }));
    }
  },
}));
