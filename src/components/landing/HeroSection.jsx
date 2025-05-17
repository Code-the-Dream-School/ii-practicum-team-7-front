import image from "../../images/landing1.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="section-container bg-ny-pink pt-[200px]">
      <div className="section-content">
        <h1 className="text-white">Your next job is just around the corner</h1>
        <p className="text-white">Offer your skills or hire helping hands, right here in your neighborhood</p>
        <div className="flex gap-2">
          <Link to="/login">
            <button className="btn-grn">Sign in</button>
          </Link>
          <Link to={"/register"}>
            <button className="btn-pnk">Sign up</button>
          </Link>
        </div>        
        </div>
        <div className="max-h-[40rem] overflow-hidden">
        <img className="max-w-lg mx-auto object-cover" src={image} alt="computer"/>
      </div>
    </div>
  );
};

export default HeroSection;
