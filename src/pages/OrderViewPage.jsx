import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../src/assets/config";

export default function OrderViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Завантаження замовлення...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 underline hover:text-blue-600 transition"
      >
        ← Назад
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-yellow-700 mb-6 text-center">
          Замовлення #{order._id}
        </h1>

        {/* Order info card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Деталі замовлення</h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><span className="font-semibold">Контакт:</span> {order.contact?.name || "—"}</p>
              <p><span className="font-semibold">Email:</span> {order.contact?.email || "—"}</p>
              <p><span className="font-semibold">Телефон:</span> {order.contact?.phone || "—"}</p>
            </div>

            <div>
              <p><span className="font-semibold">Доставка:</span> {order.delivery?.method || "—"} — {order.delivery?.address || "—"}</p>
              <p><span className="font-semibold">Оплата:</span> {order.paymentMethod || "—"}</p>
              <p><span className="font-semibold">Статус:</span> <span className={`px-2 py-1 rounded-full text-white ${order.status === "new" ? "bg-yellow-500" : "bg-gray-500"}`}>{order.status}</span></p>
              <p><span className="font-semibold">Коментар:</span> {order.comment || "—"}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Товари</h2>
          <ul className="divide-y divide-gray-200">
            {order.cart.map((i, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <span>{i.name}</span>
                <span className="font-semibold">{i.quantity} × {i.price} ₴</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Layout */}
        {order.layout && order.layout.path && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Макет</h2>
            <img
              src={`${API_URL}${order.layout.path}`}
              alt="layout"
              className="w-full max-w-md h-auto object-contain border rounded mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
