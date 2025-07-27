import React from 'react';
import useKeydown from '../hooks/usekeydown';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([
      {
        id:crypto.randomUUID(),
        message: 'Oh No',
        variant : 'error'
      },
      {
        id:crypto.randomUUID(),
        message: 'Logged in',
        variant : 'success'
      }
    ]);

    const handleEscape = React.useCallback(()=> {
      setToasts([]);
    }, [])
 useKeydown('Escape', handleEscape);
  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ]
    setToasts(nextToasts);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{ toasts, createToast, handleDismiss }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
