import React, { useEffect, useState } from 'react'
import './ItemCart.css'

const ItemCart = ({ name, image, id, amount, addOneToCart, rmOneToCart }) => {
    const [amountState, setAmountState] = useState(0);
    useEffect(() => {
        setAmountState(amount);
    }, [amount])
    console.log(image)
    return (
        <div className='cont-cart'>
            <div className='cont-item'>
                <h2>{name}</h2>
                <img className='image-cart' src={image} alt={image} />
            </div>

            <div>
                <h3>Cantidad: {amountState}</h3>
                <button onClick={(e) => addOneToCart(id)} className='bot'>Agregar</button>
                <button onClick={(e) => rmOneToCart(id)} className='bot'>Quitar</button>
            </div>
        </div>
    )
}

export default ItemCart