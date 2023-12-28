import React from "react";
import { elementColorMap, elementIconMap, elementRingMap } from "../../Constants/consts";
import { GenshinCharacter } from "../../Types/Genshin";
import HealthIcon from "../Icons/Stats/HealthIcon";
import AttackIcon from "../Icons/Stats/AttackIcon";
import CritRateIcon from "../Icons/Stats/CritRateIcon";
import DefenseIcon from "../Icons/Stats/DefenseIcon";
import ElementalMasteryIcon from "../Icons/Stats/ElementalMasteryIcon";
import EnergyRechargeIcon from "../Icons/Stats/EnergyRechargeIcon";
import CritDamageIcon from "../Icons/Stats/CritDamageIcon";
import StatItem from "../StatItem/StatItem";
import Talent from "../Talent/Talent";

interface CharacterProps extends GenshinCharacter { }

const Character: React.FC<CharacterProps> = ({
    characterPicUrl,
    namecardUrl,
    name,
    level,
    max_level,
    element,
    constellation_level,
    normal_attack,
    elemental_skill,
    elemental_burst,
    hp,
    atk,
    def,
    elemental_mastery,
    crit_dmg,
    crit_rate,
    energy_recharge,
    elemental_dmg_bonus,
    is_physical
}) => {
    const elementColor = elementColorMap[element];
    const ElementIcon = elementIconMap[element];

    const isFinalAsc = max_level > 80;
    const characterNameStyle: React.CSSProperties = isFinalAsc
        ? { color: elementColor }
        : {};

    const ringClass = elementRingMap[element] || "";

    const renderElementIcon = () => {
        if (elemental_dmg_bonus !== 0) {
            return (
                <StatItem
                    icon={ElementIcon}
                    label={is_physical ? "Physical DMG Bonus" : "Elemental DMG Bonus"}
                    value={`${elemental_dmg_bonus.toFixed(2)}%`}
                    color={elementColor} />
            );
        }
        return null;
    };

    return (
        <div className="card card-compact py-4 rounded-md image-full max-w-full">
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
                                C{constellation_level}
                            </div>
                        </div>
                        <div className="text-sm text-left">
                            <p>Level {level}/{max_level}</p>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <Talent
                                picUrl={normal_attack.skillPicUrl}
                                name={normal_attack.name}
                                level={normal_attack.level} />
                            <Talent
                                picUrl={elemental_skill.skillPicUrl}
                                name={elemental_skill.name}
                                level={elemental_skill.level} />
                            <Talent
                                picUrl={elemental_burst.skillPicUrl}
                                name={elemental_burst.name}
                                level={elemental_burst.level} />
                        </div>
                    </div>
                </div>

                <div className="card-body -ml-4 w-[calc(100%+2rem)] -mb-4 bg-base-200 flex-grow rounded-b-lg text-base-content">
                    <div className="text-md">
                        <StatItem icon={HealthIcon} label="HP" value={Math.round(hp)} />
                        <StatItem icon={AttackIcon} label="ATK" value={Math.round(atk)} />
                        <StatItem icon={DefenseIcon} label="DEF" value={Math.round(def)} />
                        <StatItem icon={ElementalMasteryIcon} label="Elemental Mastery" value={Math.round(elemental_mastery)} />
                        <StatItem icon={CritRateIcon} label="Crit Rate" value={`${crit_rate.toFixed(2)}%`} />
                        <StatItem icon={CritDamageIcon} label="Crit DMG" value={`${crit_dmg.toFixed(2)}%`} />
                        <StatItem icon={EnergyRechargeIcon} label="Energy Recharge" value={`${energy_recharge.toFixed(2)}%`} />
                        {renderElementIcon()}
                    </div>
                </div>

                <div className="card-body -ml-4 w-[calc(100%+2rem)] -mb-4 bg-base-300 flex-grow rounded-b-lg text-base-content">
                    Add/Remove Character
                </div>
            </div>
        </div>
    );
};

export default Character;
