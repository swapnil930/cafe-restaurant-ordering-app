import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <button
            onClick={() => navigate('/admin/orders')}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700"
          >
            Orders
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
