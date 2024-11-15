import React from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

interface ToastProps {
    id: number;
    message: string;
    type: "info" | "success" | "warning" | "error";
    index: number;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
    let icon = null;

    switch (type) {
        case "info":
            icon = <FaInfoCircle className="icon-info" />;
            break;
        case "success":
            icon = <FaCheckCircle className="icon-success" />;
            break;
        case "warning":
            icon = <FaExclamationCircle className="icon-warning" />;
            break;
        case "error":
            icon = <FaTimesCircle className="icon-error" />;
            break;
        default:
            icon = null;
            break;
    }

    return (
        <div className="alert animate-fade-up">
            {icon && <span className="icon">{icon}</span>}
            <span>{message}</span>
        </div>
    );
};

export default Toast;
