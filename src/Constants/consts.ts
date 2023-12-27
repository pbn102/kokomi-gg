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
    Wind: 'ring-Wind',
    Rock: 'ring-Rock',
    Electric: 'ring-Electric',
    Grass: 'ring-Grass',
    Water: 'ring-Water',
    Fire: 'ring-Fire',
    Ice: 'ring-Ice',
  };

export { elementColorMap, elementRingMap };