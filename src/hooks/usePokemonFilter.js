import { searchPokemonByCriteria } from "../services/pokemon";

function usePokemonFilter({
  pokemonList,
  searchPokemon,
  selectOrder,
  selectGeneration,
  selectType,
}) {
  const getPokemon = () => {
    if (pokemonList.length == 0) return [];

    const listPokemonFiltered = searchPokemonByCriteria(
      [...pokemonList],
      selectOrder,
      selectGeneration,
      selectType,
      searchPokemon
    );

    return listPokemonFiltered.length > 0 ? listPokemonFiltered : [];
  };

  return { getPokemon };
}

export default usePokemonFilter;
