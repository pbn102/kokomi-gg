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
    Wind: "#B3DEC1",
    Rock: "#e8c660",
    Electric: "#aa7eee",
    Grass: "#bacd84",
    Water: "#698ae8",
    Fire: "#F0A762",
    Ice: "#b9dfe4",
};

export { elementColorMap };