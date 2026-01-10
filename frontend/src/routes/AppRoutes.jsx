import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from '../pages/customer/MenuPage';
import CartPage from '../pages/customer/CartPage';
import PaymentPage from '../pages/customer/PaymentPage';
import OrderPage from '../pages/customer/OrderPage';
import LoginPage from '../pages/customer/Loginpage';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import LandingPage from '../components/common/LandingPage';
import HomePage from '../pages/customer/HomePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer */}
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
         <Route path="/cart" element={<CartPage />} />
     {/*   <Route path="/payment" element={<PaymentPage />} />*/}
        <Route path="/order" element={<OrderPage />} /> 

        {/* Admin */}
        {/* <Route path="/admin" element={<AdminLogin />} />*/}
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}
