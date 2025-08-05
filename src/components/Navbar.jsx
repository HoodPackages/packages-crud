import { Link } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from "../assets/config";

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
    };

    const linkClass = "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700";

    return (
        <>
            <aside
                className={`fixed top-0 left-0 z-50 flex flex-col h-screen px-3 py-6 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}
            >
                <div className="flex justify-between items-center px-2 mb-6">
                    {!collapsed && (
                        <h2 className='text-3xl font-extrabold text-yellow-300 drop-shadow-md text-center w-full'>Backoffice</h2>
                    )}
                    <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-300">
                        {collapsed ? '➡️' : '⬅️'}
                    </button>
                </div>

                <div className="flex flex-col justify-between flex-1">
                    <nav className="-mx-1 space-y-3">
                        <Link className={linkClass} to="products">
                            <span>🛒</span>
                            {!collapsed && <span className="ml-2 text-sm font-medium">Товары</span>}
                        </Link>

                        <Link className={linkClass} to="import-products">
                            <span>⬆️</span>
                            {!collapsed && <span className="ml-2 text-sm font-medium">Загрузить из Excel</span>}
                        </Link>

                        <a onClick={() => window.open(`${API_URL}/api/upload/export`, "_blank")} className={`${linkClass} cursor-pointer`}>
                            <span>⬇️</span>
                            {!collapsed && <span className="ml-2 text-sm font-medium">Выгрузить в Excel</span>}
                        </a>

                        <Link className={linkClass} to="pricing-price-uploader">
                            <span>🧮</span>
                            {!collapsed && <span className="ml-2 text-sm font-medium">Цены печатей</span>}
                        </Link>

                        <Link className={linkClass} to="patterns-manage">
                            <span>📁</span>
                            {!collapsed && <span className="ml-2 text-sm font-medium">Шаблоны</span>}
                        </Link>

                        <Link className={linkClass} to="support">
                            <span>📬</span>
                            {!collapsed && <span className="ml-2 text-sm font-medium">Поддержка</span>}
                        </Link>
                    </nav>

                    <div className="mt-6">
                        {!collapsed && (
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white">Дополнительно</h2>
                        )}

                        <nav className="mt-4 -mx-1 space-y-3">
                            <a
                                href="https://paketov-net.netlify.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {!collapsed && <span>Наш сайт</span>}
                                </div>
                                {!collapsed && (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                )}
                            </a>

                            <a
                                href="https://packages-server-75ra.onrender.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                    {!collapsed && <span>Сервер Render</span>}
                                </div>
                                {!collapsed && (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                )}
                            </a>
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
}
