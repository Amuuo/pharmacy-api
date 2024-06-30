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
  createNewDelivery: (delivery: Delivery) => Promise<void>;
};

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  deliveryList: [],
  loading: true,
  totalCount: 0,
  cache: {},

  createNewDelivery: async delivery => {
    set(state => ({ ...state, loading: true }));

    try {
      const url = `${import.meta.env.VITE_API_URL}/delivery`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(delivery),
      });
      if (response.ok) {
        await get().fetchDeliveryList({ page: 1, pageSize: 10 });
      }
    } catch (error) {
      console.error("createNewDelivery error:", error);
    }
  },

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
