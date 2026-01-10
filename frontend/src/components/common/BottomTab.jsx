import { Home, Menu, ShoppingBag, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BottomTab = () => {
const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-500 z-50">
        <div className="flex justify-around items-center px-6 py-3">
          <Link to='/home' 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          
          <Link to='/menu' 
            onClick={() => setActiveTab('catalog')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'catalog' ? 'text-orange-500' : 'text-gray-400'}`}
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs font-medium">Catalog</span>
          </Link>
          
          <Link to='/cart' 
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'cart' ? 'text-orange-500' : 'text-gray-400'}`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs font-medium">Cart</span>
          </Link>
          
          <Link to='/order'
            onClick={() => setActiveTab('order')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'order' ? 'text-orange-500' : 'text-gray-400'}`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs font-medium">Order</span>
          </Link>
        </div>
      </div>
  )
}

export default BottomTab
