import React, { useState, useEffect } from "react";
import { PackageCard } from "../components/PackageCard";
import ProductForm from "../components/ProductForm";

// https://packages-server-75ra.onrender.com
const API_URL = "http://localhost:5000";

const initialForm = {
    name: "",
    category: "",
    currency: "",
    price: [],
    description: "",
    tags: [],
    type: "",
    weight: "",
    color: "",
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
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Все");

    const [categories, setCategories] = useState([]);

    const fetchPackages = async () => {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setPackages(data);

        const uniqueCategories = ["Все", ...new Set(data.map(pkg => pkg.category || "Без категории"))];
        setCategories(uniqueCategories);
    };

    const filteredPackages = packages.filter(pkg => {
        const nameMatch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = selectedCategory === "Все" || pkg.category === selectedCategory;
        return nameMatch && categoryMatch;
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await fetch(`${API_URL}/api/products/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
        } else {
            await fetch(`${API_URL}/api/products`, {
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
            await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
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
            color: pkg.color,
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

    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="mx-auto p-8 min-h-screen">

            {!isFormOpen && (
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow transition"
                    >
                        Форма товара
                    </button>
                </div>
            )}

            {isFormOpen && (
                <ProductForm
                    form={form}
                    setForm={setForm}
                    onSubmit={handleSubmit}
                    editId={editId}
                    onCancel={() => {
                        setEditId(null);
                        setForm(initialForm);
                        setIsFormOpen(false);
                    }}
                    onPrintOptionChange={handlePrintOptionChange}
                    onAddPrintOption={handleAddPrintOption}
                    onRemovePrintOption={handleRemovePrintOption}
                />
            )}

            <div className="max-w-6xl mx-auto my-6 flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-72 rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out caret-indigo-600"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-72 rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out cursor-pointer"
                >
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <section className="mt-16 max-w-6xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPackages.map(pkg => (
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
