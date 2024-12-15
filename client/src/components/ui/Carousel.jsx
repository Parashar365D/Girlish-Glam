import React, { useState, useEffect } from 'react';
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.webp";
import banner4 from "../../assets/banner-4.webp";
import banner5 from "../../assets/banner-5.webp";
import banner6 from "../../assets/banner-6.jpg";
import banner7 from "../../assets/banner-7.jpg";

const Carousel = () => {
  const slides = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (<div key={index} className="w-full flex-shrink-0"><img key={index} src={slide} alt={`Slide ${index}`} className="w-full h-auto object-contain"/></div>))}
      </div>
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">&lt;</button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">&gt;</button>
    </div>
  );
};

export default Carousel;