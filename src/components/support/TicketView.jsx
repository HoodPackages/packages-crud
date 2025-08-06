import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../assets/config";
import { Pencil } from "lucide-react";

export default function TicketView({ ticket }) {
    const [replyText, setReplyText] = useState("");
    const [subject, setSubject] = useState(ticket.subject);
    const [from, setFrom] = useState(ticket.from);
    const [status, setStatus] = useState(ticket.status);
    const [editingSubject, setEditingSubject] = useState(false);
    const [editingFrom, setEditingFrom] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleReply = async () => {
        if (!replyText.trim()) return alert("Введите текст ответа");

        try {
            const res = await axios.post(`${API_URL}/api/support/${ticket._id}/reply`, {
                text: replyText,
            });

            const newMessage = {
                text: replyText,
                direction: "out",
                date: new Date().toISOString(),
            };

            ticket.messages.push(newMessage);

            setReplyText("");
        } catch (err) {
            console.error("Ошибка при отправке ответа:", err);
            alert("Ошибка при отправке");
        }
    };

    const handleFieldUpdate = async (fieldName, value) => {
        try {
            await axios.patch(`${API_URL}/api/support/${ticket._id}`, { [fieldName]: value });
            alert("Обновлено");
        } catch (err) {
            console.error("Ошибка при обновлении:", err);
            alert("Ошибка при сохранении");
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
            await axios.patch(`${API_URL}/api/support/${ticket._id}`, { status: newStatus });
        } catch (err) {
            console.error("Ошибка при обновлении статуса:", err);
            alert("Не удалось изменить статус");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center gap-2">
                {editingSubject ? (
                    <input
                        className="border px-2 py-1 rounded text-sm w-full"
                        value={subject}
                        autoFocus
                        onBlur={() => {
                            setEditingSubject(false);
                            if (subject !== ticket.subject) {
                                handleFieldUpdate("subject", subject);
                            }
                        }}
                        onChange={(e) => setSubject(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.target.blur();
                        }}
                    />
                ) : (
                    <>
                        <h2 className="text-xl font-bold">#{ticket.ticketNumber} — {subject}</h2>
                        <Pencil
                            size={16}
                            className="cursor-pointer text-gray-500 hover:text-gray-800"
                            onClick={() => setEditingSubject(true)}
                        />
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
                {editingFrom ? (
                    <input
                        className="border px-2 py-1 rounded text-sm"
                        value={from}
                        autoFocus
                        onBlur={() => {
                            setEditingFrom(false);
                            if (from !== ticket.from) {
                                handleFieldUpdate("from", from);
                            }
                        }}
                        onChange={(e) => setFrom(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.target.blur();
                        }}
                    />
                ) : (
                    <>
                        <p>{from}</p>
                        <Pencil
                            size={14}
                            className="cursor-pointer text-gray-400 hover:text-gray-800"
                            onClick={() => setEditingFrom(true)}
                        />
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 text-sm">
                <label className="font-medium">Статус:</label>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="border px-2 py-1 rounded text-sm"
                >
                    <option value="awaiting reply">Ожидает ответа</option>
                    <option value="answered">Закрыт</option>
                    <option value="archived">Архив</option>
                </select>
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {ticket.messages?.map((msg, idx) => (
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
                disabled={isSaving}
            >
                Ответить
            </button>
        </div>
    );
}
