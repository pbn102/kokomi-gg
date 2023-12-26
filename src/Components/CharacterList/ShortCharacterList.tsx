import React, { useState } from "react";
import { GenshinCharacter } from "../../Types/Genshin";
import ShortCharacter from "../Character/ShortCharacter";

interface ShortCharacterListProps {
    characterData: GenshinCharacter[];
    themePreference: string;
}

const ShortCharacterList: React.FC<ShortCharacterListProps> = ({ characterData }) => {
    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

    const toggleCharacter = (name: string) => {
        if (selectedCharacters.includes(name)) {
            setSelectedCharacters(selectedCharacters.filter((char) => char !== name));
        } else {
            setSelectedCharacters([...selectedCharacters, name]);
        }
    };

    return characterData.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-8 gap-y-3 md:grid-cols-4 md:gap-x-24">
            {characterData.map((character, index) => (
                <div key={index} className="btn btn-ghost hover:bg-inherit h-full text-center" onClick={() => toggleCharacter(character.name)}>
                    <div className="indicator">
                        {selectedCharacters.includes(character.name) ? (
                            <span className="indicator-item badge badge-success badge-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="fixed w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        ) : (
                            <span className="indicator-item badge badge-neutral badge-outline" />
                        )}
                        <ShortCharacter
                            picUrl={character.characterPicUrl}
                            name={character.name}
                            level={character.level}
                            maxLevel={character.max_level}
                            element={character.element}
                        />
                    </div>
                </div>
            ))}
        </div>
    ) : null;
};

export default ShortCharacterList;
