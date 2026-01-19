import { useState } from "react";
import TicketItem from "./TicketItem";
import { API_URL } from "../../assets/config";

export default function TicketList({ tickets, onSelect }) {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [mergeTarget, setMergeTarget] = useState("");

    function handleCheckboxChange(ticket, checked) {
        setSelectedTickets(prev => {
            if (checked) {
                if (prev.length > 0 && prev[0].from !== ticket.from) {
                    alert("Можно выбирать только тикеты одного пользователя");
                    return prev;
                }
                return [...prev, ticket];
            } else {
                return prev.filter(t => t._id !== ticket._id);
            }
        });
    }

    async function handleMerge() {
        if (!mergeTarget) {
            alert("Введите номер тикета для слияния");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/support/merge`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetTicketNumber: mergeTarget,
                    ticketsToMerge: selectedTickets.map(t => t._id)
                })
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Ошибка при слиянии");
                return;
            }

            alert("Тикеты успешно объединены");
            setSelectedTickets([]);
            setMergeTarget("");
        } catch (err) {
            console.error(err);
            alert("Ошибка соединения с сервером");
        }
    }

    if (!tickets) return <p className="text-gray-500">Загрузка...</p>;
    if (tickets.length === 0) return <p className="text-gray-500">Ничего не найдено</p>;

    return (
        <div className="relative flex flex-col min-h-[80vh]">
            <div className="border rounded p-2 flex-1 overflow-y-auto">
                {tickets.map(t => (
                    <TicketItem
                        key={t._id}
                        ticket={t}
                        onClick={() => onSelect(t)}
                        isSelected={selectedTickets.some(sel => sel._id === t._id)}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}
            </div>

            {selectedTickets.length > 0 && (
                <div className="sticky bottom-0 w-full bg-white p-4 border-t flex flex-col sm:flex-row items-center gap-4 shadow-lg z-10">
                    <div className="flex-1 flex items-center gap-2">
                        Соединить выбранные тикеты в тикет №
                        <input
                            type="text"
                            value={mergeTarget}
                            onChange={e => setMergeTarget(e.target.value)}
                            placeholder="Введите номер тикета"
                            className="ml-2 border rounded px-2 py-1 text-sm w-32"
                        />
                    </div>
                    <button
                        onClick={handleMerge}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Соединить
                    </button>
                </div>
            )}
        </div>
    );
}
