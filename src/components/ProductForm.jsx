export default function ProductForm({
    form,
    setForm,
    onSubmit,
    editId,
    onCancel,
    onPrintOptionChange,
    onAddPrintOption,
    onRemovePrintOption,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8 text-sm"
            noValidate
        >
            {/* Основная информация */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Основная информация</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Название"
                        value={form.name || ""}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Категория"
                        value={form.category || ""}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                    />
                    <input
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Валюта"
                        value={form.currency || ""}
                        onChange={(e) => setForm({ ...form, currency: e.target.value })}
                        required
                    />
                </div>
                <textarea
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Описание"
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    required
                />
            </section>

            {/* Характеристики */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Характеристики</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        ["type", "Тип"],
                        ["weight", "Вес"],
                        ["color", "Цвет"],
                        ["appMethod", "Метод нанесения"],
                        ["material", "Материал"],
                        ["density", "Плотность"],
                        ["size", "[Размер]"],
                        ["handleColor", "Цвет ручек"],
                    ].map(([key, label]) => (
                        <input
                            key={key}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder={label}
                            value={form[key] || ""}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        />
                    ))}
                </div>
            </section>

            {/* Опции */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Дополнительные опции</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        ["bottom", "Дно"],
                        ["handle", "Ручки"],
                        ["docsPocket", "Карман под документы"],
                        ["stickyAss", "Липкая лента"],
                        ["window", "Окошко"],
                        ["zipLock", "Zip Lock"],
                    ].map(([key, label]) => (
                        <label
                            key={key}
                            className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                        >
                            <input
                                type="checkbox"
                                checked={form[key] || false}
                                onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </section>

            {/* Теги и изображения */}
            <section className="space-y-4">
                <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Теги (через запятую)"
                    value={form.tags?.join(", ") || ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            tags: e.target.value.split(",").map((t) => t.trim()),
                        })
                    }
                />
                <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Ссылки на изображения (через запятую)"
                    value={form.images?.join(", ") || ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            images: e.target.value.split(",").map((t) => t.trim()),
                        })
                    }
                />
            </section>

            {/* Цены */}
            <section className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-700 mb-2">Цены по количеству</h3>
                {form.price.map((p, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                        <input
                            className="w-1/3 border rounded-lg px-3 py-2"
                            type="number"
                            placeholder="От (шт)"
                            value={p.minQty || 0}
                            onChange={(e) => {
                                const updated = [...form.price];
                                updated[idx].minQty = parseInt(e.target.value) || 0;
                                setForm({ ...form, price: updated });
                            }}
                        />
                        <input
                            className="w-1/3 border rounded-lg px-3 py-2"
                            type="number"
                            placeholder="Цена"
                            value={p.price || 0}
                            onChange={(e) => {
                                const updated = [...form.price];
                                updated[idx].price = parseFloat(e.target.value) || 0;
                                setForm({ ...form, price: updated });
                            }}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setForm({
                                    ...form,
                                    price: form.price.filter((_, i) => i !== idx),
                                })
                            }
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        setForm({
                            ...form,
                            price: [...form.price, { minQty: 0, price: 0 }],
                        })
                    }
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    + Добавить цену
                </button>
            </section>

            {/* Опции печати */}
            <section className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Опции печати</h3>
                <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                    {form.printOptions.map((opt, idx) => (
                        <div key={idx} className="flex flex-wrap gap-2 items-center">
                            <input
                                className="w-24 border rounded-lg px-2 py-1"
                                placeholder="Код"
                                value={opt.code || ""}
                                onChange={(e) => onPrintOptionChange(idx, "code", e.target.value)}
                            />
                            <input
                                className="w-24 border rounded-lg px-2 py-1"
                                placeholder="Тираж"
                                value={opt.quantity || ""}
                                onChange={(e) => onPrintOptionChange(idx, "quantity", e.target.value)}
                            />
                            <input
                                className="w-28 border rounded-lg px-2 py-1"
                                placeholder="Цена печати"
                                type="number"
                                value={opt.price || 0}
                                onChange={(e) =>
                                    onPrintOptionChange(idx, "price", parseFloat(e.target.value) || 0)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => onRemovePrintOption(idx)}
                                className="text-red-500 hover:text-red-700 text-lg"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={onAddPrintOption}
                    className="mt-2 text-green-600 hover:text-green-800"
                >
                    + Добавить опцию
                </button>
            </section>

            {/* Кнопки */}
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Закрыть
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Отмена
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {editId ? "Обновить" : "Создать"}
                </button>
            </div>
        </form>
    );
}
