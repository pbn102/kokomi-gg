const AddNote = () => {
    return (
        <div className="card-container card h-80 bg-base-100 shadow-xl flex items-center justify-center">
            <div className="add-note-image border-dashed border-2 border-current p-5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <a className="pt-2">Add a Note</a>
        </div>
    );
}

export default AddNote;
