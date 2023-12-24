export type GenshinAccount = {
  name: string,
  adventure_rank: number,
  world_level: number,
  signature: string,
  profilePicUrl: string,
  characters: GenshinCharacter[]
}

export type GenshinCharacter = {
  name: string,
  level: number,
  max_level: number,
  constellation_level: number,
  element:  "Wind" | "Rock" | "Electric" | "Grass" | "Water" | "Fire" | "Ice";
  normal_attack: GenshinSkill,
  elemental_skill: GenshinSkill,
  elemental_burst: GenshinSkill,
  hp: number,
  atk: number,
  def: number,
  elemental_mastery: number,
  crit_dmg: number,
  crit_rate: number,
  energy_recharge: number,
  elemental_dmg_bonus: number,
  is_physical: boolean
}

export type GenshinSkill = {
  name: string,
  base_level: number,
  extra: number,
  level: number,
  skillPicUrl: string
}