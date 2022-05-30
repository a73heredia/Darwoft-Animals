import React from 'react'
import { Link } from 'react-router-dom'
import "./Landing.css";
import imag from '../../images/huella.png';
import images from '../../images/images';
import Slider from './Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
    return (
        <div className='landing'>
            <div className='navbar'>
                <Link to='home'>
                    <img src={imag} alt='img' className='image' />
                </Link>
                <div >
                    <Link className='nav-items' to='/register'><button ><FontAwesomeIcon icon={faUser} className='btn-log' /> </button></Link>
                    <Link className='nav-items' to='/login'>Sign</Link>
                </div>
            </div>
            <div className='slider'>
                <Slider images={images} />
            </div>

        </div>
    )
}

export default Landing