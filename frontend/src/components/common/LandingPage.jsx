import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';


export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(t);
  }, [navigate]);

  return <Loader text="Welcome to Café Delight ☕" />;
}
