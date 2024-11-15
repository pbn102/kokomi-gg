import { useState } from "react";
import { GenshinAccount, GenshinCharacter } from "../../Types/Genshin";
import { showToast } from "../Toast/ToastContext";

interface RefreshCharactersProps {
    userData: GenshinAccount;
    updateUserData: (user: GenshinAccount) => void;
}

const RefreshCharacters: React.FC<RefreshCharactersProps> = ({ userData, updateUserData }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getCharacterData = () => {
        if (isLoading) {
            return; // Prevent making a new request if already loading
        }

        setIsLoading(true);

        fetch(`${import.meta.env.VITE_API_URL}/api/users/${userData.uid}`)
            .then((data: Response) => {
                if (!data.ok) {
                    throw new Error(`Failed to fetch data. Status: ${data.status}`);
                }
                return data.json();
            })
            .then((fetchedData: GenshinAccount) => {
                syncCharacterData(userData, fetchedData);
                showToast("Characters Refreshed!", "success");
            })
            .catch((error) => {
                console.error(error);
                showToast("Failed to refresh characters", "error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const syncCharacterData = (originalUser: GenshinAccount, updatedUser: GenshinAccount) => {
        if (!originalUser || !updatedUser) {
            console.log("Could not find object.");
            return;
        }
    
        const originalCharacterNames = Object.values(originalUser.characters).map((character: GenshinCharacter) => character.name);
        const updatedCharacterNames = Object.keys(updatedUser.characters);
    
        const allCharacterNames = [...new Set([...originalCharacterNames, ...updatedCharacterNames])];
    
        for (const name of allCharacterNames) {
            const originalCharacter = originalUser.characters[name];
            const updatedCharacter = updatedUser.characters[name];
    
            // Check if the character exists in both original and updated user's data
            if (originalCharacter && updatedCharacter) {
                // Update the original character data with the updated character data
                originalUser.characters[name] = updatedCharacter;
                console.log(`Character '${name}' data has been synced.`);
            } else if (originalCharacter) {
                console.log(`Character '${name}' is missing in the updated data.`);
            } else if (updatedCharacter) {
                console.log(`Character '${name}' is missing in the original data.`);
            }
        }
    
        updateUserData(originalUser);
    };
    
    
    
    return (
        <button
            className="md:tooltip md:tooltip-bottom btn btn-circle btn-ghost"
            data-tip="Refresh Characters"
            onClick={getCharacterData}
            disabled={isLoading}
        >
            {isLoading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 hover:animate-spin hover:animate-once hover:animate-ease-in-out ml-1.5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            )}
        </button>
    );
};

export default RefreshCharacters;
