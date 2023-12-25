import { FormEvent, useState } from 'react';
import SearchIconButton from '../Icons/SearchIconButton';
import { GenshinAccount, GenshinCharacter } from '../../Types/Genshin';

const AddUser = () => {
    const [uid, setUid] = useState('');
    const [flash, setFlash] = useState(false);
    const [characterData, setCharacterData] = useState<GenshinCharacter[]>([]);

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        let value = inputElement.value.replace(/[^0-9]/g, '');

        value = value.slice(0, 9);

        setUid(value);
        setFlash(false);
    };

    const handleSearchClick = () => {
        if (uid.length === 9) {
            // Handle search logic here
            console.log('Searching for UID:', uid);
            getCharacterData(uid);
        } else {
            // Flash red and revert back
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
                    // Handle non-OK responses
                    throw new Error(`Failed to fetch data. Status: ${data.status}`);
                }
                console.log(data);
                return data.json();
            })
            .then((userData: GenshinAccount) => {
                populateCharacters(userData.characters);
            })
            .catch((error) => {
                // Handle errors from the fetch or JSON parsing
                console.error(error);
                // TODO: Call showToast hook with an appropriate message
            });
    };

    const populateCharacters = (characters: GenshinCharacter[]) => {
        setCharacterData(characters);
    };

    return (
        <div className="hero min-h-screen">
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
                        <input type="checkbox" id="uid_modal" className="modal-toggle" />
                        <dialog id="uid_modal" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg text-left pb-3">Enter UID</h3>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="UID"
                                        className={`rounded-box input input-bordered pl-12 ${flash ? 'input-error' : ''}`}
                                        value={uid}
                                        onInput={handleInputChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearchClick();
                                            }
                                        }}
                                    />
                                    <div className="absolute top-1/2 transform -translate-y-1/2">
                                        <label className="btn btn-ghost btn-circle">
                                            <SearchIconButton onClick={handleSearchClick} />
                                        </label>
                                    </div>
                                </div>
                                {characterData.length > 0 && (
                                    <div className="py-12">
                                        <h2 className="text-xl font-semibold">Imported Characters:</h2>
                                        <ul>
                                            {characterData.map((character, index) => (
                                                <li key={index}>
                                                    {character.name} - Level {character.level}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <label htmlFor="uid_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </label>
                            </div>
                            <label htmlFor="uid_modal" className="modal-backdrop">
                            </label>
                        </dialog>
                        <div className="divider lg:divider-horizontal">OR</div>
                        <div className="h-20 rounded-box btn">Import Characters from JSON</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
