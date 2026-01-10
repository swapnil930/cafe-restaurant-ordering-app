
import { useApp } from '../../contexts/AppContext';
import { Minus, Plus } from 'lucide-react';

const MenuCard = ({ item }) => {
  const { cart, addToCart, updateQuantity } = useApp();

  const cartItem = cart?.find(i => i.id === item.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4">
      <div className="flex gap-4 items-start">

        {/* Image */}
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              {item.name}
            </h3>
            <span className="font-semibold text-amber-600 text-sm">
              ₹{item.price}
            </span>
          </div>

          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {item.description}
          </p>

          {/* Cart Action */}
          {!cartItem ? (
            <div className="mt-3">
              <button
                onClick={() => addToCart(item)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-4 py-1.5 rounded-md"
              >
                Add
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 bg-orange-50 rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
                  >
                    <Minus size={16} className="text-orange-600" />
                  </button>
                  <span className="font-bold text-gray-800 w-8 text-center">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-full shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MenuCard;