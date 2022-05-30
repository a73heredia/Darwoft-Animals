import React, { useRef } from "react"
import useSlider from "../hooks/useSlider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Slider.css'

const Slider = ({ images }) => {
    const slideImage = useRef(null)
    const slideText = useRef(null)
    const { goToPreviousSlide, goToNextSlide } = useSlider(
        slideImage,
        slideText,
        images
    )

    return (
        <div className="slider" ref={slideImage}>
            <div className="slider--content">
                <button onClick={goToPreviousSlide} className="slider-left">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <div className="slider--feature">
                    <h1 className="feature--title">Dreaming</h1>
                    <p ref={slideText} className="feature--text"></p>
                    <button className="feature__btn">Get started</button>
                </div>
                <button onClick={goToNextSlide} className="slider-right">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>


            <button onClick={goToNextSlide} className="slider-right">
                <i className="fas fa-angle-right"></i>
            </button>

        </div>
    )
}

export default Slider