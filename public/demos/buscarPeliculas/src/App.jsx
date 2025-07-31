import './App.css'
import {useMovies} from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it';

function useSearch (){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if (search.length < 3) {
      setError('Debes ingresar al menos 3 caracteres')
      return
    }
    if(search === ''){
      setError('Debes ingresar un texto')
      return
    }
    if(search.match(/^[0-9]+$/)){
      setError('Debes ingresar un texto')
      return
    }
    setError(null)
  }, [search])
  return {search, updateSearch, error}
}

function App() {
  const {search, updateSearch, error} = useSearch()
  const [sort, setSort] = useState(false) // Mueve esta línea aquí
  const {movies, getMovies} = useMovies({search, sort})

  
  
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies()
  }
  
  const debouncedGetMovies = useCallback(
    debounce(() => {
      console.log('search', search);
      getMovies({search})
    }, 300)
    ,[getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleSort = () => {
    try {
      setSort(!sort)
    } catch (error) {
      console.error(error)
    }
  }
  return ( 
    <div className='page'> 
      <header>
        <h1>Buscador de Peliculas</h1>
        <h2>Prueba técnica</h2>
        <form onSubmit={handleSubmit}>
          <input name='query' value={search} onChange={handleChange} type="text" placeholder="Avengers, Star wars, The matrix..." />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type="submit">Buscar</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
      </header>
      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App 