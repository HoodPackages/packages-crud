import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../public/config";
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

    const filtered = tickets.filter(t => t.status === activeTab);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Обращения в поддержку</h1>

            <div className="flex gap-2 mb-4">
                {["awaiting reply", "answered"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveTab(status)}
                        className={`px-3 py-2 rounded text-sm ${activeTab === status ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                        {status === "awaiting reply" ? "Ожидают ответа" : "Отвеченные"}
                    </button>
                ))}
            </div>

            <TicketList tickets={filtered} onSelect={(ticket) => navigate(`/support/${ticket._id}`)} />
        </div>
    );
}
