'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    image: '/images/carousel/slide1.jpg',
    title: 'Quality Mobile Parts',
    description: 'Get genuine mobile parts for all major brands',
    buttonText: 'Shop Now',
    buttonLink: '/products'
  },
  {
    image: '/images/carousel/slide2.jpg',
    title: 'Expert Service',
    description: 'Connect with certified repair professionals',
    buttonText: 'Find Experts',
    buttonLink: '/experts'
  },
  {
    image: '/images/carousel/slide3.jpg',
    title: 'Best Prices',
    description: 'Competitive prices for all mobile parts',
    buttonText: 'View Deals',
    buttonLink: '/deals'
  }
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div 
      className="relative h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center w-full max-w-4xl px-4">
                <h2 className="text-5xl font-bold text-white mb-6 transform transition-all duration-700 delay-100 translate-y-0 opacity-100">
                  {slide.title}
                </h2>
                <p className="text-xl text-white mb-8 transform transition-all duration-700 delay-200 translate-y-0 opacity-100">
                  {slide.description}
                </p>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-300"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-300"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center items-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 