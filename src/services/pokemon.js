import { POKE_API } from "../api/endpoint";
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

      fetchedPokemon.push({ id, name, types });
    }

    return fetchedPokemon;
  } catch (error) {
    console.error(error);
    return []; // devuelve un array vacío en caso de error
  }
};

export const orderTypePokemon = (arrayPokemon, selectType) => {
  return arrayPokemon.filter((pokemon) =>
    pokemon.types.some((type) => type.type.name === selectType)
  );
};

// Devuelve una lista de pokemon ordenados ya sea alfabeticamente o por numero y además por tipo ya sea uno especifico o ninguno
export const filterAndOrderPokemonList = (
  arrayPokemon,
  selectOrder,
  selectType
) => {
  const validateType = nameTypes(selectType);

  switch (selectOrder) {
    case "numberAsc": {
      const orderArray = [...arrayPokemon].sort((a, b) => a.id - b.id);
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    case "numberDesc": {
      const orderArray = [...arrayPokemon].sort((a, b) => b.id - a.id);
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    case "nameAsc": {
      const orderArray = arrayPokemon.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    case "nameDesc": {
      const orderArray = arrayPokemon.sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
      );
      const array =
        validateType !== "undefined"
          ? orderTypePokemon(orderArray, selectType)
          : orderArray;
      return array;
    }
    default:
      return arrayPokemon;
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
  selectType,
  searchPokemon
) => {
  const validateSearch = validateSearchPokemon(searchPokemon);

  if (validateSearch == "null") {
    return filterAndOrderPokemonList(
      [...arrayPokemon],
      selectOrder,
      selectType
    );
  }

  if (validateSearch == "number") {
    const foundPokemon = [...arrayPokemon].filter((pokemon) =>
      pokemon.id.includes(searchPokemon)
    );

    return filterAndOrderPokemonList(foundPokemon, selectOrder, selectType);
  }

  if (validateSearch == "nombre") {
    const foundPokemon = [...arrayPokemon].filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );

    return filterAndOrderPokemonList(foundPokemon, selectOrder, selectType);
  }

  if (validateSearch == "error") {
    return [];
  }
};
