import {searchMovies} from '../services/movies.js'
import { useState,useRef, useMemo,useCallback } from 'react'


export function useMovies({search, sort}) {
    const[movies, setMovies] = useState([])
    const previusSearch = useRef(search)

    const getMovies = useCallback(async () => {
        if(search === previusSearch.current) return
    
        try {
            previusSearch.current = search
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        } catch (error) {
            throw new Error('No se pudieron obtener las peliculas')
        }
    }, [search]) // Agrega search a las dependencias
        
    const sortedMovies = useMemo(() => {
       if (!movies) return
       return sort
       ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
         : movies
    }, [movies, sort])
    return {movies: sortedMovies, getMovies}
}   
   /* const sortMovies = sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
    console.log('render', sortMovies);
    return {movies: sortMovies, getMovies}*/
 
    
    
