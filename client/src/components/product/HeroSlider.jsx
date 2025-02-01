import React from 'react';
import { Link } from 'react-router-dom';
import ProductStore from '../../store/productStore';
import SliderSkeleton from './../../skeleton/SliderSkeleton';


const HeroSlider = () => {
    const {SliderList} = ProductStore();
    console.log(SliderList);
    
    if(SliderList === null) {
        return <SliderSkeleton/>
    }
    

    return (
        < >
            <div>
                <div id="carouselExampleDark" className="carousel hero-bg carousel-dark slide">
                    <div className="carousel-indicators">
                        <button key="" type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="" className="active"
                        aria-current="true" aria-label=""></button>
                    </div>
                    <div className="carousel-inner py-5">
                        <div key="" className={""} data-bs-interval="10000">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                        <h1 className="headline-1">Macbook Air 2023</h1>
                                        <p>New edition of Macbook Air in new year sale</p>
                                        <Link to="" className="btn text-white btn-success px-5">Buy Now</Link>
                                    </div>
                                    <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                        <img src="" className="w-100" alt="..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev btn rounded-5" type="button" data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    {/* Products Component */}
                    <button className="carousel-control-next btn" type="button" data-bs-target="#carouselExampleDark" data-bsslide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default HeroSlider;