import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/6347738/pexels-photo-6347738.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Welcome to WaltergateFund',
    description: 'You will make a difference here. Make the world better, bolder, brighter. Every donation you give will bring a real change and a new era.',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/7156185/pexels-photo-7156185.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Support Those in Need',
    description: 'Your contribution can change lives. Help us bring hope and resources to communities around the world.',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/6646847/pexels-photo-6646847.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Make a Lasting Impact',
    description: 'Join our global community of changemakers working to create a better future for everyone.',
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Auto-slide effect
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_INTERVAL);

    // Cleanup on unmount or when currentSlide changes
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">{slide.description}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login" className="btn btn-primary">
                  JOIN WITH US
                </Link>
                <Link to="/public-campaigns" className="btn btn-secondary">
                  EXPLORE CAMPAIGN
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => {
          nextSlide();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default HeroSection;