import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export function PackageCard({ pkg, onEdit, onDelete }) {
  const [showAll, setShowAll] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toShow = showAll ? pkg.printOptions : pkg.printOptions.slice(0, 3);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? pkg.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === pkg.images.length - 1 ? 0 : prev + 1
    );
  };


  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-6 max-w-sm mx-auto">
      {pkg.images && pkg.images.length > 0 && (
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-inner mb-4">
          <img
            src={pkg.images[currentImageIndex]}
            alt={pkg.name}
            className="w-full h-full object-cover object-center transition-transform duration-300"
            loading="lazy"
          />

          {pkg.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
              >
                <HiChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
              >
                <HiChevronRight size={24} />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                {pkg.images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? "bg-white shadow-md scale-110"
                        : "bg-white/50"
                      }`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
      )}


      <div>
        <h2 className="font-extrabold text-2xl text-gray-900 mb-2 truncate">{pkg.name}</h2>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 truncate">{pkg.category}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pkg.description}</p>

        <div className="text-indigo-700 text-sm mb-3 space-y-1">
          <p><span className="font-semibold">Тип:</span> {pkg.type}</p>
          <p><span className="font-semibold">Материал:</span> {pkg.material}</p>
          <p><span className="font-semibold">Цвет:</span> {pkg.color}</p>
          <p><span className="font-semibold">Размер:</span> {pkg.size}</p>
          <p><span className="font-semibold">Плотность:</span> {pkg.density}</p>
          {pkg.weight && <p><span className="font-semibold">Вес:</span> {pkg.weight}</p>}
          {pkg.appMethod && <p><span className="font-semibold">Метод нанесения:</span> {pkg.appMethod}</p>}
          {pkg.handleColor && <p><span className="font-semibold">Цвет ручек:</span> {pkg.handleColor}</p>}
          {pkg.bottom && <p><span className="font-semibold">Донная складка:</span> Да</p>}
          {pkg.handle && <p><span className="font-semibold">Усиленная ручка:</span> Да</p>}
          {pkg.docsPocket && <p><span className="font-semibold">Карман для документов:</span> Да</p>}
          {pkg.stickyAss && <p><span className="font-semibold">Липкий клапан:</span> Да</p>}
          {pkg.window && <p><span className="font-semibold">Окно:</span> Да</p>}
          {pkg.zipLock && <p><span className="font-semibold">Zip-замок:</span> Да</p>}
        </div>

        {pkg.price?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-green-800 font-semibold text-sm mb-2 uppercase tracking-wide">
              Цены по количеству
            </h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {pkg.price.map((p, i) => (
                <li key={i} className="flex justify-between border-b border-gray-100 pb-1">
                  <span>от {p.minQty} шт</span>
                  <span className="font-semibold">{p.price} {pkg.currency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {pkg.printOptions?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2 text-gray-800 uppercase tracking-wide">
              Опции печати
            </h4>
            <ul className="text-gray-700 text-sm space-y-1 max-h-28 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
              {toShow.map((opt, i) => (
                <li key={i} className="flex justify-between border-b border-gray-100 pb-1">
                  <span>{opt.code}/{opt.quantity} шт</span>
                  <span className="font-medium">{opt.price} грн</span>
                </li>
              ))}
            </ul>
            {pkg.printOptions.length > 3 && (
              <button
                className="mt-1 text-indigo-600 text-xs font-semibold hover:underline"
                onClick={() => setShowAll(!showAll)}
                aria-label={showAll ? "Скрыть все опции печати" : "Показать все опции печати"}
              >
                {showAll ? "Скрыть" : "Показать ещё..."}
              </button>
            )}
          </div>
        )}

        {pkg.tags?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-gray-500 uppercase tracking-wide text-xs font-semibold mb-1">Теги</h4>
            <p className="text-gray-600 text-sm">{pkg.tags.join(", ")}</p>
          </div>
        )}

        <p className="text-xs text-gray-400 mb-4">
          Создано: {new Date(pkg.createdAt).toLocaleDateString()}
        </p>

        <div className="flex justify-between space-x-4">
          <button
            onClick={() => onEdit(pkg)}
            className="flex-1 px-4 py-2 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition"
            aria-label="Редактировать пакет"
          >
            Редактировать
          </button>
          <button
            onClick={() => onDelete(pkg._id)}
            className="flex-1 px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            aria-label="Удалить пакет"
          >
            Удалить
          </button>
        </div>
      </div>
    </div >
  );
}
