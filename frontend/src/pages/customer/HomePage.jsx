import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Header from '../../components/common/Header';
import Hero from '../../components/common/Hero';
import LoginPage from './Loginpage';
import Modal from 'react-modal';
import { useApp } from '../../contexts/AppContext';
import Loader from '../../components/common/Loader';
import BottomTab from '../../components/common/BottomTab';
import ImageSwiper from '../../components/common/ImageSwiper';


export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useApp()
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (!user) {
      setIsModalOpen(true)
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true)
    api.getAllCategory()
      .then(res => setCategories(res?.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }, []);

  const handleCategoryClick = (category) => {
    navigate('/menu', { state: { selectedCategory: category } });
  };

  if (isLoading) {
    return <Loader text="Fetching your orders..." />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 pb-30">
      <Header />
      <div>
        <Hero />
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-6 ">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Menu</h3>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="
          relative h-28 rounded-xl overflow-hidden shadow-sm
          hover:shadow-lg transition-all duration-300
          hover:scale-105 active:scale-95
        "
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 h-full flex items-start justify-start p-2">
                <span className="
            bg-white/90 text-gray-800 text-xs font-semibold
            px-2 py-1 rounded-md shadow
          ">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg px-6 py-6 text-white">

          <div className="flex items-center justify-between">

            {/* LEFT TEXT */}
            <div className="w-1/3">
              <h3 className="text-2xl font-bold mb-2">Today’s Special 🔥</h3>
              <p className="text-orange-100 mb-4">
                Get Upto 60% off on all burgers!
              </p>

              <button
                onClick={() => handleCategoryClick("Burgers")}
                className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition"
              >
                Order Now
              </button>
            </div>

            {/* RIGHT IMAGE / SWIPER */}
            <div className=" flex-1 w-56 h-64 rounded-xl overflow-hidden flex-shrink-0">
              <ImageSwiper />
            </div>

          </div>
        </div>
      </div>


      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={false}
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-auto outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <LoginPage onClose={() => setIsModalOpen(false)} />
      </Modal>

      <BottomTab />

    </div>
  );
}