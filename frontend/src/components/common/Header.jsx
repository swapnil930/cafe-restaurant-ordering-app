import { Utensils } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import LoginPage from '../../pages/customer/Loginpage';
import ProfileButton from './ProfileButton';

const Header = () => {
  const [showModel, setShowModel] = useState(false);
  const { user } = useApp();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="border-b-2 border-orange-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-2">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <Link
                to="/home"
                className="flex items-center gap-2 sm:gap-4 group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    className="h-12 w-12 sm:h-16 sm:w-16 object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
                    src="/images/logo.png"
                    alt="Cafe Delight"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="font-bold text-lg sm:text-2xl text-gray-900 tracking-tight group-hover:text-orange-600 group-active:text-orange-600 transition-colors">
                    Cafe Delight
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
                    Brew Your Moments
                  </p>
                </div>
              </Link>

              {/* Table Number Button */}
              <div className='flex items-center gap-5 mx-2'>
                <button
                  onClick={() => setShowModel(true)}
                  className="
                  flex items-center justify-center gap-2 px-3 sm:px-3 py-1 
                  rounded-lg border-2 border-gray-300 
                  bg-white text-gray-700
                  hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600
                  transition-all duration-200
                  cursor-pointer
                  shadow-sm hover:shadow-md
                "
                >
                  <Utensils size={16} className="sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base font-semibold">
                    {user?.tableNumber || 'Login'}
                  </span>
                </button>

                <ProfileButton />
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showModel && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
              <LoginPage onClose={() => setShowModel(false)} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;