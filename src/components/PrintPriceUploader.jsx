import React, { useEffect, useState } from "react";

export default function PrintPriceUploader() {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [message, setMessage] = useState("");

  // Получить категории товаров из базы
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://packages-server-75ra.onrender.com/api/products");
      const data = await res.json();
      const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Ошибка при загрузке категорий", err);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await fetch("https://packages-server-75ra.onrender.com/api/patterns"); // Сервер должен отдавать список файлов
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error("Ошибка при загрузке файлов", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFiles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedFile) {
      return setMessage("Выберите и категорию, и файл.");
    }

    try {
      const res = await fetch("https://packages-server-75ra.onrender.com/api/products/update-print-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory, filename: selectedFile }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(result.message || "Успешно обновлено.");
      } else {
        setMessage(result.error || "Ошибка обновления.");
      }
    } catch (err) {
      console.error("Ошибка запроса", err);
      setMessage("Произошла ошибка запроса.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Обновление цен печатей</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Категория товара</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input input-bordered"
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Файл с печатями</label>
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="input input-bordered"
            required
          >
            <option value="">Выберите файл</option>
            {files.map((file) => (
              <option key={file} value={file}>{file}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
        >
          Обновить цены
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center font-medium text-indigo-700">{message}</div>
      )}
    </div>
  );
}
