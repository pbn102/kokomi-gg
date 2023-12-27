import { elementColorMap, elementRingMap } from "../../Constants/consts";
import { GenshinSkill } from "../../Types/Genshin";

interface CharacterProps {
    characterPicUrl: string;
    namecardUrl: string;
    name: string;
    level: number;
    maxLevel: number;
    element: "Wind" | "Rock" | "Electric" | "Grass" | "Water" | "Fire" | "Ice";
    constellationLevel: number;
    normalAttack: GenshinSkill;
    elementalSkill: GenshinSkill;
    elementalBurst: GenshinSkill;
}

const Character: React.FC<CharacterProps> = ({
    characterPicUrl,
    namecardUrl,
    name,
    level,
    maxLevel,
    element,
    constellationLevel,
    normalAttack,
    elementalSkill,
    elementalBurst
}) => {
    const elementColor = elementColorMap[element];
    const isFinalAsc = maxLevel > 80;
    const characterNameStyle: React.CSSProperties = isFinalAsc
        ? { color: elementColor }
        : {};

    const ringClass = elementRingMap[element] || "";

    return (
        <div className="card card-compact py-4 rounded-md image-full max-w-lg">
            <img
                className="rounded-2xl w-full"
                src={namecardUrl}
                alt={name + " Namecard"}
            />
            <div className="card-body flex flex-col w-full">
                <div className="card-title flex items-center">
                    <img
                        src={characterPicUrl}
                        alt={name}
                        loading="eager"
                        className={`avatar rounded-full ring ${ringClass} w-20`}
                    />
                    <div className="flex flex-col pl-4">
                        <div
                            className="font-semibold flex items-center space-x-2"
                            style={characterNameStyle}
                        >
                            <span className="pr-1">{name}</span>
                            <div
                                className="badge"
                                style={{
                                    backgroundColor: elementColor,
                                    color: "black",
                                    border: "none",
                                }}
                            >
                                C{constellationLevel}
                            </div>
                        </div>
                        <div className="text-sm text-left">
                            <p>Level {level}/{maxLevel}</p>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="indicator">
                                <span className="indicator-item indicator-bottom badge badge-sm">{normalAttack.level}</span>
                                <img
                                    src={normalAttack.skillPicUrl}
                                    alt={normalAttack.name}
                                    className="avatar w-8"
                                />
                            </div>
                            <div className="indicator">
                                <span className="indicator-item indicator-bottom badge badge-sm">{elementalSkill.level}</span>
                                <img
                                    src={elementalSkill.skillPicUrl}
                                    alt={elementalSkill.name}
                                    className="avatar w-8"
                                />
                            </div>
                            <div className="indicator">
                                <span className="indicator-item indicator-bottom badge badge-sm">{elementalBurst.level}</span>
                                <img
                                    src={elementalBurst.skillPicUrl}
                                    alt={elementalBurst.name}
                                    className="avatar w-8"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card-body -ml-4 w-[calc(100%+2rem)] -mb-4 bg-base-200 flex-grow rounded-b-lg">
                    Stats
                </div>
                <div className="card-body -ml-4 w-[calc(100%+2rem)] -mb-4 bg-base-300 flex-grow rounded-b-lg">
                    Add/Remove Character
                </div>
            </div>
        </div>
    );
};

export default Character;
