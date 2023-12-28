import { ReactNode, useEffect } from "react";

interface ModalProps {
    modal_id: string;
    children: ReactNode;
    customClass?: string;
};

const Modal: React.FC<ModalProps> = ({ modal_id, children, customClass }) => {

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeUidModal();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const closeUidModal = () => {
        const ModalCheckbox = document.getElementById(modal_id) as HTMLInputElement;
        if (ModalCheckbox) {
            ModalCheckbox.checked = false;
        }
    };

    return (
        <div>
            <input type="checkbox" id={modal_id} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle" role="dialog">
                <div className={`modal-box w-full min-h-[33vh] sm:min-h-fit ${modal_id}-container ${customClass}`}>
                    {children}
                    <label htmlFor={modal_id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </label>
                </div>
                <label htmlFor={modal_id} className="modal-backdrop"></label>
            </div>
        </div>
    );
};

export default Modal;