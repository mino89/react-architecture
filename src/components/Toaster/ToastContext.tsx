import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { ToastContextProps, Toast } from "./_types";

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const timeOutIds = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    if (timeOutIds.current[id]) {
      clearTimeout(timeOutIds.current[id]);
      delete timeOutIds.current[id];
    }
  }, []);

  const addToast = useCallback(
    (type: Toast["type"], message: string, duration?: number) => {
      if (!message) return;
      const id = Date.now();
      setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
      const timeoutId = setTimeout(() => removeToast(id), duration ?? 3000);
      timeOutIds.current[id] = timeoutId;
    },
    [removeToast]
  );

  const contextValue = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};
