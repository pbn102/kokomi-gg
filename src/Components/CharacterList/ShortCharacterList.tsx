import React from "react";
import { GenshinCharacter } from "../../Types/Genshin";
import ShortCharacter from "../Character/ShortCharacter";

interface ShortCharacterListProps {
    characterData: GenshinCharacter[];
    themePreference: string;
}

const ShortCharacterList: React.FC<ShortCharacterListProps> = ({ characterData }) => {
    return characterData.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-8 gap-y-3 md:grid-cols-4 md:gap-x-24">
            {characterData.map((character, index) => (
                <div key={index} className="text-center">
                    <ShortCharacter
                        picUrl={character.characterPicUrl}
                        name={character.name}
                        level={character.level}
                        maxLevel={character.max_level}
                        element={character.element}
                    />
                </div>
            ))}
        </div>
    ) : null;
};

export default ShortCharacterList;
