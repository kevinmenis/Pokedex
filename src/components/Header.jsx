import { Link } from 'react-router-dom'
import imgSearch from '../assets/search.png'
import "../css/header.css";

function Header({ filter, setFilter }) {

  const hanldeChangeSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value
    })
  }

  const handleChangeOrder = (event) => {
    setFilter({
      ...filter,
      selectOrder: event.target.value
    })
  }

  const handleChangeGeneration = (event) => {
    setFilter({
      ...filter,
      selectGeneration: event.target.value
    })
  }

  const handleChangeType = (event) => {
    setFilter({
      ...filter,
      selectType: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <header className="navbar">
      <Link
        style={{ textDecoration: 'none', color: 'white' }}
        to={'/'}
      >
        <h1>Pokédex</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <select id='filter.selectOrder' onChange={handleChangeOrder} value={filter.selectOrder}>
          <option value="numberAsc">Número inferior</option>
          <option value="numberDesc">Número superior</option>
          <option value="nameAsc">A-Z</option>
          <option value="nameDesc">Z-A</option>
        </select>
        <select id="filter.selectGeneration" onChange={handleChangeGeneration} value={filter.selectGeneration}>
          <option value="" disabled>Generación</option>
          <option value="allGeneration">Todas las generaciones</option>
          <option value="generation1">Generación 1</option>
          <option value="generation2">Generación 2</option>
          <option value="generation3">Generación 3</option>
          <option value="generation4">Generación 4</option>
          <option value="generation5">Generación 5</option>
          <option value="generation6">Generación 6</option>
          <option value="generation7">Generación 7</option>
          <option value="generation8">Generación 8</option>
          <option value="generation9">Generación 9</option>
        </select>
        <select id='selectType' onChange={handleChangeType} value={filter.selectType}>
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
  )
}

export default Header