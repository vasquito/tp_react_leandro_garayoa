import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const logos = [
  "/img/companies/marvel.gif",
  "/img/companies/dc_logo.jpg",
  "/img/companies/starwars.jpg",
  "/img/companies/marvel.gif",
  "/img/companies/dc_logo.jpg",
  "/img/companies/starwars.jpg",
  "/img/companies/marvel.gif",
  "/img/companies/dc_logo.jpg",
  "/img/companies/starwars.jpg",
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

function Carrousel() {
  return (
    <div style={{ background: "#fff", padding: "1rem 0" }}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={10000}
        arrows={false}
        showDots={false}
        draggable
        swipeable
        containerClass="carousel-container"
        itemClass="d-flex justify-content-center align-items-center"
      >
        {logos.map((src, idx) => (
          <div key={idx} style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={src}
              alt={`Logo marca ${idx + 1}`}
              style={{
                maxHeight: 40,
                maxWidth: "90%",
                objectFit: "contain",
                /*filter: "grayscale(1)",*/
                opacity: 0.8,
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrousel;