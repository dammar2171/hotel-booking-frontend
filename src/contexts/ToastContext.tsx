import { createContext, useContext, useState, type ReactNode } from "react";
import Toast from "../components/ui/Toast";

type Type = "info" | "success" | "error" | "warning";

export interface ToastItem {
  id:      number;
  message: string;
  type:    Type;
}

interface ToastContextType {
  addToast:    (message: string, type: Type) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: Type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div style={{
        position: "fixed",
        top:   "34px",
        right:    "24px",
        zIndex:   1000,
        display:  "flex",
        flexDirection: "column",
        gap:      "8px",
      }}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}