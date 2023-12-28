import { GenshinNote } from "../../Types/Note";

interface AddNoteProps {
    onSubmit: (note: GenshinNote) => void;
}
const AddNote: React.FC<AddNoteProps> = () => {
    return (
        <div className="card-container card h-80 bg-base-100 shadow-xl flex items-center justify-center">
            <div className="btn btn-ghost hover:bg-base-200 hover:border-current h-fit border-dashed border-2 border-current p-5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <label className="pt-2" htmlFor="add_note_modal">Add a Note</label>
        </div>
    );
}

export default AddNote;
