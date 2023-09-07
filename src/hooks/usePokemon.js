import { useEffect, useState } from "react";
import { listPokemon, searchPokemonByCriteria } from "../services/pokemon";

function usePokemon({ searchPokemon, selectOrder, selectType }) {
  // Este estado es para mandar a la vista los pokemon que cumplen depende el filtro pedido
  const [pokemon, setPokemon] = useState([]);

  // Este estado es para guardar un array con todos los pokemon
  const [arrayPokemon, setArrayPokemon] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorSearch, setErrorSearch] = useState(false);

  // Esto para cargar al principio del programa un array que contiene la lista de pokemon  con name, id, types
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const fetchedPokemon = await listPokemon();
        setPokemon(fetchedPokemon);
        setArrayPokemon(fetchedPokemon);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  // Esto es para cada ves que cambia en el buscador o en los select ya sea por orden o tipo actualiza el estado de pokemon y el del errorSearch, por si en la busqueda no encuentra un pokemon
  useEffect(() => {
    const listPokemonFiltered = searchPokemonByCriteria(
      [...arrayPokemon],
      selectOrder,
      selectType,
      searchPokemon
    );

    listPokemonFiltered.length > 0
      ? (setPokemon(listPokemonFiltered), setErrorSearch(false))
      : (setPokemon(listPokemonFiltered), setErrorSearch(true));
  }, [searchPokemon, selectOrder, selectType]);

  return { pokemon, loading };
}

export default usePokemon;
