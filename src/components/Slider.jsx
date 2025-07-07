import React, { useState, useEffect } from 'react';
import { useContext} from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SlideCard"
import "./SlideCard.css";
import { ProductsContext } from "../context/products/ProductsContext";

const SliderHome = () => {
  const settings = {
    nav:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  
  const {news, isLoading, error} = useContext(ProductsContext);
  
  if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
  if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de novedades: {error}</p>;
  
  return (
      <section className='homeSlide'>
        <Container>
          <h1 id="title" className="title">Novedades</h1>
          <Slider {...settings}>
            {
              news.map((value, index) => {
                return (
                  <SlideCard key={index} 
                    id_book={value.id_book} 
                    title={value.title}
                    cover={value.cover} 
                    store_date={value.store_date} />
                )
              })
            }
        </Slider>
        </Container>
      </section>
  )
}
export default SliderHome

