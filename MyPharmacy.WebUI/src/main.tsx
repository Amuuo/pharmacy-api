import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.tsx";
import DeliveryPage from "./pages/DeliveryPage.tsx";
import PharmacistManager from "./pages/PharmacistManager.tsx";
import ReportManager from "./pages/ReportManager.tsx";
import WarehousePage from "./pages/WarehousePage.tsx";
import "./styles/index.scss";
import PharmacyPage from "./pages/PharmacyPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<PharmacyPage />} />
            <Route path="/pharmacists" element={<PharmacistManager />} />
            <Route path="/deliveries" element={<DeliveryPage />} />
            <Route path="/reports" element={<ReportManager />} />
            <Route path="/warehouse" element={<WarehousePage />} />
         </Route>
      </Routes>
   </BrowserRouter>,
);
