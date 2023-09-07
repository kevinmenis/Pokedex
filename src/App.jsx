import { useState } from 'react'
import { Pokemon } from './components/Pokemon'
import Loading from './components/Loading'
import ErrorSearch from './components/ErrorSearch.jsx'
import usePokemon from './hooks/usePokemon'
import imgSearch from './assets/search.png'

function App() {
  const [searchPokemon, setSearchPokemon] = useState('')
  const [selectOrder, setSelectOrder] = useState('numberAsc')
  const [selectType, setSelectType] = useState('')
  const { pokemon, loading } = usePokemon({ searchPokemon, selectOrder, selectType })

  const hanldeChangeSearch = (event) => {
    setSearchPokemon(event.target.value)
  }

  const handleChangeOrder = (event) => {
    setSelectOrder(event.target.value)
  }

  const handleChangeType = (event) => {
    setSelectType(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <header className="navbar">
        <h1>Pokédex</h1>
        <form onSubmit={handleSubmit}>
          <select id='selectOrder' onChange={handleChangeOrder} value={selectOrder}>
            <option value="numberAsc">Número inferior</option>
            <option value="numberDesc">Número superior</option>
            <option value="nameAsc">A-Z</option>
            <option value="nameDesc">Z-A</option>
          </select>
          <select id='selectType' onChange={handleChangeType} value={selectType}>
            <option value="" disabled>Tipos</option>
            <option value="allTypes">Todos</option>
            <option value="water">Agua</option>
            <option value="fire">Fuego</option>
            <option value="grass">Planta</option>
            <option value="bug">Bicho</option>
            <option value="normal">Normal</option>
            <option value="ground">Tierra</option>
            <option value="steel">Acero</option>
            <option value="electric">Electrico</option>
            <option value="ghost">Fantasma</option>
            <option value="psychic">Psíquico</option>
            <option value="dark">Siniestro</option>
            <option value="fighting">Lucha</option>
            <option value="dragon">Dragón</option>
            <option value="fairy">Hada</option>
            <option value="flying">Volador</option>
            <option value="poison">Veneno</option>
            <option value="rock">Roca</option>
            <option value="ice">Hielo</option>
          </select>
          <input id='searchPokemon' type="text" onChange={hanldeChangeSearch} placeholder="Pikachu, 25" />
          <img className='search-icon' src={imgSearch} alt="search icon" />
        </form>
      </header>

      <main>
        {loading ? (
          <Loading />
        ) : (
          <>
            {pokemon.length > 0 ? (
              <Pokemon pokemon={pokemon} />
            ) : (
              <ErrorSearch />
            )}
          </>
        )}
      </main>

    </>
  )
}

export default App
