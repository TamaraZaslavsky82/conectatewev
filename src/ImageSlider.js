import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Import CSS styles
import 'slick-carousel/slick/slick-theme.css'; // Import theme CSS

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    'https://i0.wp.com/leerdelviaje.com/wp-content/uploads/2019/10/20191005_174218.jpg?w=2197&ssl=1',
    'https://i0.wp.com/leerdelviaje.com/wp-content/uploads/2019/10/20191005_104622.jpg?w=2197&ssl=1',
    'https://i0.wp.com/leerdelviaje.com/wp-content/uploads/2019/10/20191004_143947.jpg?w=2197&ssl=1',
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '25%', position: 'relative' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;