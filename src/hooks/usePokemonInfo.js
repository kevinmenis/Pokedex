import { useEffect, useState } from "react";
import { infoPokemon } from "../services/pokemon";
import { validateNamePokemonForApi } from "../utils/validations/NamePokemon";

export const usePokemonInfo = (name) => {
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const namePokemon = validateNamePokemonForApi(name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await infoPokemon(namePokemon);

        if (data == null) setPokemonData(null);
        else {
          const id = data.id;
          const idPrevious = id == 1 ? 1010 : parseInt(id) - 1;
          const idNext = id == 1010 ? 1 : parseInt(id) + 1;
          const [selected, previous, next] = await Promise.all([
            infoPokemon(id),
            infoPokemon(idPrevious),
            infoPokemon(idNext),
          ]);

          const pokemonInfo = {
            selected,
            previous,
            next,
          };
          setPokemonData(pokemonInfo);
        }
      } catch (error) {
        setPokemonData([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return {
    pokemonData,
    loading,
  };
};
