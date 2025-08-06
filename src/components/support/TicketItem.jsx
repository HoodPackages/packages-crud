export default function TicketItem({ ticket, onClick }) {
    return (
        <div onClick={onClick} className="p-2 cursor-pointer rounded hover:bg-gray-100 text-sm">
            <p className="font-semibold truncate">#{ticket.ticketNumber} — {ticket.subject}</p>
            <p className="text-xs text-gray-500">{ticket.from}</p>
        </div>
    );
}
