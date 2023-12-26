import { useState } from 'react';
import { GenshinCharacter } from '../../Types/Genshin';
import UidInputModal from '../UidInputModal/UidInputModal';

interface AddUserProps {
    themePreference: string;
}
const AddUser = ({ themePreference }: AddUserProps) => {
    const [characterData, setCharacterData] = useState<GenshinCharacter[]>([]);

    const populateCharacters = (characters: GenshinCharacter[]) => {
        setCharacterData(characters);
    };

    return (
        <div className="fixed hero min-h-screen">
            <div className="hero-content text-center">
                <div>
                    <h1 className="text-5xl font-bold">No Characters Found.</h1>
                    <div className="flex flex-col w-full lg:flex-row py-6">
                        <label
                            htmlFor="uid_modal"
                            className="h-20 rounded-box btn"
                        >
                            Import Characters from UID
                        </label>
                        <UidInputModal
                            themePreference={themePreference}
                            characterData={characterData}
                            populateCharacters={populateCharacters}
                        />
                        <div className="divider lg:divider-horizontal">OR</div>
                        <div className="h-20 rounded-box btn">Import Characters from JSON</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
