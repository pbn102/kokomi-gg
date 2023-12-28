import { useState, useEffect, useRef } from "react";
import { GenshinNote } from "../../Types/Note";
import Modal from "../Modal/Modal";
import { GenshinCharacter } from "../../Types/Genshin";
import StatItem from "../StatItem/StatItem";
import ElectroIcon from "../Icons/Elements/ElectroIcon";
import DendroIcon from "../Icons/Elements/DendroIcon";

interface AddNoteProps {
    onSubmit: (note: GenshinNote) => void;
    characters: GenshinCharacter[];
}

const AddNote: React.FC<AddNoteProps> = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className="card-container card h-80 bg-base-100 shadow-xl flex items-center justify-center">
            <label className="btn btn-ghost hover:bg-base-200 hover:border-current h-fit border-dashed border-2 border-current p-5 rounded-lg" htmlFor="add_note_modal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </label>
            <label className="pt-2">Add a Note</label>
            <Modal modal_id="add_note_modal" customClass="h-2/3 sm:min-h-[25rem] sm:max-w-md">
                <h3 className="font-semibold text-lg text-left pb-6">Create Note</h3>
                <div className="dropdown dropdown-right" ref={dropdownRef}>
                    <div role="button" tabIndex={0} className="btn btn-circle aspect-square w-20 h-20 mr-3" onClick={() => setOpen(!open)}>
                        <img
                            src={"https://api.ambr.top/assets/UI/UI_AvatarIcon_Shougun.png"}
                            alt={"Raiden Shogun"}
                            className={`avatar rounded-full ring ring-Electric w-20`}
                        />
                    </div>
                    <div className={`${open ? "" : "hidden"}`}>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base rounded-box w-52">
                            <li><StatItem icon={ElectroIcon} value={"Raiden Shogun"} color="#aa7eee"/></li>
                            <li><StatItem icon={DendroIcon} value={"Nahida"} color="#bacd84"/></li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AddNote;
