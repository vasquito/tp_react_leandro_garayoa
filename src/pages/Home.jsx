import React from "react";
import { Fragment } from "react";
import SliderHome from "../components/Slider";
import Carrousel from "../components/Carrousel";

const Home=()=> {
    
    return (
        <Fragment>
            <Carrousel />
            <SliderHome />
        </Fragment>
    );
};

export default Home;