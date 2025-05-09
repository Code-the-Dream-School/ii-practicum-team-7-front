import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import testimage1 from "../../images/testimonial1.jpg";
import testimage2 from "../../images/testimonial2.jpg";
import testimage3 from "../../images/testimonial3.jpeg";
import testimage4 from "../../images/testimonial4.jpg";

const TestimonialSection = () => {
  const appName = "CNC"
  const [currIndex, setCurrIndex] = useState(0);

  const testimonialData = [
    {
      title: "An Absolute Game-Changer for My Career!",
      body: `${appName} helped me land my dream job! The platform is easy to use, with great filters and personalized recommendations that made finding the right role simple. I got multiple interviews within weeks and found the perfect fit. Highly recommend it if you're serious about your career!`,
      imageURL: testimage1,
      name: "Jessica Martinez",
      jobTitle: "Marketing Coordinator"
    },
    {
      title: "We found the perfect fit in no time!",
      body: `As a local employer, ${appName} has completely streamlined our hiring process. We were able to connect with talented, motivated local candidates almost immediately. Within days, we hired someone who’s been an incredible addition to our team. For any employer looking to find the right people fast, I can’t recommend ${appName} enough.`,
      imageURL: testimage2,
      name: "Tanya Brooks",
      jobTitle: "Facility Manager"
    },
    {
      title: "Found the Right Fit Fast!",
      body: `${appName} made my job search simple and stress-free. The platform matched me with roles that truly fit my experience and goals. Within a couple of weeks, I landed a position that I’m proud of. I’m grateful for how easy and effective the process was.`,
      imageURL: testimage3,
      name: "Brian Callahan",
      jobTitle: "Medical Records Coordinator"
    },
    {
      title: "A Reliable Source for Quality Hires",
      body: `As an employer, I’ve used many platforms over the years, but ${appName} stands out. It consistently brings in well-qualified candidates who are ready to work. We recently filled two key roles faster than expected, and both hires have exceeded our expectations. It’s now our go-to for recruiting.`,
      imageURL: testimage4,
      name: "Kenji Watanabe",
      jobTitle: "Director of Human Resources"
    }
  ]

  const changeSlideLeft = () => {
    //check if it's first slide
    const isFirstSlide = currIndex === 0;
    //if so, go back to the last slide
      //if not, go to previous slide
    const nextSlide = isFirstSlide ? testimonialData.length - 1 : currIndex - 1;
    setCurrIndex(nextSlide);
  };

  const changeSlideRight = () => {
    //check if it's the last slide
    const isLastSlide = currIndex === testimonialData.length - 1;
    //if so, go back to the first slide
      //if not go to next slide
    const nextSlide = isLastSlide ? 0 : currIndex + 1;
    setCurrIndex(nextSlide);
  };

  const changeSlide = (e) => {
    const clickedDotNum = e.target.getAttribute('data-key');
    setCurrIndex(Number(clickedDotNum));
  };

  return (
    <div className="relative max-w-screen-md mx-auto overflow-hidden px-4 py-10">
      
      {/* Left Arrow */}
      <div 
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-10 pt-8 px-4"
        onClick={changeSlideLeft}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
                  bg-monte-carlo-light rounded-full cursor-pointer select-none 
                  hover:bg-monte-carlo transition">
          {<FontAwesomeIcon icon={faArrowLeft} />}
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="overflow-hidden w-full">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currIndex * (100 / testimonialData.length)}%)`,
            width: `${testimonialData.length *100}%`
          }}
        >
          {testimonialData.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center text-center px-4 sm:px-8"
              >
              <h4 className="mb-4">{testimonial.title}</h4>
              <p className="mb-6 text-sm sm:text-base">{testimonial.body}</p>
              <div className="text-sm flex flex-col items-center gap-2">
                <img 
                  src={testimonial.imageURL}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <p>{testimonial.name}</p>
                  <p>{testimonial.jobTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-10 pt-8 px-4"
        onClick={changeSlideRight}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center
                  bg-monte-carlo-light rounded-full cursor-pointer select-none 
                  hover:bg-monte-carlo transition">
          {<FontAwesomeIcon icon={faArrowRight} />}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 text-2xl cursor-pointer">
        {testimonialData.map((test, index) => 
          <div
            key={index}
            data-key={index}
            onClick={changeSlide}
            className={`hover:scale-150 transition-transform duration-200 ${currIndex === index ? "text-monte-carlo-dark" : ""}`}
          >
            {"•"}
          </div>
        )}
      </div>

    </div>
  );
};

export default TestimonialSection;
