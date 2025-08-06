import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../public/config";
import TicketView from "../../components/support/TicketView";

export default function SupportTicketPage() {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/support/${ticketId}`)
            .then(res => setTicket(res.data))
            .catch(err => console.error("Ошибка при загрузке тикета:", err));
    }, [ticketId]);

    if (!ticket) return <p className="p-4">Загрузка...</p>;

    return (
        <div className="p-4">
            <TicketView ticket={ticket} />
        </div>
    );
}
