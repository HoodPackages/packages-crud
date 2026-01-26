import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../assets/config";

export default function UserDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // новый флаг для режима редактирования

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users/${id}`);
            if (!res.ok) throw new Error("Пользователь не найден");
            const data = await res.json();
            setUser(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const saveUser = async () => {
        try {
            setSaving(true);
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    login: user.login,
                    email: user.email,
                    discount: user.discount
                })
            });

            if (!res.ok) throw new Error("Ошибка сохранения");

            setIsEditing(false); // возвращаем в режим просмотра после сохранения
            navigate("/users");
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const deleteUser = async () => {
        if (!window.confirm("Удалить пользователя?")) return;

        await fetch(`${API_URL}/api/users/${id}`, {
            method: "DELETE"
        });

        navigate("/users");
    };

    if (error) {
        return (
            <div className="p-6 text-red-600 font-semibold text-lg">{error}</div>
        );
    }

    if (!user) {
        return (
            <div className="p-6 text-gray-500 text-lg animate-pulse">Загрузка…</div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                Детали пользователя
            </h1>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                <Input
                    label="Имя"
                    value={user.name}
                    onChange={v => setUser({ ...user, name: v })}
                    readOnly={!isEditing}
                />

                <Input
                    label="Логин"
                    value={user.login}
                    onChange={v => setUser({ ...user, login: v })}
                    readOnly={!isEditing}
                />

                <Input
                    label="Email"
                    value={user.email}
                    onChange={v => setUser({ ...user, email: v })}
                    readOnly={!isEditing}
                />

                <Input
                    label="Скидка (%)"
                    type="number"
                    value={user.discount}
                    onChange={v => setUser({ ...user, discount: Number(v) })}
                    readOnly={!isEditing}
                />

                <div className="flex justify-between pt-6">
                    <button
                        onClick={deleteUser}
                        className="
                            text-red-600 font-semibold
                            hover:text-red-800
                            px-5 py-2 rounded-lg
                            transition-colors duration-200
                        "
                    >
                        Удалить
                    </button>

                    {isEditing ? (
                        <button
                            disabled={saving}
                            onClick={saveUser}
                            className="
                                bg-gradient-to-r from-blue-500 to-blue-600
                                text-white font-semibold
                                px-6 py-3 rounded-xl
                                hover:from-blue-600 hover:to-blue-700
                                shadow-md
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200
                            "
                        >
                            {saving ? "Сохраняем…" : "Сохранить"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="
                                bg-yellow-400 hover:bg-yellow-500
                                text-white font-semibold
                                px-6 py-3 rounded-xl
                                shadow-md
                                transition-all duration-200
                            "
                        >
                            Изменить
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function Input({ label, value, onChange, type = "text", readOnly = false }) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                readOnly={readOnly}
                className={`
                    w-full rounded-xl border ${readOnly ? "border-gray-200 bg-gray-100" : "border-gray-300"}
                    px-4 py-3
                    focus:outline-none focus:ring-2 focus:ring-blue-200
                    focus:border-blue-400
                    shadow-sm
                    transition-all duration-200
                `}
            />
        </div>
    );
}
