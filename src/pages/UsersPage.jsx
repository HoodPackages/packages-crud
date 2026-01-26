import { useEffect, useState } from "react";
import { API_URL } from "../assets/config";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savingId, setSavingId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/users`);
            if (!res.ok) throw new Error("Не удалось загрузить пользователей");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateDiscount = async (id, discount) => {
        if (discount < 0 || discount > 100) return;

        try {
            setSavingId(id);
            const res = await fetch(`${API_URL}/api/users/${id}/discount`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ discount: Number(discount) })
            });

            if (!res.ok) throw new Error("Ошибка обновления скидки");

            const updatedUser = await res.json();
            setUsers(users =>
                users.map(u => (u._id === id ? updatedUser : u))
            );
        } catch (err) {
            alert(err.message);
        } finally {
            setSavingId(null);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Удалить пользователя?")) return;

        try {
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Ошибка удаления пользователя");

            setUsers(users => users.filter(u => u._id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <span className="animate-pulse">Загрузка пользователей…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto mt-10 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
                {error}
            </div>
        );
    }

    const filteredUsers = users.filter(user => {
        const q = search.toLowerCase();
        return (
            user.name.toLowerCase().includes(q) ||
            user.login.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q)
        );
    });


    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Пользователи
                </h1>
                <input
                    type="text"
                    placeholder="Поиск по имени, login или email"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="
            w-80 rounded-xl border border-gray-300
            px-4 py-2 text-sm
            focus:ring-2 focus:ring-blue-200
            focus:border-blue-500
        "
                />
                <span className="text-sm text-gray-500">
                    Всего: {users.length}
                </span>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-4 text-left">Имя</th>
                            <th className="px-6 py-4 text-left">Login</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Скидка</th>
                            <th className="px-6 py-4 text-right">Действия</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {filteredUsers.map(user => (
                            <tr
                                key={user._id}
                                className="group hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    <a
                                        href={`/users/${user._id}`}
                                        className="hover:underline hover:text-blue-600"
                                    >
                                        {user.name}
                                    </a>
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {user.login}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4 w-44">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={user.discount}
                                            disabled={savingId === user._id}
                                            onChange={e =>
                                                updateDiscount(
                                                    user._id,
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full rounded-lg border border-gray-300
                                                bg-white px-3 py-2 pr-8
                                                text-gray-700 text-sm
                                                focus:border-blue-500
                                                focus:ring-2 focus:ring-blue-200
                                                disabled:bg-gray-100
                                                transition
                                            "
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                                            %
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="
                                            opacity-0 group-hover:opacity-100
                                            text-red-600 hover:text-red-800
                                            text-sm transition
                                        "
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-16 text-center text-gray-400"
                                >
                                    Пользователи отсутствуют
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
