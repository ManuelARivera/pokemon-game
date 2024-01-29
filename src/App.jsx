import { useEffect, useState } from 'react'
import './App.css'

let font_default = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png"

function App() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    getPokemons()
  }, [])

  async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=251&offset=0");
    const {results}  = await response.json();
    setPokemon(results.map(r => {
      const id = r.url.split('/').at(-2)

      return {
        ...r,
        id,
        imgUrl: font_default.replace('{id}', id)
      }
    }))
  }

  console.log(pokemon)

  return (
    <div>
      {
        pokemon.map(
          p =>
            <li
              key={p.id}>
              <span>{p.name} - {p.id}</span>
              <img src={p.imgUrl} />
            </li>
        )
      }
    </div>
  )
}

export default App
