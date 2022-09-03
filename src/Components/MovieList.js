import React from 'react'

const MovieList = (props) => {
    const myMovies = props.movies.filter((filteredmovies) => {
        return filteredmovies.Poster !== "N/A"
    }).map((TheMovie) => {
        return (
            <div className='MovieCard'>
                <img src={TheMovie.Poster}
                    className='poster'
                ></img>
                <button onClick={() => { props.onButtonClick(TheMovie) }}  >{props.buttonText}</button>
            </div>
        )
    })

    return (
        <>
            {myMovies}
        </>
    )
}

export default MovieList