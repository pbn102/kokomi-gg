import AddNote from "../../Components/AddNote/AddNote";
import Note from "../../Components/Note/Note";

function Home() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 grid-rows-4 gap-4 ">
      <AddNote />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
    </div>
  );
}

export default Home;
