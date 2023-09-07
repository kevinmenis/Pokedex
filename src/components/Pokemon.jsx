import { POKE_IMG } from '../api/endpoint'
import { nameTypes, styleTypes } from '../utils/validations/Types'
import { formatedIdPokemon, formatedNamePokemon } from '../utils/Formatting'
import PropTypes from 'prop-types';
import '../css/pokemon.css'

export function PokemonCard({ name, id, types, urlImgPokemon }) {
  return (
    <div key={id} className="pokemon-card">
      <img src={urlImgPokemon} alt={name} />
      <span>N.° {id}</span>
      <h3>{name}</h3>
      {types.map((type, typeIndex) => (
        <span
          className="type-label"
          key={typeIndex}
          style={styleTypes(type.type.name)}>
          {nameTypes(type.type.name)}
        </span>
      ))}
    </div>
  );
}

export function ListOfPokemon({ pokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map((poke) => {
        const id = formatedIdPokemon(poke.id);
        const namePokemon = formatedNamePokemon(poke.name);
        const urlImgPokemon = `${POKE_IMG}${id}.png`;
        return (
          <PokemonCard
            key={poke.id}
            name={namePokemon}
            id={poke.id}
            types={poke.types}
            urlImgPokemon={urlImgPokemon}
          />
        );
      })}
    </div>
  );
}

export function Pokemon({ pokemon }) {
  return (
    <>
      <ListOfPokemon pokemon={pokemon} />
    </>
  )
}

Pokemon.propTypes = {
  pokemon: PropTypes.array.isRequired,
};

ListOfPokemon.propTypes = {
  pokemon: PropTypes.array.isRequired,
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  urlImgPokemon: PropTypes.string.isRequired,
}