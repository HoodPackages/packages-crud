import React, { useState, useEffect } from "react";
import { PackageCard } from "../components/PackageCard";
import FileDropzone from "../components/FileDropzone";
import PrintPriceUploader from "../components/PrintPriceUploader";

const API_URL = "http://localhost:5000/api/products";

const initialForm = {
    name: "",
    category: "",
    currency: "",
    price: [],
    description: "",
    tags: [],
    type: "",
    weight: "",
    appMethod: "",
    material: "",
    bottom: false,
    handle: false,
    handleColor: "",
    density: "",
    size: "",
    docsPocket: false,
    stickyAss: false,
    window: false,
    zipLock: false,
    images: [],
    printOptions: []
};

export default function ProductManagerPage() {
    const [mode, setMode] = useState("manual");
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const fetchPackages = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setPackages(data);
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
        }
        setForm(initialForm);
        setEditId(null);
        fetchPackages();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Удалить этот пакет?")) {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchPackages();
        }
    };

    const handleEdit = (pkg) => {
        setForm({
            name: pkg.name,
            category: pkg.category,
            currency: pkg.currency,
            price: pkg.price || [],
            description: pkg.description,
            tags: pkg.tags || [],
            type: pkg.type,
            weight: pkg.weight,
            appMethod: pkg.appMethod,
            material: pkg.material,
            bottom: pkg.bottom,
            handle: pkg.handle,
            handleColor: pkg.handleColor,
            density: pkg.density,
            size: pkg.size,
            docsPocket: pkg.docsPocket,
            stickyAss: pkg.stickyAss,
            window: pkg.window,
            zipLock: pkg.zipLock,
            images: pkg.images || [],
            printOptions: pkg.printOptions || [],
        });
        setEditId(pkg._id);
        window.scroll(0, 0);
    };

    const handlePrintOptionChange = (index, field, value) => {
        const updated = [...form.printOptions];
        updated[index][field] = value;
        setForm({ ...form, printOptions: updated });
    };

    const handleAddPrintOption = () => {
        setForm({
            ...form,
            printOptions: [...form.printOptions, { code: "", price: "" }],
        });
    };

    const handleRemovePrintOption = (index) => {
        const updated = form.printOptions.filter((_, i) => i !== index);
        setForm({ ...form, printOptions: updated });
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gradient-to-b from-gray-100 to-white min-h-screen">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-md">
                CRUD Пакетов
            </h1>

            <div className="flex justify-center gap-6 mb-10">
                <button
                    type="button"
                    onClick={() => setMode("manual")}
                    className={`px-6 py-3 rounded-full font-semibold shadow-md transition 
                    ${mode === "manual"
                            ? "bg-indigo-600 text-white shadow-indigo-400"
                            : "bg-gray-200 text-gray-600 hover:bg-indigo-100"
                        }`}
                >
                    Добавить один товар
                </button>
                <button
                    type="button"
                    onClick={() => setMode("excel")}
                    className={`px-6 py-3 rounded-full font-semibold shadow-md transition
                    ${mode === "excel"
                            ? "bg-indigo-600 text-white shadow-indigo-400"
                            : "bg-gray-200 text-gray-600 hover:bg-indigo-100"
                        }`}
                >
                    Залить файл с товарами
                </button>
                <button
                    type="button"
                    onClick={() => setMode("prints")}
                    className={`px-6 py-3 rounded-full font-semibold shadow-md transition
                    ${mode === "prints"
                            ? "bg-indigo-600 text-white shadow-indigo-400"
                            : "bg-gray-200 text-gray-600 hover:bg-indigo-100"
                        }`}
                >
                    Цены печатей
                </button>

            </div>

            {(() => {
                switch (mode) {
                    case "excel":
                        return (
                            <div className="max-w-3xl mx-auto">
                                <FileDropzone />
                            </div>
                        );
                    case "prints":
                        return (
                            <div className="max-w-3xl mx-auto">
                                <PrintPriceUploader />
                            </div>
                        );
                    default:
                        return (
                            <form
                                onSubmit={handleSubmit}
                                className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8"
                                noValidate
                            >
                                {/* Основные поля */}
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
                                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
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
                                            placeholder="пример, тег1, тег2"
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

                                {/* Цены по количеству */}
                                <section className="bg-indigo-50 rounded-md p-6 shadow-inner">
                                    <h3 className="text-lg font-semibold text-indigo-700 mb-4">Цены по количеству</h3>
                                    {form.price.map((p, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col md:flex-row gap-3 items-start mb-3"
                                        >
                                            <div className="flex flex-col flex-1">
                                                <label className="mb-1 text-sm font-medium text-gray-700">От (шт)</label>
                                                <input
                                                    className="input input-bordered"
                                                    type="number"
                                                    min={0}
                                                    placeholder="От (шт)"
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
                                                    placeholder="Цена"
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
                                    {form.printOptions.length > 0 &&
                                        form.printOptions.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col md:flex-row gap-3 items-center mb-3"
                                            >
                                                <input
                                                    className="input input-bordered flex-1"
                                                    placeholder="Код (например, 2+1)"
                                                    value={opt.code}
                                                    onChange={(e) =>
                                                        handlePrintOptionChange(idx, "code", e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="input input-bordered flex-1"
                                                    type="number"
                                                    min={0}
                                                    placeholder="Цена"
                                                    value={opt.price}
                                                    onChange={(e) =>
                                                        handlePrintOptionChange(
                                                            idx,
                                                            "price",
                                                            parseFloat(e.target.value) || 0
                                                        )
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePrintOption(idx)}
                                                    className="text-red-600 hover:text-red-800 transition"
                                                    aria-label="Удалить опцию печати"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    <button
                                        type="button"
                                        onClick={handleAddPrintOption}
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
                                            onClick={() => {
                                                setEditId(null);
                                                setForm(initialForm);
                                            }}
                                            className="px-10 py-3 rounded-full border-2 border-gray-300 hover:border-gray-500 transition font-semibold"
                                        >
                                            Отмена
                                        </button>
                                    )}
                                </div>
                            </form>
                        );
                }
            })()}

            <section className="mt-16 max-w-6xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                    <PackageCard
                        key={pkg._id}
                        pkg={pkg}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </section>
        </div>
    );
}
