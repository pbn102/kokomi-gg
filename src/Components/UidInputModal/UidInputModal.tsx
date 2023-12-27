import React, { FormEvent, useState, useEffect } from "react";
import SearchIconButton from "../Icons/SearchIconButton";
import { GenshinAccount, GenshinCharacter } from "../../Types/Genshin";
import ShortCharacterList from "../CharacterList/ShortCharacterList";
import ShortUserInfo from "../UserInfo/ShortUserInfo";
import './CustomScrollBar.css';

interface UidInputModalProps {
    characterData: GenshinCharacter[];
    populateCharacters: (characters: GenshinCharacter[]) => void;
    themePreference: string;
};

const UidInputModal: React.FC<UidInputModalProps> = ({ characterData, populateCharacters, themePreference }) => {
    const [uid, setUid] = useState('');
    const [flash, setFlash] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previousUid, setPreviousUid] = useState<string | null>(null);
    const [userData, setUserData] = useState<GenshinAccount>();

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeUidModal();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

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
                populateCharacters(userData.characters);
                setUserData(userData);
            })
            .catch((error) => {
                console.error(error);
                // TODO: Call showToast with an appropriate message
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const closeUidModal = () => {
        const uidModalCheckbox = document.getElementById('uid_modal') as HTMLInputElement;
        if (uidModalCheckbox) {
            uidModalCheckbox.checked = false;
        }
    };

    return (
        <div>
            <input type="checkbox" id="uid_modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle" role="dialog">
                <div className="modal-box w-full sm:max-w-5xl min-h-1/3 uid-input-modal-container">
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
                    {userData && characterData.length > 0 ? (
                        <div className="py-6">
                            <h2 className="text-xl font-semibold">Select Characters to Import</h2>
                            <ShortUserInfo
                                name={userData.name}
                                picUrl={userData.profilePicUrl}
                                adventureRank={userData.adventure_rank}
                                worldLevel={userData.world_level}
                                signature={userData.signature}
                            />
                            <div className="flex justify-center mt-4">
                                <ShortCharacterList characterData={characterData} themePreference={themePreference} />
                            </div>
                        </div>
                    ) : null}
                    <label htmlFor="uid_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </label>
                </div>
                <label htmlFor="uid_modal" className="modal-backdrop"></label>
            </div>
        </div>
    );
};

export default UidInputModal;
