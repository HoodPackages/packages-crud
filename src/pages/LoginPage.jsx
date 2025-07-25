export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Вход</h1>
        <form>
          <input
            className="input w-full mb-4"
            type="text"
            placeholder="Логин"
          />
          <input
            className="input w-full mb-4"
            type="password"
            placeholder="Пароль"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded w-full hover:bg-blue-700"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
