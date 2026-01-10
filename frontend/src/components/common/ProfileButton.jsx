import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, User, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Modal from 'react-modal';
import LoginPage from '../../pages/customer/Loginpage';

function ProfileButton() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { user, setUser } = useApp();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        setUser(null);
        setShowDropdown(false);
        navigate('/');
    };

    const handleProfileClick = () => {
        setTimeout(() => {
            setShowModal(true);
        }, 100);
        setShowDropdown(false);
    };

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center justify-center p-1"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <UserCircle className="w-6 h-6 text-gray-700
                        hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600
                        transition-all duration-200
                        cursor-pointer shadow-sm rounded-full"
                    />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-30 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <button
                            onClick={handleProfileClick}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                            <User className="w-4 h-4 mr-3" />
                            Profile
                        </button>

                        <div className="border-t border-gray-200 my-1"></div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                shouldCloseOnOverlayClick={true}
                className="bg-white rounded-2xl p-8 w-full max-w-md mx-auto outline-none"
                overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
                <LoginPage onClose={() => setShowModal(false)} />
            </Modal>
        </>
    );
}

export default ProfileButton;