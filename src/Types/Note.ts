import { GenshinCharacter } from "./Genshin";

export interface GenshinNote {
    character: GenshinCharacter;
    title: string;
    description: string;
    time: number;
    labels: string[];
};