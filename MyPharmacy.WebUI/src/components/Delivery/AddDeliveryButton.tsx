import React from "react";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { useStore } from "effector-react";
import { pharmacyStore } from "../../stores/pharmacyStore";
import { Delivery } from "../../models/delivery";

const AddDeliveryButton: React.FC = () => {
  const { createNewDelivery } = useDeliveryStore();
  const { selectedPharmacy } = useStore(pharmacyStore);

  const handleAddDelivery = async () => {
    if (selectedPharmacy) {
      const newDelivery: Delivery = {
         PharmacyId: selectedPharmacy.id || 0,
         WarehouseId: 1, // Add other necessary fields for the delivery here
         DrugName: "druglist", // Add other necessary fields for the delivery here
         UnitCount: 1, // Add other necessary fields for the delivery here
         UnitPrice: 1, // Add other necessary fields for the delivery here
         DeliveryDate: new Date(),
         TotalPrice: 1,
         Id: 0
      };
      await createNewDelivery(newDelivery);
    } else {
      console.error("No pharmacy selected");
    }
  };

  return (
    <button onClick={handleAddDelivery} disabled={!selectedPharmacy}>
      Add Delivery
    </button>
  );
};

export default AddDeliveryButton;
