export type Delivery = {
   Id: number;
   WarehouseId: number | undefined;
   PharmacyId: number | undefined;
   DrugName: string;
   UnitCount: number | undefined;
   UnitPrice: number | undefined;
   TotalPrice?: number | undefined;
   DeliveryDate: Date | undefined;
};
