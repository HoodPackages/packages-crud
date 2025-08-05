import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../assets/config";

export default function SupportPage() {
    const [tickets, setTickets] = useState([]);
    const [selected, setSelected] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [activeTab, setActiveTab] = useState("awaiting reply");
    const { ticketId } = useParams(); // если открыли тикет по ссылке
    const navigate = useNavigate();

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/support`);
            setTickets(res.data);
        } catch (err) {
            console.error("Ошибка при загрузке тикетов:", err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    useEffect(() => {
        if (ticketId && tickets.length > 0) {
            const found = tickets.find((t) => t._id === ticketId);
            if (found) {
                setSelected(found);
                setActiveTab(found.status);
            }
        }
    }, [ticketId, tickets]);

    const handleReply = async () => {
        if (!replyText.trim()) return alert("Введите текст ответа");

        try {
            await axios.post(`${API_URL}/api/support/${selected._id}/reply`, {
                text: replyText,
            });
            alert("Ответ отправлен");
            setReplyText("");
            setSelected(null);
            fetchTickets();
        } catch (err) {
            console.error("Ошибка при отправке ответа:", err);
            alert("Ошибка при отправке");
        }
    };

    const filteredTickets = tickets.filter((t) => t.status === activeTab);

    const handleSelectTicket = (t) => {
        setSelected(t);
        navigate(`/support/${t._id}`);
    };

    return (
        <div className="p-2 sm:p-4">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                Обращения в поддержку
            </h1>

            {/* Вкладки */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                <button
                    onClick={() => {
                        setActiveTab("awaiting reply");
                        setSelected(null);
                        navigate("/support");
                    }}
                    className={`px-3 py-2 rounded text-sm ${activeTab === "awaiting reply"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                        }`}
                >
                    Ожидают ответа
                </button>
                <button
                    onClick={() => {
                        setActiveTab("answered");
                        setSelected(null);
                        navigate("/support");
                    }}
                    className={`px-3 py-2 rounded text-sm ${activeTab === "answered"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200"
                        }`}
                >
                    Отвеченные
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Список тикетов */}
                <div className="border rounded p-2 max-h-[80vh] overflow-y-auto">
                    {filteredTickets.length === 0 ? (
                        <p className="text-gray-500">Нет обращений</p>
                    ) : (
                        filteredTickets.map((t) => (
                            <div
                                key={t._id}
                                className={`p-2 cursor-pointer rounded text-sm ${selected?._id === t._id ? "bg-gray-200" : "hover:bg-gray-100"
                                    }`}
                                onClick={() => handleSelectTicket(t)}
                            >
                                <p className="font-semibold truncate">
                                    #{t.ticketNumber} — {t.subject}
                                </p>
                                <p className="text-xs text-gray-500">{t.from}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Контент тикета */}
                <div className="md:col-span-2 border rounded p-4 max-h-[80vh] overflow-y-auto">
                    {selected ? (
                        <>
                            <h2 className="text-lg sm:text-xl font-bold mb-1">
                                #{selected.ticketNumber} — {selected.subject}
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">{selected.from}</p>

                            <div className="space-y-4 mb-4 max-h-[50vh] overflow-y-auto pr-1">
                                {selected.messages?.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded text-sm ${msg.direction === "in"
                                            ? "bg-gray-100 text-left"
                                            : "bg-blue-100 text-right"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(msg.date).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {selected.status === "awaiting reply" ? (
                                <>
                                    <textarea
                                        className="w-full p-2 border rounded text-sm"
                                        placeholder="Ваш ответ..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows={4}
                                    />
                                    <button
                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-sm"
                                        onClick={handleReply}
                                    >
                                        Ответить
                                    </button>
                                </>
                            ) : (
                                <p className="text-green-700 font-semibold">
                                    Статус: Ответ отправлен
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-sm text-gray-500">Выберите обращение</p>
                    )}
                </div>
            </div>
        </div>

    );
}
