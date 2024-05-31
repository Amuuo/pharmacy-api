import { create } from "zustand";
import { Pharmacist } from "../models/pharmacist";
import { GridPaginationModel } from "@mui/x-data-grid";
import { Pharmacy } from "../models/pharmacy";

type PharmacistState = {
   pharmacistList: Pharmacist[];
   loadingPharmacistList: boolean;
   addingPharmacist: boolean;
   selectedPharmacist: Pharmacist | null;
   activePharmacies: Pharmacy[];
   totalCount: number;
   setPharmacistSelection: (pharmacist: Pharmacist | null) => void;
   fetchPharmacistList: (paginationModel: GridPaginationModel) => Promise<void>;
   fetchPharmacistListByPharmacyId: (pharmacyId: number) => Promise<void>;
   addPharmacist: (pharmacist: Pharmacist) => Promise<void>;
};

export const usePharmacistStore = create<PharmacistState>(set => ({
   pharmacistList: [],
   loadingPharmacistList: false,
   addingPharmacist: false,
   selectedPharmacist: null,
   activePharmacies: [],
   totalCount: 0,

   setPharmacistSelection: pharmacist =>
      set(state => ({
         ...state,
         selectedPharmacist: pharmacist,
      })),

   fetchPharmacistList: async paginationModel => {
      set(state => ({ ...state, loadingPharmacistList: true }));
      try {
         const url = `${import.meta.env.VITE_API_URL}/pharmacist?pageNumber=${paginationModel.page}&pageSize=${paginationModel.pageSize}`;
         const response = await fetch(url, {
            method: "GET",
         });
         const result = await response.json();
         set(state => ({
            ...state,
            loadingPharmacistList: false,
            pharmacistList: result.data,
            totalCount: result.count,
         }));
      } catch (error) {
         console.error("fetchPharmacistList error:", error);
         set(state => ({
            ...state,
            loadingPharmacistList: false,
            pharmacistList: [],
         }));
      }
   },

   fetchPharmacistListByPharmacyId: async pharmacyId => {
      set(state => ({ ...state, loadingPharmacistList: true }));
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/pharmacist/by-pharmacy/${pharmacyId}`,
         );
         const result = await response.json();
         set(state => ({
            ...state,
            loadingPharmacistList: false,
            pharmacistList: result,
            totalCount: result.count,
         }));
      } catch (error) {
         console.error("fetchPharmacistListByPharmacyId error:", error);
         set(state => ({
            ...state,
            loadingPharmacistList: false,
            pharmacistList: [],
         }));
      }
   },

   addPharmacist: async pharmacist => {
      set(state => ({ ...state, addingPharmacist: true }));
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/pharmacist/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pharmacist),
         });
         const result = await response.json();
         set(state => ({
            ...state,
            pharmacistList: [...state.pharmacistList, result],
            addingPharmacist: false,
         }));
      } catch (error) {
         console.error("addPharmacist error:", error);
         set(state => ({ ...state, addingPharmacist: false }));
      }
   },
}));