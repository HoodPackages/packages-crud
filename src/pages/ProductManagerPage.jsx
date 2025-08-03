import React, { useState, useEffect } from "react";
import { PackageCard } from "../components/PackageCard";
import FileDropzone from "../components/FileDropzone";
import PrintPriceUploader from "../components/PrintPriceUploader";
import ProductForm from "../components/ProductForm";
import PatternManager from "../components/PatternManager";

const API_URL = "https://packages-server-75ra.onrender.com/api/products";

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
    const [mode, setMode] = useState("excel");
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Все");

    const [categories, setCategories] = useState([]);

    const fetchPackages = async () => {
        const res = await fetch(API_URL);
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

    return (
        <div className="mx-auto p-8 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-md">
                Backoffice
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
                    Загрузить файл с товарами
                </button>
                <button
                    type="button"
                    onClick={() => window.open("http://localhost:5000/api/upload/export", "_blank")}
                    className="px-6 py-3 rounded-full font-semibold shadow-md bg-green-500 text-white hover:bg-green-600"
                >
                    Выгрузить товары в Excel
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
                <button
                    type="button"
                    onClick={() => setMode("patterns")}
                    className={`px-6 py-3 rounded-full font-semibold shadow-md transition
                    ${mode === "patterns"
                            ? "bg-indigo-600 text-white shadow-indigo-400"
                            : "bg-gray-200 text-gray-600 hover:bg-indigo-100"
                        }`}
                >
                    Управление шаблонами
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
                    case "patterns":
                        return (
                            <div className="max-3-xl mx-auto">
                                <PatternManager />
                            </div>
                        )
                    default:
                        return (
                            <ProductForm
                                form={form}
                                setForm={setForm}
                                onSubmit={handleSubmit}
                                editId={editId}
                                onCancel={() => {
                                    setEditId(null);
                                    setForm(initialForm);
                                }}
                                onPrintOptionChange={handlePrintOptionChange}
                                onAddPrintOption={handleAddPrintOption}
                                onRemovePrintOption={handleRemovePrintOption}
                            />
                        );
                }
            })()}

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
