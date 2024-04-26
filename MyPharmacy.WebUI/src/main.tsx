import ReactDOM from "react-dom/client";
import PharmacyManager from "./pages/PharmacyManager/PharmacyManager.tsx";
import "./styles/index.scss";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ReportManager from "./pages/ReportManager/ReportManager.tsx";
import PharmacistManager from "./pages/PharmacistManager/PharmacistManager.tsx";
import WarehousePage from "./pages/WarehousePage/WarehousePage.tsx";
import DeliveryManager from "./pages/DeliveryManager/DeliveryManager.tsx";
import Layout from "./layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <RouterProvider router={router}/>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PharmacyManager />} />
        <Route path="/pharmacists" element={<PharmacistManager />} />
        <Route path="/deliveries" element={<DeliveryManager />} />
        <Route path="/reports" element={<ReportManager />} />
        <Route path="/warehouse" element={<WarehousePage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
