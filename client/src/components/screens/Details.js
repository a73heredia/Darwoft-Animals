import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogById, addToCart, rmDetail } from '../../actions/index';
import { Link } from 'react-router-dom';
import imag from '../../images/huella.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import './Details.css';
const Details = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(rmDetail());
        dispatch(getDogById(props.match.params.id))
    }, [dispatch])


    const dog = useSelector((state) => state.detail);
    const dogLen = useSelector((state) => state.cart)
    const ddC = JSON.parse(localStorage.getItem('cart'));
    var quant = 0;
    ddC.forEach(el => quant = quant + el.amount)
    console.log(ddC, 'local cart')
    const addCart = (dog) => {
        console.log(dog)
        dispatch(addToCart(dog, 1))
    }

    return (
        <div className='contain'>
            {
                dog.length > 0 ?
                    <div>
                        <div className='navbar'>
                            <Link to='/home'>
                                <div className="title">
                                    <img src={imag} alt='img' className='image' />
                                    <h3>The Dogs Store</h3>

                                </div>
                            </Link>
                            <Link className='nav-items' to='/cart'>
                                <div className='cart-dog' ><FontAwesomeIcon icon={faDog} className='btn-log' />{ddC.length > 0 ? <div className='cart-quant'><h5>{quant}</h5></div> : <h5></h5>} </div>
                            </Link>
                        </div>
                        <div className='cont1'>
                            <img className={'card-img'} src={dog[0].image} />
                        </div>
                        <div className={'containerCard'}>
                            <div className={'card-details'}>
                                <h1>{dog[0].name}</h1>
                                <h2>Weight: {dog[0].weight}</h2>
                                <h2>Price: {dog[0].height}</h2>
                                <h2>Life span: {dog[0].life_span}</h2>
                                <h4>Temperaments: {dog[0].temperament}</h4>
                                <Link to='/home'>
                                    <button className={'butn'}>Go Back</button>
                                </Link>

                                {/* <Link to='/cart'> */}
                                <button onClick={(e) => addCart(dog)} className='butn'>Purchase</button>
                                {/* </Link> */}

                            </div>
                        </div>

                    </div> : <p>Loading...</p>
            }

        </div>
    )
}

export default Details