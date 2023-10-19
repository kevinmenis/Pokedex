export function formatedIdPokemon(id) {
  if (id < 100) {
    return id.toString().padStart(3, "0");
  } else if (id >= 100) {
    return id;
  }
}

export function formatedNamePokemon(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatedNameStat(str) {
  switch (str) {
    case "hp":
      return "PS";
    case "attack":
      return "Ataque";
    case "defense":
      return "Defensa";
    case "special-attack":
      return "Ataque Especial";
    case "special-defense":
      return "Defensa Especial";
    case "speed":
      return "Velocidad";
  }
}
