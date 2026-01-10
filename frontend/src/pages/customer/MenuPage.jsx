import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { api } from '../../services/api';
import MenuCard from '../../components/menu/MenuCard';
import Header from '../../components/common/Header';
import Cart from '../../components/cart/Cart';
import '../../style/custom.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import Loader from '../../components/common/Loader';

export default function MenuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart } = useApp();
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState(
    location.state?.selectedCategory || 'Burgers'
  );

  useEffect(() => {
    if (!user) {
      navigate('/home');
    }
  }, [user]);

  useEffect(() => {
    setLoading(true)
    api.getAllMenu()
      .then((res) => {
        setMenuItems(res?.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })

  }, []);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setActiveCategory(location.state?.selectedCategory);
    }

    api.getAllCategory()
      .then((res) => {
        setCategories(res?.data)
      })
      .catch((err) => {
        console.log(err);
      })

  }, [location.state], []);

  const filteredMenu = menuItems?.filter(
    item => item?.category === activeCategory
  );

  if (isLoading) {
    return <Loader text="Fetching your menu..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <Header />

      {/* Welcome */}
      <div className="container mx-auto px-4 py-4">
        <div className="inline-flex items-cente px-3 py-1 text-sm">
          <span
            onClick={() => navigate('/home')}
            className="cursor-pointer text-gray-500 hover:text-orange-500"
          >
            Home
          </span>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-orange-600 font-semibold">
            Menu
          </span>
        </div>
      </div>


      {/* Categories Slider */}
      <div className="sticky top-16 z-30 mx-10">
        <div className="container mx-auto px-12 relative">
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={20}
            slidesPerView="auto"
            freeMode={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="py-4"
          >
            {categories.map(category => (
              <SwiperSlide
                key={category.id}
                style={{ width: 'auto' }}
              >
                <button
                  onClick={() => setActiveCategory(category.name)}
                  className={`ms-1 flex flex-col items-center px-4 pb-2 transition whitespace-nowrap
              ${activeCategory === category.name
                      ? 'border-b-4 border-orange-500'
                      : 'border-b-4 border-transparent'
                    }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-15 w-15 inset-0 rounded  object-cover mb-1"
                  />
                  <span
                    className={`font-semibold text-sm text-center
                ${activeCategory === category.name
                        ? 'text-orange-600'
                        : 'text-gray-700'
                      }`}
                  >
                    {category.name}
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute -left-5 top-1/3 -translate-y-1/2 z-10 bg-white rounded shadow-lg p-2 cursor-pointer transition hover:shadow-xl">
            <svg className="w-5 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute -right-5 top-1/3 -translate-y-1/2 z-10 bg-white rounded shadow-lg p-2 cursor-pointer transition hover:shadow-xl">
            <svg className="w-5 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-4 py-8 pb-32">
        {filteredMenu?.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredMenu?.map(item => (
              <MenuCard key={item?.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No items in {activeCategory}
            </h3>
            <p className="text-gray-500">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      {cart?.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Cart />
        </div>
      )}
    </div>
  );
}