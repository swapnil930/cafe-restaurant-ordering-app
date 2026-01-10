import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './contexts/AppContext';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
