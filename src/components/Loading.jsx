import '../css/loading.css'
import pokeballImage from '../assets/pokeball.png'

function Loading() {
  return (
    <div className="loading-container">
      <div className="pokeball-wrapper">
        <img src={pokeballImage} alt="pokeball" className="pokeball" />
      </div>
    </div >
  );
}

export default Loading;
