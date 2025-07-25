import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductManagerPage from "./pages/ProductManagerPage";
import LoginPage from "./pages/LoginPage"; // Пока можно сделать заглушку

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductManagerPage />} />
        <Route path="*" element={<div className="text-center mt-10 text-xl">Страница не найдена</div>} />
      </Routes>
    </Router>
  );
}
