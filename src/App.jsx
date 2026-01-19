import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductManagerPage from "./pages/ProductManagerPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import FileDropzone from "./components/FileDropzone";
import PrintPriceUploader from "./pages/PrintPriceUploader";
import PatternManager from "./components/PatternManager";
import SupportPage from "./pages/support/SupportPage";
import SupportTicketPage from "./pages/support/SupportTicketPage";
import OrdersListPage from "./pages/OrdersListPage";
import OrderEditPage from "./pages/OrderEditPage";
import OrderViewPage from "./pages/OrderViewPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/products" element={<ProductManagerPage />} />
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/orders/:id/edit" element={<OrderEditPage />} />
          <Route path="/orders/:id" element={<OrderViewPage />} />
          <Route path="/import-products" element={<FileDropzone />} />
          <Route path="/pricing-price-uploader" element={<PrintPriceUploader />} />
          <Route path="/patterns-manage" element={<PatternManager />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support/:ticketId" element={<SupportTicketPage />} />
        </Route>

        <Route path="*" element={<div className="text-center mt-10 text-xl">Страница не найдена</div>} />
      </Routes>
    </Router>
  );
}
