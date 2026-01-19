import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { API_URL } from "../../src/assets/config";

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/orders`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Видалити замовлення?")) return;
    await fetch(`${API_URL}/api/orders/${id}`, { method: "DELETE" });
    setOrders(orders.filter(o => o._id !== id));
  };

  if (loading) return <div>Завантаження...</div>;

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                 className="text-3xl font-bold text-yellow-700 mb-6">
        Замовлення
      </motion.h1>

      <div className="grid gap-4">
        {orders.map(order => (
          <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl bg-white shadow p-4 grid md:grid-cols-6 gap-4 items-center">
              <div className="md:col-span-2">
                <p className="font-semibold">{order.contact?.name || "—"}</p>
                <p className="text-sm text-gray-500">{order.contact?.email}</p>
                <p className="text-sm text-gray-500">{order.contact?.phone}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>{order.delivery?.method || "—"}</p>
                <p className="truncate max-w-xs">{order.delivery?.address}</p>
              </div>
              <div className="text-center">{order.total.toFixed(2)} ₴</div>
              <div className="flex justify-center">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full
                  ${order.status === "new" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex gap-2 justify-end items-center">
                {order.layout && order.layout.path && (
                  <a href={`${API_URL}${order.layout.path}`} target="_blank" rel="noopener noreferrer">
                    <img src={`${API_URL}${order.layout.path}`} alt="layout" className="w-12 h-12 object-contain rounded border" />
                  </a>
                )}
                <button onClick={() => navigate(`/orders/${order._id}`)} className="text-blue-500">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => navigate(`/orders/${order._id}/edit`)} className="text-yellow-500">
                  Редагувати
                </button>
                <button onClick={() => handleDelete(order._id)} className="text-red-500">
                  Видалити
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
