import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../assets/config";
import TicketList from "../../components/support/TicketList";

export default function SupportPage() {
    const [tickets, setTickets] = useState([]);
    const [activeTab, setActiveTab] = useState("awaiting reply");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/support`)
            .then(res => setTickets(res.data))
            .catch(err => console.error("Ошибка при загрузке тикетов:", err));
    }, []);

    const awaitingCount = tickets.filter(t => t.status === "awaiting reply").length;
    const answeredCount = tickets.filter(t => t.status === "answered").length;

    const filtered = tickets.filter(t => t.status === activeTab);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Обращения в поддержку</h1>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setActiveTab("awaiting reply")}
                    className={`px-3 py-2 rounded text-sm cursor-pointer ${activeTab === "awaiting reply"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                        }`}
                >
                    Ожидают ответа ({awaitingCount})
                </button>
                <button
                    onClick={() => setActiveTab("answered")}
                    className={`px-3 py-2 rounded text-sm cursor-pointer ${activeTab === "answered" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                >
                    Закрытые ({answeredCount})
                </button>
            </div>


            <TicketList tickets={filtered} onSelect={(ticket) => navigate(`/support/${ticket._id}`)} />
        </div>
    );
}
