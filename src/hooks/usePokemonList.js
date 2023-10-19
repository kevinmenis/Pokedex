import { useEffect, useState } from "react";
import { listPokemon } from "../services/pokemon";

function usePokemonList(/* { searchPokemon, selectOrder, selectType } */) {
  // Este estado es para mandar a la vista los pokemon que cumplen depende el filtro pedido
  const [pokemonList, setPokemonList] = useState([]);

  // Este estado es para guardar un array con todos los pokemon
  const [loading, setLoading] = useState(true);

  // Esto para cargar al principio del programa un array que contiene la lista de pokemon  con name, id, types
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        var fetchedPokemon = await listPokemon();
        setPokemonList(fetchedPokemon);
      } catch (error) {
        /* console.error(error); */
      } finally {
        fetchedPokemon.length == 0 ? setLoading(true) : setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  return { pokemonList, loading };
}

export default usePokemonList;
