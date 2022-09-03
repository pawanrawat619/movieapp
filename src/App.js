import { useEffect, useState } from "react";
import Header from "./Components/Header";
import MovieList from "./Components/MovieList";
import Data from './Components/Data'
import { useReducer } from "react";








function reducer(state, action) {



    switch (action.type) {

        case "SEARCH_CHANGE":

            return { ...state, searchText: action.payload }

        case "FAV_ADD":
            return {
                ...state, favorite: [...state.favorite, action.payload]

            }

        case "ADD_MOVIES":
            return {


                ...state, movies: action.payload
            }

        case "REMOVE_FAV":

            const newFavList = state.favorite.filter(movie => {
                return movie.imdbID !== action.payload.imdbID;
            })

            return {


                ...state, favorite: newFavList
            }


    }
}

const initialState = {
    movies: Data,
    favorite: [],
    searchText: ""
}

function App() {



    const [state, dispatch] = useReducer(reducer, initialState)

    const { searchText, movies, favorite } = state;

    function onSearchTextChange(text) {



        dispatch({ type: "SEARCH_CHANGE", payload: text })
    }

    function onFavoriteAdd(newAdded) {


        dispatch({ type: "FAV_ADD", payload: newAdded })
    }

    function addMovies(movies) {



        dispatch({ type: "ADD_MOVIES", payload: movies })



    }


    function onRemove(removedMovie) {

        dispatch({ type: "REMOVE_FAV", payload: removedMovie })
    }

    async function getMovie() {
        const url = `http://www.omdbapi.com/?s=${searchText}&apikey=263d22d8 `

        const response = await fetch(url)
        const responseJson = await response.json()
        console.log(responseJson)
        if (responseJson.Search) {
            addMovies(responseJson.Search)
        }
    }

    useEffect(() => {

        if (searchText) {
            getMovie()
        }

    }, [searchText])




    return (
        <div className="App">
            < Header value={searchText} onSearchTextChange={onSearchTextChange} />
            <div className="myMovieList">
                <MovieList movies={movies} buttonText='Add to fav' onButtonClick={onFavoriteAdd} />
            </div >
            <h1>Favorites</h1>

            <div className="myMovieList">
                <MovieList movies={favorite} buttonText='Remove' onButtonClick={onRemove} />
            </div >
        </div>
    );
}

export default App;