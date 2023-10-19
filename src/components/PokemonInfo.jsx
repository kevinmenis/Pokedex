import { Link, useParams } from "react-router-dom";
import { POKE_IMG } from "../api/endpoint"
// images
import iconNext from '../assets/iconNext.png'
import iconPrevious from '../assets/iconPrevious.png'
// validations
import { formatedIdPokemon, formatedNamePokemon, formatedNameStat } from "../utils/Formatting";
import { nameTypes, styleTypes } from "../utils/validations/Types";
// hook
import { usePokemonInfo } from "../hooks/usePokemonInfo";
// components
import Error from "./Error";
import Loading from "./Loading";
// styes
import '../css/PokemonInfo.css'

function PokemonInfo() {
  let { name } = useParams()
  const { pokemonData, loading } = usePokemonInfo(name.toLowerCase())

  let total = 0;

  const statMaxValues = {
    hp: 120,
    attack: 120,
    defense: 120,
    'special-attack': 120,
    'special-defense': 120,
    speed: 120,
  };

  return (
    <>
      {loading ? <Loading /> : (
        <>
          {pokemonData ? (
            <div className="carousel-container">
              <Link style={{ marginLeft: '40px' }} to={`/pokedex/${pokemonData.previous.name}`} className="carousel-button prev">
                <img src={iconPrevious} alt="icon-previous" /><br />{formatedNamePokemon(pokemonData.previous.name)} {/* #{pokemonData.previous.id} */}
              </Link>

              <div className="carousel-content">
                <h2>
                  {formatedNamePokemon(pokemonData.selected.name)} #{pokemonData.selected.id}
                </h2>
                <div className="pokemon-details">
                  <div className="pokemon-image">
                    <img src={`${POKE_IMG}${formatedIdPokemon(pokemonData.selected.id)}.png`} alt={pokemonData.selected.name} />
                  </div>
                  <div className="pokemon-stats">
                    <ul>
                      {pokemonData.selected.stats.map((data, index) => {
                        const statName = data.stat.name;
                        const statValue = data.base_stat;
                        total += statValue;
                        const statMax = statMaxValues[statName];
                        const statWidth = statValue >= 120 ? 99 : (statValue / statMax) * 100;
                        return (
                          <li key={index}>
                            {formatedNameStat(statName)}
                            <div className="stat-bar">
                              <div
                                className="stat-bar-fill"
                                style={{ width: `${statWidth}%` }}
                              >
                                {statValue}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="stat-total">TOTAL {total}</p>
                  </div>
                </div>
                <div className="pokemon-details">
                  <div className="pokemon-type">
                    {pokemonData.selected.types.map((type, typeIndex) => (
                      <span
                        className="type-label"
                        key={typeIndex}
                        style={styleTypes(type.type.name)}
                      >
                        {nameTypes(type.type.name)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link style={{ marginRight: '40px' }} to={`/pokedex/${pokemonData.next.name}`} className="carousel-button next">
                <img src={iconNext} alt="icon-next" /><br />{formatedNamePokemon(pokemonData.next.name)} {/* #{pokemonData.next.id} */}
              </Link>
            </div>
          ) : (
            <Error>No página no esta disponible</Error>
          )}
        </>
      )}
    </>
  )
}

export default PokemonInfo