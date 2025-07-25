import React, { useState, useEffect } from "react";
import { PackageCard } from "../components/PackageCard";

const API_URL = "http://localhost:5000/api/products";


export default function ProductManagerPage() {

    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "",
        image: "",
        basePrice: "",
        printOptions: [],
        bulkPricing: [],
        tags: []
    });

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
        setForm({ name: "", description: "", type: "", image: "", basePrice: "", printOptions: [], bulkPricing: [], tags: [] });
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
            description: pkg.description,
            type: pkg.type,
            image: pkg.image,
            basePrice: pkg.basePrice,
            printOptions: pkg.printOptions || [],
            bulkPricing: pkg.bulkPricing || [],
            tags: pkg.tags || []
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
            printOptions: [...form.printOptions, { code: "", price: "" }]
        });
    };

    const handleRemovePrintOption = (index) => {
        const updated = form.printOptions.filter((_, i) => i !== index);
        setForm({ ...form, printOptions: updated });
    };

    const handleBulkPricingChange = (index, field, value) => {
        const updated = [...form.bulkPricing];
        updated[index][field] = value;
        setForm({ ...form, bulkPricing: updated });
    };

    const handleAddBulkPricing = () => {
        setForm({
            ...form,
            bulkPricing: [...form.bulkPricing, { minQty: "", priceMultiplier: "" }]
        });
    };

    const handleRemoveBulkPricing = (index) => {
        const updated = form.bulkPricing.filter((_, i) => i !== index);
        setForm({ ...form, bulkPricing: updated });
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">CRUD Пакетов</h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded shadow">
                <input
                    className="input"
                    placeholder="Название"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    className="input"
                    placeholder="Описание"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                />
                <input
                    className="input"
                    placeholder="Тип"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    required
                />
                <input
                    className="input"
                    placeholder="URL картинки"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                />
                <input
                    className="input"
                    placeholder="Цена (число)"
                    type="number"
                    step="0.01"
                    value={form.basePrice}
                    onChange={e => setForm({ ...form, basePrice: e.target.value })}
                    required
                />
                <input
                    className="input"
                    placeholder="Теги (через запятую)"
                    value={form.tags.join(", ")}
                    onChange={e =>
                        setForm({ ...form, tags: e.target.value.split(",").map(t => t.trim()) })
                    }
                />
                <div>
                    <h4 className="font-medium">Опции печати</h4>
                    {form.printOptions.map((opt, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                className="input flex-1"
                                placeholder="Код (например, 2+1)"
                                value={opt.code}
                                onChange={e => handlePrintOptionChange(idx, "code", e.target.value)}
                            />
                            <input
                                className="input flex-1"
                                type="number"
                                placeholder="Цена"
                                value={opt.price}
                                onChange={e => handlePrintOptionChange(idx, "price", parseFloat(e.target.value))}
                            />
                            <button type="button" onClick={() => handleRemovePrintOption(idx)} className="text-red-600">
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddPrintOption} className="text-blue-600 text-sm mt-1">
                        + Добавить опцию
                    </button>
                </div>


                <div>
                    <h4 className="font-medium">Оптовое ценообразование</h4>
                    {form.bulkPricing.map((opt, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                className="input flex-1"
                                type="number"
                                placeholder="Мин. количество"
                                value={opt.minQty}
                                onChange={e => handleBulkPricingChange(idx, "minQty", parseInt(e.target.value))}
                            />
                            <input
                                className="input flex-1"
                                type="number"
                                step="0.01"
                                placeholder="Множитель цены"
                                value={opt.priceMultiplier}
                                onChange={e => handleBulkPricingChange(idx, "priceMultiplier", parseFloat(e.target.value))}
                            />
                            <button type="button" onClick={() => handleRemoveBulkPricing(idx)} className="text-red-600">
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddBulkPricing} className="text-blue-600 text-sm mt-1">
                        + Добавить правило
                    </button>
                </div>


                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    {editId ? "Обновить" : "Создать"}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setForm({
                                name: "",
                                description: "",
                                type: "",
                                image: "",
                                basePrice: "",
                                printOptions: [],
                                bulkPricing: [],
                                tags: []
                            });
                        }}
                        className="ml-4 px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
                    >
                        Отмена
                    </button>
                )}
            </form>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {packages.map(pkg => (
                    <PackageCard
                        key={pkg._id}
                        pkg={pkg}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
