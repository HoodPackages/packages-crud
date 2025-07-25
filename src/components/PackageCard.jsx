import React, { useState } from "react";

export function PackageCard({ pkg, onEdit, onDelete }) {
  const [showAll, setShowAll] = useState(false);
  const toShow = showAll ? pkg.printOptions : pkg.printOptions.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 relative">
      {pkg.image && (
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}
      <div>
        <h2 className="font-bold text-xl text-gray-800 mb-1">{pkg.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
        <p className="text-sm text-indigo-600 mb-1">Тип: <span className="font-semibold">{pkg.type}</span></p>
        <p className="text-green-700 font-bold text-lg mb-3">Цена: {pkg.basePrice} грн</p>

        {pkg.printOptions?.length > 0 && (
          <div className="mb-2">
            <h4 className="font-semibold text-sm mb-1">Опции печати:</h4>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              {toShow.map((opt, i) => (
                <li key={i}>{opt.code}: {opt.price} грн</li>
              ))}
            </ul>
            {pkg.printOptions.length > 3 && (
              <button
                className="text-gray-500 text-sm mt-1 hover:text-gray-700 transition-colors duration-200 underline-offset-2 hover:underline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Скрыть" : "Ещё"}
              </button>
            )}
          </div>
        )}

        {pkg.bulkPricing?.length > 0 && (
          <div className="mb-2">
            <h4 className="font-semibold text-sm mb-1">Оптовое ценообразование:</h4>
            <ul className="text-sm list-disc list-inside text-gray-700">
              {pkg.bulkPricing.map((bp, idx) => (
                <li key={idx}>от {bp.minQty} шт × {bp.priceMultiplier}</li>
              ))}
            </ul>
          </div>
        )}

        {pkg.tags?.length > 0 && (
          <div className="mb-2">
            <h4 className="font-semibold text-sm">Теги:</h4>
            <p className="text-sm text-gray-700">{pkg.tags.join(", ")}</p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-1">Создано: {new Date(pkg.createdAt).toLocaleDateString()}</p>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onEdit(pkg)}
            className="px-4 py-2 text-sm bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500 transition"
          >
            Редактировать
          </button>
          <button
            onClick={() => onDelete(pkg._id)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
