import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/products"; // твой сервер

export default function App() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    image: "",
    basePrice: "",
  });
  const [editId, setEditId] = useState(null);

  // Получаем список пакетов
  const fetchPackages = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPackages(data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Создать или обновить
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // обновление
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // создание
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", description: "", type: "", image: "", basePrice: "" });
    setEditId(null);
    fetchPackages();
  };

  // Удалить
  const handleDelete = async (id) => {
    if (window.confirm("Удалить этот пакет?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchPackages();
    }
  };

  // Редактировать — заполнить форму
  const handleEdit = (pkg) => {
    setForm({
      name: pkg.name,
      description: pkg.description,
      type: pkg.type,
      image: pkg.image,
      basePrice: pkg.basePrice,
    });
    setEditId(pkg._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">CRUD Пакетов</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded shadow">
        <input
          className="input"
          placeholder="Название"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Описание"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Тип"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="URL картинки"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <input
          className="input"
          placeholder="Цена (число)"
          type="number"
          step="0.01"
          value={form.basePrice}
          onChange={e => setForm({ ...form, basePrice: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editId ? "Обновить" : "Создать"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", description: "", type: "", image: "", basePrice: "" });
            }}
            className="ml-4 px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
          >
            Отмена
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map(pkg => (
          <div key={pkg._id} className="bg-white rounded shadow p-4 flex space-x-4">
            {pkg.image && (
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{pkg.name}</h2>
              <p className="text-gray-600 text-sm">{pkg.description}</p>
              <p className="mt-1 text-sm font-medium text-indigo-600">Тип: {pkg.type}</p>
              <p className="text-green-600 font-bold mt-1">Цена: {pkg.basePrice} грн</p>
              <div className="mt-3 space-x-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
