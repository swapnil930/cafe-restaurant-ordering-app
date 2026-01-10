import { ShoppingBag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart } = useApp();

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-white border shadow-2xl border-orange-500 mb-2 px-4 py-2 flex items-center justify-between mx-3 rounded">
      <div>
        <p className="text-sm text-gray-600">
          {totalItems} item{totalItems > 1 ? 's' : ''}
        </p>
      </div>

      <Link to='/cart' className="bg-orange-500 flex gap-2 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold">
        <ShoppingBag /> View Cart
      </Link>
    </div>
  );
}
