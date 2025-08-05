import { Link } from 'react-router-dom';

const API_URL = "http://localhost:5000";

export default function Navbar() {
    return (
        <>
            <aside className="fixed top-0 left-0 z-50 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <h2 className='text-4xl font-extrabold text-center text-yellow-300 drop-shadow-md'>Backoffice</h2>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 space-y-3 ">
                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            to="products">
                            <span>🛒</span>
                            <span className="mx-2 text-sm font-medium">Товары</span>
                        </Link>
                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            to="import-products">
                            <span>⬆️</span>
                            <span className="mx-2 text-sm font-medium">Загрузить товары из Excel</span>
                        </Link>

                        <a
                            onClick={() => window.open(`${API_URL}/api/upload/export`, "_blank")}
                            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        >
                            <span>⬇️</span>
                            <span className="mx-2 text-sm font-medium">Выгрузить товары в Excel</span>
                        </a>

                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            to="pricing-price-uploader">
                            <span>🧮</span>

                            <span className="mx-2 text-sm font-medium">Цены печатей</span>
                        </Link>

                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            to="patterns-manage">
                            <span>📁</span>

                            <span className="mx-2 text-sm font-medium">Управление шаблонами</span>
                        </Link>

                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            to="support">
                            <span>📬</span>
                            
                            <span className="mx-2 text-sm font-medium">Поддержка</span>
                        </Link>
                    </nav>

                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white">Дополнительно</h2>
                        </div>

                        <nav className="mt-4 -mx-3 space-y-3 ">
                            <a
                                href="https://paketov-net.netlify.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>Наш сайт на Netlify</span>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 rtl:rotate-180"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </a>

                            <a
                                href="https://packages-server-75ra.onrender.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                    <span>Запуск сервера Render</span>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 rtl:rotate-180"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </a>

                            <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                                <div className="flex items-center gap-x-2 ">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    <span>Meraki UI Components</span>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 rtl:rotate-180">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
}