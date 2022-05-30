import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../actions';
import imag from '../../images/huella.png';
import { Link, useHistory } from 'react-router-dom';
import Card from './Card';
import Paginated from './Paginated';
import SearchBar from './SearchBar';
import './Data.css'
const Data = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const history = useHistory();
    const userName = localStorage.getItem('user');
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(20)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const length = allDogs.length;
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        history.push('/')
    }

    useEffect(() => {
        dispatch(getDogs());
        console.log(length)
    }, []);

    const back = () => {
        dispatch(getDogs());
    }

    return (
        <div className='container'>

            <div className='navbar'>
                <Link to='/'>
                    <div className="title">
                        <img src={imag} alt='img' className='image' />
                        <h3>The Dogs Store</h3>

                    </div>
                </Link>
                <div className="its">
                    <div className='search'>
                        <SearchBar />
                    </div>
                    <button className='btn-log' onClick={logoutHandler}>logout</button>
                    {/* {userName} */}

                </div>
            </div>
            <button onClick={back} className={length === 172 || length === 0 ? 'btn-hide' : 'btn-shw'}>Back</button>
            <div className={length === 1 ? 'grid-one' : 'grid-layout'}>
                {currentDogs.map((el) => {
                    return (
                        <div >

                            <Link to={'/detail/' + el.id} key={el.id}>
                                <Card
                                    className='item'
                                    key={el.id}
                                    name={el.name}
                                    image={el.image}
                                    id={el.id}
                                    weight={el.weight}
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className='paginat'>
                <Paginated
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paged={paged}
                />
            </div>
        </div>
    )
}

export default Data