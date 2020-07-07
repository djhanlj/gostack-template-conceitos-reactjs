import React from 'react';

function Lista ({ id, handleAddRepository, children }){

    const handleClick = () => {
        handleAddRepository(id)
    }

    return (
        <li>
            { children }
            <button onClick={() => handleClick()}>
                Remover
          </button>
        </li>
    )
}

export default Lista;