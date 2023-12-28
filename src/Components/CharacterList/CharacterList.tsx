import { GenshinCharacter } from "../../Types/Genshin";
import Character from "../Character/Character";

interface CharacterListProps {
  characters: GenshinCharacter[];
  themePreference: string;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4 2xl:grid-cols-5">
      {characters.map((character, index) => (
        <div key={index}>
          <Character {...character} />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
