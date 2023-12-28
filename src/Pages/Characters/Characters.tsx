import AddUser from '../../Components/AddUser/AddUser';
import CharacterList from '../../Components/CharacterList/CharacterList';
import { GenshinAccount } from '../../Types/Genshin';
import LoadingPage from '../../Components/Loading/LoadingContent';

interface CharactersProps {
  themePreference: string;
  userData: GenshinAccount | undefined;
  setUserData: (data: GenshinAccount) => void;
  loadingUserData: boolean;
}

const Characters = ({ themePreference, userData, setUserData, loadingUserData }: CharactersProps) => {
  return (
    <div className="flex flex-wrap">
      {loadingUserData ? (
        <LoadingPage />
      ) : userData ? (
        <CharacterList characters={userData.characters} themePreference={themePreference} />
      ) : (
        <AddUser themePreference={themePreference} userData={userData} setUserData={setUserData} />
      )}
    </div>
  );
};

export default Characters;
