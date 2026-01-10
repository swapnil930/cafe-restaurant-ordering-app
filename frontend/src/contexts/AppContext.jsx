import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // -------- USER --------
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  // -------- CART --------
  const [cart, setCart] = useState(() => {
    const c = localStorage.getItem('cart');
    return c ? JSON.parse(c) : [];
  });

  // -------- ORDERS --------
  const [orders, setOrders] = useState([]);

  // Persist user
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // -------- CART ACTIONS --------
  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);

    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // -------- ORDER --------
  const placeOrder = () => {
    const newOrder = {
      id: Date.now(),
      customer: user,
      items: cart,
      status: 'waiting',
      createdAt: new Date().toISOString(),
    };

    setOrders([...orders, newOrder]);
    clearCart();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        orders,
        setOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
