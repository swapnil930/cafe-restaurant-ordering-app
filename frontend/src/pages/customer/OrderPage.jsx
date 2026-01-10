import { useEffect, useState } from 'react';
import { Clock, Package, CheckCircle, XCircle, ChevronRight, MapPin, ArrowLeft } from 'lucide-react';
import { OrderServices } from '../../services/orders.service';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    OrderServices.getAllOrders()
      .then((res) => {
        setOrder(res?.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { setLoading(false) })
  }, [])

  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: Clock,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        label: 'Preparing',
        borderColor: 'border-orange-200'
      },
      delivered: {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        label: 'Delivered',
        borderColor: 'border-green-200'
      },
      cancelled: {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        label: 'Cancelled',
        borderColor: 'border-red-200'
      },
      processing: {
        icon: Package,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        label: 'Processing',
        borderColor: 'border-blue-200'
      }
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const calculateTotal = (items) => {
    return items?.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  if (isLoading) {
    return <Loader text="Fetching your orders..." />;
  }

  if (orders?.length === 0) {
    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center space-y-6 px-4">
          <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <Package size={64} className="text-orange-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
            <p className="text-gray-500">Start ordering delicious food!</p>
          </div>
          <Link to='/menu'
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container flex mx-auto px-4 py-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => navigate(-1)}>
            <ArrowLeft className="text-gray-700" size={24} />
          </button>
          <div className='flex items-center gap-2'>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {orders?.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          const total = calculateTotal(order.items);
          const totalItems = getTotalItems(order.items);

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${statusConfig.bg} rounded-full flex items-center justify-center`}>
                      <StatusIcon className={statusConfig.color} size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Order #{order.id}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <span className={`${statusConfig.color} ${statusConfig.bg} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 space-y-3">
                {order?.items.map((item, idx) => (
                  <div key={`${order.id}-${item.id}-${idx}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm leading-tight">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={12} className="text-gray-400" />
                            <p className="text-xs text-gray-500">{item.country}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">₹{item.price || 0}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className={`p-4 ${statusConfig.bg} border-t ${statusConfig.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                    <p className="text-lg font-bold text-gray-800">₹{total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <span>View Details</span>
                    <ChevronRight size={16} className={`transition-transform ${selectedOrder === order.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOrder === order.id && (
                <div className="p-4 bg-gray-50 border-t animate-in">
                  <h4 className="font-bold text-gray-800 mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    {order?.items.map((item, idx) => (
                      <div key={`detail-${item.id}-${idx}`} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className=" flex gap-3 border-t pt-2 mt-2 font-semibold">
                      <span>Total Paid</span>
                      <span className="text-orange-600">₹{(total).toFixed(2)}</span>

                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}