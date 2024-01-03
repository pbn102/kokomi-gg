import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownProps<T> {
    options: T[];
    selectedOption?: T | null;
    onSelect: (option: T) => void;
    renderOption: (option: T) => React.ReactNode;
    renderSelection: (option: T) => React.ReactNode;
    buttonStyles?: string;
    dropdownStyles?: string;
    dropdownOptionStyles?: string;
    optionStyles?: string;
    buttonText: ((selectedOption: T | null, open: boolean) => ReactNode) | string;
}

const Dropdown = <T extends unknown>({
    options,
    selectedOption,
    onSelect,
    renderOption,
    buttonStyles,
    buttonText,
    dropdownStyles,
    dropdownOptionStyles,
    optionStyles,
}: DropdownProps<T>) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOptionSelect = (option: T) => {
        onSelect(option);
        setOpen(false);
    };

    return (
        <div className={`dropdown ${dropdownStyles}`} ref={dropdownRef}>
            <div
                role="button"
                tabIndex={0}
                className={buttonStyles}
                onClick={() => setOpen(!open)}
            >
                {typeof buttonText === 'function' ? buttonText(selectedOption ?? null, open) : buttonText}
            </div>
            <div className={`${open ? '' : 'hidden'}`}>
                <ul tabIndex={0} className={`dropdown-content z-[1] menu ${dropdownOptionStyles}`}>
                    {options.map((option, index) => (
                        <li key={index} className={`animate-fade-down animate-duration-300 ${optionStyles}`} onClick={() => handleOptionSelect(option)}>
                            {renderOption(option)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
