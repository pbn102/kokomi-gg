interface ChevronUpProps {
    isOpen: boolean;
}

const ChevronUp: React.FC<ChevronUpProps> = ({ isOpen }) => (
    <div
        style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
        }}
    >
        <svg
            className="w-4 h-4 self-center"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
);

export default ChevronUp;