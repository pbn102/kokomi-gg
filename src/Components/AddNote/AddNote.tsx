import { ReactNode, useState } from "react";
import { GenshinNote } from "../../Types/Note";
import Modal from "../Modal/Modal";
import { GenshinCharacter } from "../../Types/Genshin";
import { elementColorMap, elementIconMap, elementRingMap } from "../../Constants/consts";
import Dropdown from "../Dropdown/Dropdown";
import StatItem from "../StatItem/StatItem";
import ChevronDown from "../Icons/Assets/ChevronDown";
import CircleMenu from "../OptionButton/OptionButton";
import CryoIcon from "../Icons/Elements/CryoIcon";
import AttackIcon from "../Icons/Stats/AttackIcon";
import UserIcon from "../Icons/Assets/UserIcon";

interface AddNoteProps {
    onSubmit: (note: GenshinNote) => void;
    characters:  { [name: string]: GenshinCharacter };
};

const AddNote: React.FC<AddNoteProps> = ({ onSubmit, characters }) => {
    const [selectedCharacter, setSelectedCharacter] = useState<GenshinCharacter | null>(Object.values(characters)[0] ?? null);
    const [labels, setlabels] = useState<string[]>([]);
    function handleCharactersClick() {
        console.log("Character Clicked!");
    }

    function handleWeaponClick() {
        console.log("Weapon Clicked!");
    }

    function handleCryoClick() {
        console.log("Talent Clicked!")
    }

    const renderCharacterOption = (character: GenshinCharacter) => (
        <StatItem
            icon={elementIconMap[character.element]}
            value={character.name}
            color={elementColorMap[character.element]} />
    );

    const renderSelectedOption: (selectedOption: GenshinCharacter | null) => JSX.Element | null = (selectedCharacter) => {
        return (
            <div>
                {selectedCharacter ? (
                    <img
                        src={selectedCharacter.characterPicUrl}
                        alt={selectedCharacter.name}
                        className={`avatar rounded-full ring ${elementRingMap[selectedCharacter.element ?? ""]} w-20`}
                    />
                ) : null}
            </div>
        );
    };

    const renderAddTagButton = (isOpen: boolean) => {
        return (
            <div className="flex flex-col items-start space-y-1">
                <div>
                    <div className="flex flex-row space-x-1 items-center">
                        <ChevronDown isOpen={isOpen} />
                        <p>Add label...</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderlabels = () => {
        return (
            labels.length > 0 && (
                <div className="flex flex-wrap space-x-2 items-center">
                    {labels.map((label, index) => (
                        <span key={index} className="badge badge-primary">
                            {label}
                        </span>
                    ))}
                </div>
            )
        );
    };
    
    const closeAddNoteModal = () => {
        const addNoteModalCheckbox = document.getElementById("add_note_modal") as HTMLInputElement;
        if (addNoteModalCheckbox) {
            addNoteModalCheckbox.checked = false;
        }
    };

    const addNote = () => {
        if (!selectedCharacter) {
            console.error("Please select a character before adding a note.");
            return;
        }
    
        const titleInput = document.querySelector(".input") as HTMLInputElement | null;
        const descriptionTextarea = document.querySelector(".textarea") as HTMLTextAreaElement | null;
    
        if (!titleInput || !descriptionTextarea) {
            console.error("Error accessing input/textarea elements.");
            return;
        }
    
        const title = titleInput.value.trim();
        const description = descriptionTextarea.value.trim();
    
        if (!title || !description) {
            console.error("Please fill in both the title and description before adding a note.");
            return;
        }
    
        const note: GenshinNote = {
            character: selectedCharacter,
            title: title,
            description: description,
            labels: labels,
            time: Date.now(),
        };
    
        onSubmit(note);
        closeAddNoteModal();
    };    

    const options = [
        {
            icon: <UserIcon />,
            onClick: () => handleCharactersClick(),
            content: <Dropdown
                options={Object.values(characters)}
                selectedOption={selectedCharacter}
                onSelect={setSelectedCharacter}
                renderOption={renderCharacterOption}
                renderSelection={renderSelectedOption}
                buttonStyles="btn btn-circle h-12 w-12"
                buttonText={UserIcon}
                dropdownStyles="dropdown-right"
                dropdownOptionStyles="p-2 shadow bg-base-100 rounded-box w-52"
                optionStyles="animate-fade-right"
            />
        },
        { icon: <AttackIcon />, onClick: () => handleWeaponClick() },
        { icon: <CryoIcon />, onClick: () => handleCryoClick() },
    ];

    return (
        <div className="card-container card h-80 bg-base-100 shadow-xl flex items-center justify-center">
            <label className="btn btn-ghost hover:bg-base-200 hover:border-current h-fit border-dashed border-2 border-current p-5 rounded-lg" htmlFor="add_note_modal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </label>
            <label className="pt-2">Add a Note</label>
            <Modal modal_id="add_note_modal" customClass="h-2/3 sm:min-h-[25rem] sm:max-w-md flex flex-col">
                <h3 className="font-semibold text-lg text-left pb-6">Create Note</h3>
                <div className="flex space-x-4 items-top pb-3">
                    <CircleMenu
                        buttonContent={() => selectedCharacter ? renderSelectedOption(selectedCharacter) : ""}
                        selectedOption={selectedCharacter}
                        options={options}
                        buttonStyles="btn-circle aspect-square w-20 h-20" />
                    <div className="flex flex-col">
                        <input type="text" placeholder="Title" className="input input-bordered input-sm mb-1" />
                        <div className="flex flex-row flex-wrap space-x-2 space-y-1">
                            {renderlabels()}
                            <Dropdown
                                options={["Weapon", "Talent", "Domain"]}
                                onSelect={(selectedLabel) => {
                                    if (selectedLabel && !labels.includes(selectedLabel)) {
                                        setlabels([...labels, selectedLabel]);
                                    }
                                }}
                                renderOption={(option): ReactNode => {
                                    return <p>{option}</p>;
                                }}
                                renderSelection={(_: string): ReactNode => {
                                    return;
                                }}
                                buttonText={(_, open) => renderAddTagButton(open)}
                                buttonStyles="badge badge-ghost"
                                dropdownOptionStyles="shadow bg-base-100 rounded-box"
                            />
                        </div>
                    </div>
                </div>
                <textarea placeholder="Description" className="textarea textarea-bordered textarea-md w-full flex-grow" ></textarea>
                <div className="pt-3 flex justify-between">
                    <button className="btn btn-error" onClick={closeAddNoteModal}>
                        Cancel
                    </button>
                    <button className="btn btn-success" onClick={addNote}>
                        Add Note
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AddNote;
