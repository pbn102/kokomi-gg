import { GenshinAccount } from '../../Types/Genshin';
import UidInputModal from '../UidInputModal/UidInputModal';

interface AddUserProps {
    themePreference: string;
    userData: GenshinAccount | undefined;
    setUserData: (data: GenshinAccount) => void;
}
const AddUser = ({ themePreference, setUserData }: AddUserProps) => {
    return (
        <div>
            <div className="fixed hero h-screen">
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
                            <UidInputModal
                                themePreference={themePreference}
                                setUserData={setUserData}
                            />
                            <div className="divider lg:divider-horizontal">OR</div>
                            <div className="h-20 rounded-box btn">Import Characters from JSON</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
