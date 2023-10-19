import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// components
import { Pokemon } from './components/Pokemon'
import Loading from './components/Loading'
import Error from './components/Error.jsx'
import Header from './components/Header'
import PokemonInfo from './components/PokemonInfo'
// hooks
import usePokemonList from './hooks/usePokemonList'
import usePokemonFilter from './hooks/usePokemonFilter'

function App() {
  const [filter, setFilter] = useState({
    search: '',
    selectOrder: 'numberAsc',
    selectGeneration: '',
    selectType: '',
  })

  const { pokemonList, loading } = usePokemonList()

  const { getPokemon } = usePokemonFilter({
    pokemonList: pokemonList,
    searchPokemon: filter.search,
    selectOrder: filter.selectOrder,
    selectGeneration: filter.selectGeneration,
    selectType: filter.selectType
  })

  const pokemon = getPokemon();

  return (
    <>
      <Header filter={filter} setFilter={setFilter} />
      <Routes>
        <Route path="/" element={loading ? <Loading /> : (
          <>
            {pokemon.length > 0 ? (
              <Pokemon pokemon={pokemon} />
            ) : (
              <Error>
                No se encontraron resultados
              </Error>
            )}
          </>
        )} />
        <Route path='/pokedex/:name' element={<PokemonInfo />} />
        <Route path='*' element={<Error>No se encontró la página</Error>} />
      </Routes>
    </>
  )
}

export default App
