export default function TicketItem({ ticket, isSelected, onCheckboxChange, onClick }) {
    return (
        <div
            className={`flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer text-sm ${isSelected ? "bg-blue-50" : ""
                }`}
            onClick={onClick}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                    onCheckboxChange(ticket, e.target.checked);
                }}
                onClick={e => e.stopPropagation()}
                className="mr-2"
            />
            <div>
                <p className="font-semibold truncate">
                    #{ticket.ticketNumber} — {ticket.subject}
                </p>
                <p className="text-xs text-gray-500">{ticket.from}</p>
            </div>
        </div>
    );
}
