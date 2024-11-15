import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Toast from './Toast';

interface ToastMessage {
    id: number;
    message: string;
    type: "info" | "success" | "warning" | "error";
}

interface ToastContextType {
    showToast: (message: string, type: "info" | "success" | "warning" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let globalShowToast: (message: string, type: "info" | "success" | "warning" | "error") => void;

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (message: string, type: "info" | "success" | "warning" | "error") => {
        const id = new Date().getTime();
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000); // Remove toast after 3 seconds
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    };

    useEffect(() => {
        globalShowToast = showToast;
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast toast-center">
                {toasts.map((toast, index) => (
                    <Toast key={toast.id} id={toast.id} message={toast.message} type={toast.type} index={index} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const showToast = (message: string, type: "info" | "success" | "warning" | "error") => {
    if (globalShowToast) {
        globalShowToast(message, type);
    } else {
        console.error("showToast function not initialized yet.");
    }
};

export { ToastProvider, useToast, showToast };
