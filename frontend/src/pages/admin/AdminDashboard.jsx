import { useApp } from '../../contexts/AppContext';

const statusColors = {
  waiting: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const AdminDashboard = () => {
  const { orders, setOrders } = useApp();

  const updateStatus = (orderId, status) => {
    setOrders(
      orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-5"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[order.status]}`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* Customer */}
              <p className="text-sm mb-2">
                <strong>Customer:</strong>{' '}
                {order.customer?.name || 'Guest'}
              </p>

              {/* Items */}
              <div className="border rounded-lg overflow-hidden mb-4">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between px-4 py-2 border-b last:border-none"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {order.status === 'waiting' && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(order.id, 'accepted')
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order.id, 'rejected')
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {order.status === 'accepted' && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, 'completed')
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
