import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fillCart, addOneToCart, rmOneToCart, removeAll } from '../../actions/index'
import imag from '../../images/huella.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';
import ItemCart from './ItemCart';

const Cart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const dogLen = useSelector((state) => state.cart)
    var quant = 0;
    dogLen.forEach(el => quant = quant + el.amount)
    let dogLs;
    useEffect(() => {

        dogLs = JSON.parse(localStorage.getItem('cart'));
        if (cartState && !cartState[0]) {
            dispatch(fillCart(dogLs));
            console.log(dogLs)
        }
        /* if (cartState.length === 1 && cartState[0].amount < 1) {
            localStorage.setItem("cart", JSON.stringify([]))
        } */

        else {
            localStorage.setItem('cart', JSON.stringify(cartState))
        }

    })

    console.log(cartState[0]);

    const aum = (id) => {
        dispatch(addOneToCart(id));

    }

    const rm = (id) => {
        dispatch(rmOneToCart(id));

        if (cartState.length === 1 && cartState[0].amount < 1) {
            localStorage.setItem("cart", JSON.stringify([]))
        }
    }

    const confirm = () => {
        dispatch()
    }

    return (
        <div>
            <div className='navbar'>
                <Link to='/home'>
                    <div className="title">
                        <img src={imag} alt='img' className='image' />
                        <h3>The Dogs Store</h3>

                    </div>
                </Link>
                <Link className='nav-items' to='/cart'>
                    <div className='cart-dog' ><FontAwesomeIcon icon={faDog} className='btn-log' />{dogLen.length > 0 ? <div className='cart-quant'><h5>{quant}</h5></div> : <h5></h5>} </div>
                </Link>
            </div>
            {
                cartState && !cartState[0] ? (
                    <h2>Your cart is empty</h2>
                ) :

                    cartState && cartState.map((el, index) =>
                    (

                        <ItemCart name={el.name} image={el.img} id={el.id} amount={el.amount} key={index} del addOneToCart={aum} rmOneToCart={rm} />
                    ))

            }
            <button onClick={() => confirm}>Adopt</button>
        </div>
    )
}

export default Cart