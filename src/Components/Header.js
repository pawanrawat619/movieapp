import React from 'react'

const Header = (props) => {
    return (
        <div className='Header'>
            <h1>Movies</h1>
            <input type='text'
                placeholder='Search movies'
                value={props.value}
                onChange={(event) => { props.onSearchTextChange(event.target.value) }}
            >
            </input>
        </div>
    )
}

export default Header