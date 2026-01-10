import { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import Loader from '../../components/common/Loader';

export default function LoginPage({ onClose }) {
  const { user, setUser } = useApp();
  const [name, setName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user?.name)
      setTableNumber(user?.tableNumber)
    }
  }, [user])

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    if (!name.trim() || !tableNumber.trim()) {
      toast.error('Please enter name and table number');
      setLoading(false)
      return;
    }

    const userData = { name, tableNumber };
    setUser(userData);
    toast.success('Details saved successfully!');
    setLoading(false)
    onClose();
  };

  if (isLoading) {
    return <Loader text="Fetching your orders..." />;
  }

  return (
    <>
      <div className='flex justify-end'
        onClick={onClose}>
        <X />
      </div>
      <h1 className="text-2xl font-bold text-center mb-2">
        Cafe Delight ☕
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Enter your details to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border bg-white text-gray-900 px-4 py-2 rounded-lg"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border bg-white text-gray-900 px-4 py-2 rounded-lg"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
        >
          Continue →
        </button>
      </form>
    </>
  );
}
