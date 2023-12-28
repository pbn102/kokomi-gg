import AnemoIcon from "../Components/Icons/Elements/AnemoIcon";
import CryoIcon from "../Components/Icons/Elements/CryoIcon";
import DendroIcon from "../Components/Icons/Elements/DendroIcon";
import ElectroIcon from "../Components/Icons/Elements/ElectroIcon";
import GeoIcon from "../Components/Icons/Elements/GeoIcon";
import HydroIcon from "../Components/Icons/Elements/HydroIcon";
import PyroIcon from "../Components/Icons/Elements/PyroIcon";

enum GenshinElement {
    Wind = "Wind",
    Rock = "Rock",
    Electric = "Electric",
    Grass = "Grass",
    Water = "Water",
    Fire = "Fire",
    Ice = "Ice",
}

const elementColorMap: Record<GenshinElement, string> = {
    Wind: "#b3dec1",
    Rock: "#e8c660",
    Electric: "#aa7eee",
    Grass: "#bacd84",
    Water: "#698ae8",
    Fire: "#f0a762",
    Ice: "#b9dfe4",
};

const elementRingMap: Record<string, string> = {
	Wind: "ring-Wind",
	Rock: "ring-Rock",
	Electric: "ring-Electric",
	Grass: "ring-Grass",
	Water: "ring-Water",
	Fire: "ring-Fire",
	Ice: "ring-Ice",
};
  
const elementIconMap: Record<GenshinElement, React.ComponentType> = {
    Wind: AnemoIcon,
	Rock: GeoIcon,
	Electric: ElectroIcon,
	Grass: DendroIcon,
	Water: HydroIcon,
	Fire: PyroIcon,
	Ice: CryoIcon,
};


export { elementColorMap, elementRingMap, elementIconMap };