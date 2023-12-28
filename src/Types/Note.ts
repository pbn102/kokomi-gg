import { GenshinCharacter } from "./Genshin";

export interface GenshinNote {
    character: GenshinCharacter;
    description: string;
    time: number;
};