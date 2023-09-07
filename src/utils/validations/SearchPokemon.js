export function validateSearchPokemon(searchPokemon) {
  if (searchPokemon.trim() === "") return "null";
  if (Number.isInteger(Number(searchPokemon))) return "number";
  if (/^[a-zA-Z]+$/.test(searchPokemon)) return "nombre";
  return "error";
}
