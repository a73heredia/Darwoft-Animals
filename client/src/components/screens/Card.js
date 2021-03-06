import React from 'react'
import './Card.css'

function Card({ name, image, id, weight }) {
    console.log(weight)
    return (
        <div className='card'>
            <h4>{name}</h4>
            <img className='img' src={image} alt={'image' + id} width='200px' height='200px' />
            {/* <h5>{diets.map(el => el.name + '\n')} </h5> */}
            <h5 className='h5'>Weight: {weight} kg</h5>
        </div>
    )
}

export default Card