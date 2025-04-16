import React from 'react';
import { useState } from 'react';
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
  }

  const changeSlideRight = () => {
    //check if it's the last slide
    const isLastSlide = currIndex === testimonialData.length - 1;
    
    //if so, go back to the first slide
      //if not go to next slide
    const nextSlide = isLastSlide ? 0 : currIndex + 1;

    setCurrIndex(nextSlide);
  }

  const leftArrowStyle = {
    position: "absolute", 
    top: "45%", 
    left: "100px", 
    fontSize: "50px",
    cursor: "pointer"
  }

  const rightArrowStyle = {
    position: "absolute", 
    top: "45%", 
    right: "100px", 
    fontSize: "50px",
    cursor: "pointer"
  }

  const slideContainerStyle = {
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${currIndex * 800}px)`,
    width: `${testimonialData.length * 800}px`,
  }

  const slideStyle = {
    width: "100%", 
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
  }

  const dotStyle = {
    position: "absolute",
    top: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontSize: "40px",
    cursor: "pointer",
  }

  const changeSlide = (e) => {
    const clickedDotNum = e.target.getAttribute('data-key');
    setCurrIndex(Number(clickedDotNum));
  }

  const increaseSize = (e) => {
    e.target.style.transform = "scale(1.5)";
  }

  const reduceSize = (e) => {
    e.target.style.transform = "scale(1)";
  }

  return (
    <div style={{position: "relative"}} className="each-section" id="testimonial-section">
      <div style={leftArrowStyle} onClick={changeSlideLeft}> {"<"} </div>

      <div style={{ overflow: "hidden", width: "100%" }}>
        <div style={slideContainerStyle}>
          {testimonialData.map((testimonial, index) => (
            <div key={index} style={slideStyle}>
              <h3>{testimonial.title}</h3>
              <p>{testimonial.body}</p>
              <div className="test-image">
                <img src={testimonial.imageURL} />
                <div>
                  <p>{testimonial.name}</p>
                  <p>{testimonial.jobTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={rightArrowStyle} onClick={changeSlideRight}> {">"} </div>

      <div style={dotStyle}>
        {testimonialData.map((test, index) => 
          <div key={index} data-key={index} onClick={changeSlide} onMouseOver={increaseSize} onMouseOut={reduceSize} >{"•"}</div>
          )}
      </div>

    </div>
  )
}

export default TestimonialSection;
