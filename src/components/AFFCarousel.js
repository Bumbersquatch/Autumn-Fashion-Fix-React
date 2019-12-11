import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../images/slide-3.jpg';
import slide2 from '../images/slide-2.jpg';
import slide3 from '../images/slide-4.jpg';
import Countdown from './Countdown';

const AFFCarousel = () => {
    return(
    <section id="affCarousel" className="carousel slide mb-5" data-ride="carousel">
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={slide1}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={slide2}
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={slide3}
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>

        <section className="container text-center carousel-text">
            <div className="event-brand">
                <h1 className="display-3">Autumn<br />Fashion<br />Fix</h1>
            </div>
            <div className="event-date">
                <p>23-26 September 2020</p>
            </div>
            <div className="event-info row">
                <div className="col-12 text-center">
                    <div className="countdown countdown-container container">
                        <Countdown 
		                    timeTillDate="2020-09-23T00:00:00Z"
	                    />
                    </div>
                </div>
            </div>
        </section>
    </section>
    )
}

export default AFFCarousel;