import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { API_URL } from "../../src/assets/config";

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
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
    if (!confirm("Удалить заказ?")) return;
    await fetch(`${API_URL}/api/orders/${id}`, { method: "DELETE" });
    setOrders(orders.filter(o => o._id !== id));
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const searchLower = search.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchLower) ||
        (order.contact?.email || "").toLowerCase().includes(searchLower) ||
        (order.contact?.phone || "").toLowerCase().includes(searchLower);
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, search]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-yellow-700 mb-6">
        Заказы
      </motion.h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Фильтр по статусу */}
        <div className="flex items-center gap-3 bg-white shadow-md rounded-xl px-4 py-3 border border-gray-200 transition hover:shadow-lg">
          <label className="font-medium text-gray-700">Статус:</label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            >
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="processing">В обработке</option>
              <option value="completed">Завершённые</option>
              <option value="cancelled">Отменённые</option>
            </select>
            {/* стрелка вниз */}
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Поиск */}
        <div className="flex items-center gap-3 bg-white shadow-md rounded-xl px-4 py-3 border border-gray-200 transition hover:shadow-lg w-full md:w-80">
          <label className="font-medium text-gray-700">Поиск:</label>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ID, email или телефон"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition shadow-sm"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map(order => (
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
                  <Eye className="w-4 h-4 cursor-pointer" />
                </button>
                <button onClick={() => navigate(`/orders/${order._id}/edit`)} className="text-yellow-500 cursor-pointer">
                  Изменить
                </button>
                <button onClick={() => handleDelete(order._id)} className="text-red-500 cursor-pointer">
                  Удалить
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
