import TicketItem from "./TicketItem";

export default function TicketList({ tickets, onSelect }) {
    if (tickets.length === 0) return <p className="text-gray-500">Нет обращений</p>;

    return (
        <div className="border rounded p-2 max-h-[80vh] overflow-y-auto">
            {tickets.map((t) => (
                <TicketItem key={t._id} ticket={t} onClick={() => onSelect(t)} />
            ))}
        </div>
    );
}
