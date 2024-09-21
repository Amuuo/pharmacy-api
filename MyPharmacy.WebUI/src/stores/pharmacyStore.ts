import { create } from "zustand";
import { Pharmacy } from "../models/pharmacy";
import { GridPaginationModel } from "@mui/x-data-grid/models";

type PharmacyState = {
  pharmacyList: Pharmacy[];
  loading: boolean;
  initialLoad: boolean;
  selectedPharmacy: Pharmacy | null;
  selectedPharmacistPharmacies: Pharmacy[];
  totalCount: number;
  cache: { [key: string]: { data: Pharmacy[]; count: number } };
  setPharmacySelection: (pharmacy: Pharmacy | null) => void;
  fetchPharmacyList: (paginationModel: GridPaginationModel) => Promise<void>;
  editPharmacy: (pharmacy: Pharmacy) => Promise<void>;
  fetchPharmacyListByPharmacistId: (pharmacistId: number) => Promise<void>;
};

export const usePharmacyStore = create<PharmacyState>((set, get) => ({
  pharmacyList: [],
  loading: false,
  initialLoad: true,
  selectedPharmacy: null,
  selectedPharmacistPharmacies: [],
  totalCount: 0,
  cache: {},

  setPharmacySelection: pharmacy =>
    set(state => ({
      ...state,
      selectedPharmacy: pharmacy,
    })),

  fetchPharmacyList: async (paginationModel) => {
    set(state => ({ ...state, loading: true }));

    const cacheKey = `${paginationModel.page + 1}-${paginationModel.pageSize}`; // **Change: 1-based pageNumber**
    const cachedData = get().cache[cacheKey];

    if (cachedData) {
      set(state => ({
        ...state,
        loading: false,
        initialLoad: false,
        pharmacyList: cachedData.data,
        totalCount: cachedData.count,
      }));
      return;
    }

    try {
      const pageNumber = paginationModel.page + 1; // **1-based pageNumber**
      const url = `${import.meta.env.VITE_API_URL}/pharmacy?pageNumber=${pageNumber}&pageSize=${paginationModel.pageSize}`;
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
        initialLoad: false,
        pharmacyList: result.data,
        totalCount: result.count,
        cache: {
          ...state.cache,
          [cacheKey]: { data: result.data, count: result.count },
        },
      }));
    } catch (error) {
      console.error("fetchPharmacyList error:", error);
      set(state => ({ ...state, loading: false, pharmacyList: [] }));
    }
  },

  editPharmacy: async pharmacy => {
    set(state => ({ ...state, loading: true }));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pharmacy/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pharmacy),
      });
      const result = await response.json();
      set(state => ({
        ...state,
        pharmacyList: state.pharmacyList.map(p => (p.id === result.id ? result : p)),
        loading: false,
      }));
    } catch (error) {
      console.error("editPharmacy error:", error);
      set(state => ({ ...state, loading: false, pharmacyList: [] }));
    }
  },

  fetchPharmacyListByPharmacistId: async pharmacistId => {
    set(state => ({ ...state, loading: true }));
    try {
      const url = `${import.meta.env.VITE_API_URL}/pharmacy/by-pharmacist/${pharmacistId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      set(state => ({
        ...state,
        selectedPharmacistPharmacies: result,
        totalCount: result.count,
        loading: false,
      }));
    } catch (error) {
      console.error("fetchPharmacyListByPharmacistId error:", error);
      set(state => ({ ...state, loading: false, selectedPharmacistPharmacies: [] }));
    }
  },
}));
