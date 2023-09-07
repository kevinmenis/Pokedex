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
