import { ReactNode, useEffect, useRef, useState } from 'react';

interface MenuItemProps {
    icon: React.ReactNode;
    content?: React.ReactNode;
    index: number;
    totalItems: number;
    onClick: () => void;
}

interface CircleMenuOption {
    content?: ReactNode;
    icon: React.ReactNode;
    onClick: () => void;
}

interface CircleMenuProps<T> {
    options: CircleMenuOption[];
    selectedOption?: T | null;
    buttonContent: ((selectedOption: T | null, open: boolean) => ReactNode) | string;
    buttonStyles?: string;
}

const CircleMenu = <T extends unknown>({ options, selectedOption, buttonContent, buttonStyles }: CircleMenuProps<T>) => {
    const [open, setOpen] = useState(false);
    const circleMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (circleMenuRef.current && !circleMenuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [selectedOption]);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div className="flex relative" ref={circleMenuRef}>
            <button className={`${buttonStyles} w-20 h-20 z-[3]`} onClick={toggleMenu}>
                {typeof buttonContent === 'function' ? buttonContent(selectedOption ?? null, open) : buttonContent}
            </button>

            <div
                id="menu-container"
                className={`absolute w-20 h-20 ${open ? 'animate-jump-in' : 'animate-jump-out'} z-[2]`}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        icon={option.icon}
                        content={option.content}
                        index={index}
                        totalItems={options.length}
                        onClick={option.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, index, totalItems, content, onClick }) => {
    const angle = (2 * Math.PI * index) / totalItems;
    const radius = 4.5;

    const style: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translate(${radius * Math.cos(angle)}rem, ${radius * Math.sin(angle)}rem)`,
    };

    return (
        <div className="btn btn-circle h-12 w-12" style={style} onClick={onClick}>
            {content ? content : icon} 
        </div>
    );
};

export default CircleMenu;
