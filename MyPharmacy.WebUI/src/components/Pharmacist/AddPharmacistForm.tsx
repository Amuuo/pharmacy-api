import { useEffect, useState } from "react";
import { Pharmacist } from "../../models/pharmacist";
import { addPharmacistFx } from "../../stores/pharmacistStore";
import styles from "./AddPharmacistForm.module.scss";
import { usePharmacistStore } from "../../stores/pharmacistStoreTest";

export default function AddPharmacistForm() {
   const [formData, setFormData] = useState<Pharmacist>({
      firstName: "",
      lastName: "",
      age: undefined,
      hireDate: new Date(),
      primaryRx: "",
   });

   const { selectedPharmacist } = usePharmacistStore();

   useEffect(() => {
      setFormData({
         firstName: selectedPharmacist?.firstName,
         lastName: selectedPharmacist?.lastName,
         age: selectedPharmacist?.age,
         hireDate: selectedPharmacist?.hireDate,
         primaryRx: selectedPharmacist?.primaryRx,
      });
   }, [selectedPharmacist]);

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name in formData) {
         setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
         }));
      }
   };

   const handleOnSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addPharmacistFx(formData);
   };

   const inputFields = [
      { id: "firstName", type: "text", placeholder: "First Name", required: true },
      { id: "lastName", type: "text", placeholder: "Last Name", required: true },
      { id: "age", type: "number", placeholder: "Age" },
      { id: "hireDate", type: "date", placeholder: "Hire Date" },
      { id: "primaryRx", type: "text", placeholder: "Primary RX" },
   ];

   return (
      <form className={styles.add_pharmacist_form} onSubmit={handleOnSubmit}>
         {inputFields.map(({ id, type, placeholder, required }) => (
            <div key={id}>
               <label htmlFor={id}>{placeholder}:</label>
               <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id as keyof Pharmacist]?.toString() || ""}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  required={required}
               />
            </div>
         ))}
         <button type="submit">Add Pharmacist</button>
      </form>
   );
}
