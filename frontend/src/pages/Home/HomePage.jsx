import React from "react";
import Logo from "../../components/common/Logo";
import Navbar from "../../components/common/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Logo />
      HomePage
      <button className="btn btn-primary">Sign up</button>
    </div>
  );
};

export default HomePage;
