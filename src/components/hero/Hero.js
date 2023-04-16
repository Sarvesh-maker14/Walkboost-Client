import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.scss";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="Hero">
      <div className="hero-content center">
        <h2 className="heading">Exclusive Collection</h2>
        <p className="subheading">Exclusive Sneakers , for Exclusive Persons</p>
        <button
          onClick={() => navigate("/category")}
          className="cta btn-primary"
        >
          Explore more
        </button>
      </div>
    </div>
  );
};

export default Hero;
