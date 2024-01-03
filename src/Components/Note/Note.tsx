import React from "react";
import { GenshinNote } from "../../Types/Note";
import { elementRingMap } from "../../Constants/consts";

interface NoteProps {
    note: GenshinNote;
}

const Note: React.FC<NoteProps> = ({ note }) => {
    const { character, title, description, time, labels } = note;
    const localTime = new Date(time).toLocaleString();

    return (
        <div className="card h-80 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex space-x-5 items-center">
                    <img
                        src={character.characterPicUrl}
                        alt={character.name}
                        className={`avatar rounded-full ring ${elementRingMap[character.element ?? ""]} w-16`}
                    />
                    <div className="flex flex-col space-y-1">
                        <h2 className="card-title">{title}</h2>
                        <div className="flex flex-wrap space-x-2 items-center">
                            {labels.map((label, index) => (
                                <span key={index} className="badge badge-primary">
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="pt-3">{description}</p>
                <div className="justify-end">
                    {localTime}
                </div>
            </div>
        </div>
    );
};

export default Note;
