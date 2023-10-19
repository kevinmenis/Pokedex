import { POKE_API } from "../api/endpoint";
import { formatedNamePokemon } from "../utils/Formatting";
import { validateNamePokemon } from "../utils/validations/NamePokemon";
import { nameTypes } from "../utils/validations/Types";

// hace el llamado a la api que devuelve todos los pokemon
export const listPokemon = async () => {
  try {
    const fetchedPokemon = [];

    const requests = Array.from({ length: 1010 }, (_, i) =>
      fetch(`${POKE_API}${i + 1}`)
    );

    const responses = await Promise.all(requests);

    for (const response of responses) {
      if (!response.ok) {
        throw new Error("Error al llamado de la Api");
      }

      const { name, types, species } = await response.json();
      const urlParts = species.url.split("/");
      const id = urlParts[urlParts.length - 2];
      const newName = validateNamePokemon(name);
      fetchedPokemon.push({ id, name: newName, types });
    }

    return fetchedPokemon;
  } catch (error) {
    /* console.error(error); */
    return [];
  }
};

export const infoPokemon = async (id) => {
  try {
    //if (id < 0 || id > 1010) throw new Error("Error en el id o nombre");

    const response = await fetch(`${POKE_API}${id}`);

    if (!response.ok) {
      throw new Error("Error al llamar a la API");
    }

    const json = await response.json();
    const { species, name, types, abilities, stats, height, weight } = json;
    const urlParts = species.url.split("/");
    const pokemonId = urlParts[urlParts.length - 2];
    const newName = validateNamePokemon(name);
    const namePokemon = formatedNamePokemon(newName);

    return {
      id: pokemonId,
      name: namePokemon,
      types,
      abilities,
      stats,
      height,
      weight,
    };
  } catch (error) {
    return null;
  }
};

export const orderTypePokemon = (listPokemon, selectType) => {
  return listPokemon.filter((pokemon) =>
    pokemon.types.some((type) => type.type.name === selectType)
  );
};

// Devuelve una lista de pokemon ordenados ya sea alfabeticamente o por numero y además por tipo ya sea uno especifico o ninguno
export const filterAndOrderPokemonList = (
  listPokemon,
  selectOrder,
  selectType
) => {
  const validateType = nameTypes(selectType);

  switch (selectOrder) {
    case "numberAsc": {
      const orderArray = [...listPokemon].sort((a, b) => a.id - b.id);
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    case "numberDesc": {
      const orderArray = [...listPokemon].sort((a, b) => b.id - a.id);
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    case "nameAsc": {
      const orderArray = listPokemon.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    case "nameDesc": {
      const orderArray = listPokemon.sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
      );
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    default:
      return listPokemon;
  }
};

export const validateSearchPokemon = (searchPokemon) => {
  if (searchPokemon.trim() === "") return "null";
  if (Number.isInteger(Number(searchPokemon))) return "number";
  if (/^[a-zA-Z-]+$/.test(searchPokemon)) return "nombre";
  return "error";
};

// Devuelve el resultado final dependiendo de lo que puso en el buscador
export const searchPokemonByCriteria = (
  arrayPokemon,
  selectOrder,
  selectGeneration,
  selectType,
  searchPokemon
) => {
  const validateSearch = validateSearchPokemon(searchPokemon);

  const listPokemon = filterPokemonListByGeneration(selectGeneration, [
    ...arrayPokemon,
  ]);

  if (validateSearch == "null") {
    return filterAndOrderPokemonList([...listPokemon], selectOrder, selectType);
  }

  if (validateSearch == "number") {
    const foundPokemon = [...listPokemon].filter((pokemon) =>
      pokemon.id.includes(searchPokemon)
    );

    return filterAndOrderPokemonList(foundPokemon, selectOrder, selectType);
  }

  if (validateSearch == "nombre") {
    const foundPokemon = [...listPokemon].filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );

    return filterAndOrderPokemonList(foundPokemon, selectOrder, selectType);
  }

  if (validateSearch == "error") {
    return [];
  }
};

export const filterPokemonListByGeneration = (
  selectGeneration,
  listPokemon
) => {
  switch (selectGeneration) {
    case "generation1":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 1 && pokemonId <= 151;
      });
    case "generation2":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 152 && pokemonId <= 251;
      });
    case "generation3":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 252 && pokemonId <= 386;
      });
    case "generation4":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 387 && pokemonId <= 493;
      });
    case "generation5":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 494 && pokemonId <= 649;
      });
    case "generation6":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 650 && pokemonId <= 721;
      });
    case "generation7":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 722 && pokemonId <= 809;
      });
    case "generation8":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 810 && pokemonId <= 905;
      });
    case "generation9":
      return [...listPokemon].filter((pokemon) => {
        const pokemonId = parseInt(pokemon.id);
        return pokemonId >= 906 && pokemonId <= 1010;
      });
    default:
      return [...listPokemon];
  }
};
