// import React from 'react';
// import style from './Paginated.css'

// export default function Paginated({ dogsPerPage, allDogs, paginado }) {

//     const pageNumber = []

//     for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
//         pageNumber.push(i)
//     }

//     return (
//         <nav>
//             <ul>
//                 {pageNumber?.map(num => {
//                     return (
//                         <button className={style.btn} key={num} onClick={() => paginado(num)}>{num}</button>
//                     )

//                 })}
//             </ul>
//         </nav>
//     )
// }
import React from "react";
import './Paginated.css'

export default function Paginado({ dogsPerPage, allDogs, paged }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    const listStyle = {
        listStyle: 'none',
        display: 'inline'
    }

    return (
        <nav>
            <ul className="paged">
                {pageNumbers &&
                    pageNumbers.map((number) => {
                        return <li style={listStyle} className="number" key={number}>
                            <button className="btnPg" onClick={() => paged(number)}>{number}</button>
                        </li>
                    }
                    )}
            </ul>
        </nav>
    )
}