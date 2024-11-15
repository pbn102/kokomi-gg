import React, { FormEvent, useState } from "react";
import SearchIconButton from "../Icons/SearchIconButton";
import { GenshinAccount, GenshinCharacter } from "../../Types/Genshin";
import ShortCharacterList from "../CharacterList/ShortCharacterList";
import ShortUserInfo from "../UserInfo/ShortUserInfo";
import './CustomScrollBar.css';
import Modal from "../Modal/Modal";
import { showToast } from "../Toast/ToastContext";

interface UidInputModalProps {
    setUserData: (user: GenshinAccount) => void;
    themePreference: string;
};

const UidInputModal: React.FC<UidInputModalProps> = ({ setUserData, themePreference }) => {
    const [uid, setUid] = useState('');
    const [flash, setFlash] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previousUid, setPreviousUid] = useState<string | null>(null);
    const [fetchedUserData, setFetchedUserData] = useState<GenshinAccount>();
    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        let value = inputElement.value.replace(/[^0-9]/g, '');

        value = value.slice(0, 9);

        setUid(value);
        setFlash(false);
    };

    const handleSearchClick = () => {
        if (uid.length === 9 && uid !== previousUid) {
            setIsLoading(true);
            getCharacterData(uid);
            setPreviousUid(uid);
        } else {
            setFlash(true);
            setTimeout(() => {
                setFlash(false);
            }, 500);
        }
    };

    const getCharacterData = (uid: string) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users/${uid}`)
            .then((data: Response) => {
                if (!data.ok) {
                    throw new Error(`Failed to fetch data. Status: ${data.status}`);
                }
                return data.json();
            })
            .then((userData: GenshinAccount) => {
                setFetchedUserData(userData);
            })
            .catch((error: Error) => {
                console.error(error.message);
                showToast("Failed to fetch UID", "error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const selectAllCharacters = () => {
        const allCharacters = fetchedUserData?.characters || {};
        const allCharacterNames = Object.keys(allCharacters);

        setSelectedCharacters(allCharacterNames);
    };

    const deselectAllCharacters = () => {
        setSelectedCharacters([]);
    };

    const importSelectedCharacters = () => {
        if (!fetchedUserData) {
            console.error('fetchedUserData is undefined');
            return;
        }

        const allCharacters = fetchedUserData.characters || {};
        const selectedCharactersData = Object.keys(allCharacters)
            .filter(name => selectedCharacters.includes(name))
            .reduce((obj, key) => {
                obj[key] = allCharacters[key];
                return obj;
            }, {} as { [name: string]: GenshinCharacter });

        const updatedUserData: GenshinAccount = {
            ...fetchedUserData,
            characters: selectedCharactersData,
        };

        setUserData(updatedUserData);
        closeUidModal();
    };

    const closeUidModal = () => {
        const uidModalCheckbox = document.getElementById('uid_modal') as HTMLInputElement;
        if (uidModalCheckbox) {
            uidModalCheckbox.checked = false;
        }
    };

    return (
        <Modal modal_id="uid_modal" customClass="sm:max-w-5xl">
            <h3 className="font-bold text-lg text-left pb-3">Enter UID</h3>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="UID"
                    className={`rounded-box input input-bordered pl-12 ${flash ? 'input-error animate-shake animate-duration-[250ms]' : ''}`}
                    value={uid}
                    onInput={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchClick();
                        }
                    }}
                />
                <div className="absolute top-1/2 transform -translate-y-1/2">
                    <label className={`btn btn-ghost btn-circle ${flash ? 'animate-shake animate-duration-[250ms]' : ''}`}>
                        {isLoading ?
                            <span className="loading loading-spinner"></span> :
                            <SearchIconButton onClick={handleSearchClick} />
                        }
                    </label>
                </div>
            </div>
            {fetchedUserData && Object.keys(fetchedUserData.characters).length > 0 ? (
                <div className="pt-6">
                    <h2 className="text-xl font-semibold">Select Characters to Import</h2>
                    <ShortUserInfo
                        name={fetchedUserData.name}
                        picUrl={fetchedUserData.profilePicUrl}
                        adventureRank={fetchedUserData.adventure_rank}
                        worldLevel={fetchedUserData.world_level}
                        signature={fetchedUserData.signature}
                    />
                    <div className="flex justify-center mt-4">
                        <ShortCharacterList characterData={Object.values(fetchedUserData.characters)} themePreference={themePreference} selectedCharacters={selectedCharacters} setSelectedCharacters={setSelectedCharacters} />
                    </div>
                    <div className="px-3 pt-3 flex justify-between">
                        <button className="btn btn-error" onClick={deselectAllCharacters}>
                            Clear
                        </button>
                        <div>
                            <button className="btn" onClick={selectAllCharacters}>
                                Select All
                            </button>
                            <button className="btn btn-success ml-3" onClick={importSelectedCharacters}>
                                Import
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </Modal>
    );
};

export default UidInputModal;
