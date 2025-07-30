import React from "react";

export default function ProductForm({
    form,
    setForm,
    onSubmit,
    editId,
    onCancel,
    onPrintOptionChange,
    onAddPrintOption,
    onRemovePrintOption
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8"
            noValidate
        >
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">Название</label>
                    <input
                        className="input input-bordered"
                        placeholder="Название"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">Тип</label>
                    <input
                        className="input input-bordered"
                        placeholder="Тип"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">Категория</label>
                    <input
                        className="input input-bordered"
                        placeholder="Категория"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                </div>
            </section>

            <section>
                <label className="mb-2 font-semibold text-gray-700 block">Описание</label>
                <textarea
                    rows={4}
                    className="input input-bordered w-full resize-none"
                    placeholder="Описание"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">URL картинки (через запятую)</label>
                    <input
                        className="input input-bordered"
                        value={form.images.join(", ")}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                images: e.target.value
                                    .split(",")
                                    .map((url) => url.trim())
                                    .filter((url) => url.length > 0),
                            })
                        }
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">Теги (через запятую)</label>
                    <input
                        className="input input-bordered"
                        value={form.tags.join(", ")}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                tags: e.target.value.split(",").map((t) => t.trim()),
                            })
                        }
                    />
                </div>
            </section>

            <section className="bg-indigo-50 rounded-md p-6 shadow-inner">
                <h3 className="text-lg font-semibold text-indigo-700 mb-4">Цены по количеству</h3>
                {form.price.map((p, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-3 items-start mb-3">
                        <div className="flex flex-col flex-1">
                            <label className="mb-1 text-sm font-medium text-gray-700">От (шт)</label>
                            <input
                                className="input input-bordered"
                                type="number"
                                min={0}
                                value={p.minQty}
                                onChange={(e) =>
                                    setForm((prev) => {
                                        const updated = [...prev.price];
                                        updated[idx].minQty = parseInt(e.target.value) || 0;
                                        return { ...prev, price: updated };
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="mb-1 text-sm font-medium text-gray-700">Цена</label>
                            <input
                                className="input input-bordered"
                                type="number"
                                step="10"
                                min={0}
                                value={p.price}
                                onChange={(e) =>
                                    setForm((prev) => {
                                        const updated = [...prev.price];
                                        updated[idx].price = parseFloat(e.target.value) || 0;
                                        return { ...prev, price: updated };
                                    })
                                }
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    price: prev.price.filter((_, i) => i !== idx),
                                }))
                            }
                            className="self-end text-red-600 hover:text-red-800 transition"
                            aria-label="Удалить цену"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        setForm((prev) => ({
                            ...prev,
                            price: [...prev.price, { minQty: 0, price: 0 }],
                        }))
                    }
                    className="text-indigo-700 font-semibold hover:text-indigo-900 transition"
                >
                    + Добавить цену
                </button>
            </section>

            <section className="bg-green-50 rounded-md p-6 shadow-inner">
                <h3 className="text-lg font-semibold text-green-700 mb-4">Опции печати</h3>
                {form.printOptions.map((opt, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-3 items-center mb-3">
                        <input
                            className="input input-bordered flex-1"
                            placeholder="Код"
                            value={opt.code}
                            onChange={(e) => onPrintOptionChange(idx, "code", e.target.value)}
                        />
                        <input
                            className="input input-bordered flex-1"
                            placeholder="Кол-во"
                            value={opt.quantity}
                            onChange={(e) => onPrintOptionChange(idx, "quantity", e.target.value)}
                        />
                        <input
                            className="input input-bordered flex-1"
                            type="number"
                            min={0}
                            placeholder="Цена"
                            value={opt.price}
                            onChange={(e) =>
                                onPrintOptionChange(idx, "price", parseFloat(e.target.value) || 0)
                            }
                        />
                        <button
                            type="button"
                            onClick={() => onRemovePrintOption(idx)}
                            className="text-red-600 hover:text-red-800 transition"
                            aria-label="Удалить"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={onAddPrintOption}
                    className="text-green-700 font-semibold hover:text-green-900 transition"
                >
                    + Добавить опцию
                </button>
            </section>

            <div className="flex items-center gap-4 justify-center mt-6">
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-10 py-3 rounded-full font-bold hover:bg-indigo-700 transition-shadow shadow-md"
                >
                    {editId ? "Обновить" : "Создать"}
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-10 py-3 rounded-full border-2 border-gray-300 hover:border-gray-500 transition font-semibold"
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
}
