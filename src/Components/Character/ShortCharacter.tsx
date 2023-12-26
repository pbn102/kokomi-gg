import { elementColorMap } from "../../Constants/consts";

interface ShortCharacterProps {
    picUrl: string;
    name: string;
    level: number;
    maxLevel: number;
    element: "Wind" | "Rock" | "Electric" | "Grass" | "Water" | "Fire" | "Ice";
};

const ShortCharacter: React.FC<ShortCharacterProps> = ({ picUrl, name, level, maxLevel, element }) => {
    const isFinalAsc = maxLevel > 80;
    const characterNameStyle: React.CSSProperties = isFinalAsc ? { color: elementColorMap[element] } : {};
    return (
        <div>
            <img
                src={picUrl}
                alt={name}
                className="mx-auto mb-2 avatar rounded-full w-16 sm:w-24"
            />
            <p className="text-sm font-semibold" style={characterNameStyle}>
                {name}
            </p>
            <p className="text-xs">Level {level}</p>
        </div>
    );
};

export default ShortCharacter;