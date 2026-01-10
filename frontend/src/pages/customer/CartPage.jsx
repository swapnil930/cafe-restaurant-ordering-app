import { useState } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { OrderServices } from '../../services/orders.service';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';

export default function CartPage() {
  const navigate = useNavigate();
  const { user, cart, updateQuantity, removeFromCart, clearCart } = useApp();
  const [isLoading, setLoading] = useState(false)


  const handlePlaceOrder = () => {
    setLoading(true);

    const order = {
      customer: {
        name: user?.name,
        tableNumber: user?.tableNumber
      },
      items: cart
    };

    OrderServices.createOrder(order)
      .then(() => {
        toast.success("Order placed successfully 🍽️");
        clearCart();
        navigate("/menu");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to place order");
      })
      .finally(() => setLoading(false));
  };

  if (isLoading) {
    return <Loader text="Fetching your orders..." />;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = subtotal;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center space-y-6 px-4">
          <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <ShoppingBag size={64} className="text-orange-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-500">Add some delicious items to get started!</p>
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
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className=" flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => navigate(-1)}>
                <ArrowLeft className="text-gray-700" size={24} />
              </button>
              <div className='flex items-center gap-2'>
                <h1 className="text-xl font-bold text-gray-800">Cart</h1>
                <p className="text-sm text-gray-500">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-48">
        {/* Cart Items */}
        <div className="py-6 space-y-3">
          {cart?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Item Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img src={item?.image} alt="" />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                        <p className="text-orange-600 font-semibold mt-1">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item?.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 bg-orange-50 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item?.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
                        >
                          <Minus size={16} className="text-orange-600" />
                        </button>
                        <span className="font-bold text-gray-800 w-8 text-center">{item?.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item?.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-full shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
                        >
                          <Plus size={16} className="text-white" />
                        </button>
                      </div>
                      <div className="flex-1 text-right">
                        <span className="text-sm text-gray-500">Subtotal: </span>
                        <span className="font-bold text-gray-800">₹{(item?.price * item?.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Tag className="text-orange-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Apply Coupon Code</p>
              <p className="text-sm text-gray-500">Get amazing discounts</p>
            </div>
            <button className="text-orange-600 font-semibold text-sm hover:text-orange-700">
              Apply
            </button>
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Bill Details</h3>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Item Total</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="border-t border-dashed pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 text-lg">To Pay</span>
                <span className="font-bold text-orange-600 text-2xl">₹{totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalAmount?.toFixed(2)}</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Place Order</span>
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}