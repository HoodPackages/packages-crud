import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../src/assets/config";

export default function OrderEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const [delivery, setDelivery] = useState({ method: "", address: "" });
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [layoutFile, setLayoutFile] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/orders/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setContact(data.contact || {});
                setDelivery(data.delivery || {});
                setCart(data.cart || []);
                setStatus(data.status || "new");
                setComment(data.comment || "");
                setPaymentMethod(data.paymentMethod || "");
            });
    }, [id]);

    const handleCartChange = (index, field, value) => {
        const updated = [...cart];
        updated[index][field] = field === "price" || field === "quantity" ? Number(value) : value;
        setCart(updated);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("contact", JSON.stringify(contact));
        formData.append("delivery", JSON.stringify(delivery));
        formData.append("cart", JSON.stringify(cart));
        formData.append("comment", comment);
        formData.append("paymentMethod", paymentMethod);
        formData.append("status", status);
        if (layoutFile) formData.append("layout", layoutFile);

        await fetch(`${API_URL}/api/orders/${id}`, {
            method: "PUT",
            body: formData,
        });

        navigate(`/orders/${id}`);
    };

    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        try {
            const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Ошибка обновления статуса");

            const updatedOrder = await response.json();
            console.log("✅ Статус обновлён", updatedOrder);

            setStatus(updatedOrder.status);
        } catch (err) {
            console.error("❌", err);
        }
    };

    if (!order)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Загрузка заказа...
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
                <h1 className="text-4xl font-bold text-yellow-700 mb-6 text-center">
                    Редактирование заказа #{order._id}
                </h1>

                {/* Контакт */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Контакт</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Имя / Название компании</label>
                            <input
                                type="text"
                                className="p-2 border rounded w-full"
                                placeholder="Имя / Название компании"
                                value={contact.name}
                                onChange={e => setContact({ ...contact, name: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="p-2 border rounded w-full"
                                placeholder="Email"
                                value={contact.email}
                                onChange={e => setContact({ ...contact, email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Телефон</label>
                            <input
                                type="text"
                                className="p-2 border rounded w-full"
                                placeholder="Телефон"
                                value={contact.phone}
                                onChange={e => setContact({ ...contact, phone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Доставка */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Доставка</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Метод доставки</label>
                            <input
                                type="text"
                                className="p-2 border rounded w-full"
                                placeholder="Метод доставки"
                                value={delivery.method}
                                onChange={e => setDelivery({ ...delivery, method: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Адреса</label>
                            <input
                                type="text"
                                className="p-2 border rounded w-full"
                                placeholder="Адреса"
                                value={delivery.address}
                                onChange={e => setDelivery({ ...delivery, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Товары */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Товары</h2>
                    {cart.map((item, i) => (
                        <div key={i} className="flex gap-2 mb-2 items-center">
                            <div className="flex-1 flex flex-col">
                                <label className="mb-1 font-medium text-gray-700">Название товара</label>
                                <input
                                    type="text"
                                    className="p-2 border rounded w-full"
                                    value={item.name}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700">Количество</label>
                                <input
                                    type="number"
                                    className="p-2 border rounded w-20"
                                    value={item.quantity}
                                    onChange={e => handleCartChange(i, "quantity", e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700">Цена</label>
                                <input
                                    type="number"
                                    className="p-2 border rounded w-24"
                                    value={item.price}
                                    onChange={e => handleCartChange(i, "price", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Оплата */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Оплата</h2>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Метод оплаты</label>
                        <input
                            type="text"
                            className="p-2 border rounded w-full"
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </div>
                </div>

                {/* Статус и Коментар */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Статус</label>
                        <select value={status} onChange={e => handleStatusChange(e.target.value)}>
                            <option value="new">Новый</option>
                            <option value="processing">В обработке</option>
                            <option value="shipped">Отправлен</option>
                            <option value="completed">Выполнен</option>
                            <option value="cancelled">Отменён</option>
                        </select>

                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Комментарий</label>
                        <textarea
                            className="p-2 border rounded w-full h-full"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </div>
                </div>

                {/* Макет */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Макет</h2>
                    {order.layout && order.layout.path && (
                        <div className="mb-4">
                            <img
                                src={`${API_URL}${order.layout.path}`}
                                alt="layout"
                                className="w-full max-w-md h-auto object-contain border rounded mx-auto"
                            />
                        </div>
                    )}
                    <input type="file" onChange={e => setLayoutFile(e.target.files[0])} />
                </div>

                {/* Сохранить */}
                <button
                    onClick={handleSave}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded w-full text-lg"
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
}
