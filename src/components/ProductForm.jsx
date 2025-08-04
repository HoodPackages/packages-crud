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
            className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 space-y-6 text-sm"
            noValidate
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    className="input input-bordered"
                    placeholder="Название"
                    value={form.name || ''}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered"
                    placeholder="Категория"
                    value={form.category || ''}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered"
                    placeholder="Валюта"
                    value={form.currency || ''}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    required
                />
            </div>

            <textarea
                className="input input-bordered w-full resize-none"
                placeholder="Описание"
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                required
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                    className="input input-bordered"
                    placeholder="Тип"
                    value={form.type || ''}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered"
                    placeholder="Вес"
                    value={form.weight || ''}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                />
                <input
                    className="input input-bordered"
                    placeholder="Цвет"
                    value={form.color || ''}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <input
                    className="input input-bordered"
                    placeholder="Метод нанесения"
                    value={form.appMethod || ''}
                    onChange={(e) => setForm({ ...form, appMethod: e.target.value })}
                />
                <input
                    className="input input-bordered"
                    placeholder="Материал"
                    value={form.material || ''}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered"
                    placeholder="Плотность"
                    value={form.density || ''}
                    onChange={(e) => setForm({ ...form, density: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered"
                    placeholder="Размер"
                    value={form.size || ''}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered"
                    placeholder="Цвет ручек"
                    value={form.handleColor || ''}
                    onChange={(e) => setForm({ ...form, handleColor: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                    ["bottom", "Дно"],
                    ["handle", "Ручки"],
                    ["docsPocket", "Карман под документы"],
                    ["stickyAss", "Липкая лента"],
                    ["window", "Окошко"],
                    ["zipLock", "Zip Lock"],
                ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={form[key] || false}
                            onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                        />
                        {label}
                    </label>
                ))}
            </div>

            <input
                className="input input-bordered w-full"
                placeholder="Теги (через запятую)"
                value={form.tags?.join(", ") || ''}
                onChange={(e) =>
                    setForm({
                        ...form,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                }
            />

            <input
                className="input input-bordered w-full"
                placeholder="Ссылки на изображения (через запятую)"
                value={form.images?.join(", ") || ''}
                onChange={(e) =>
                    setForm({
                        ...form,
                        images: e.target.value.split(",").map((t) => t.trim()),
                    })
                }
            />

            <section className="bg-indigo-50 p-4 rounded">
                <h3 className="font-semibold text-indigo-700 mb-2">Цены по количеству</h3>
                {form.price.map((p, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                        <input
                            className="input input-bordered w-1/3"
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
                            className="input input-bordered w-1/3"
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
                        >✕</button>
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

            <section className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-700 mb-2">Опции печати</h3>
                <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                    {form.printOptions.map((opt, idx) => (
                        <div key={idx} className="flex flex-wrap gap-2 items-center">
                            <input
                                className="input input-bordered w-24"
                                placeholder="Код"
                                value={opt.code || ''}
                                onChange={(e) => onPrintOptionChange(idx, "code", e.target.value)}
                            />
                            <input
                                className="input input-bordered w-24"
                                placeholder="Тираж"
                                value={opt.quantity || ''}
                                onChange={(e) => onPrintOptionChange(idx, "quantity", e.target.value)}
                            />
                            <input
                                className="input input-bordered w-28"
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
                            >✕</button>
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


            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                    Закрыть
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Отмена
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {editId ? "Обновить" : "Создать"}
                </button>
            </div>
        </form>
    );
}