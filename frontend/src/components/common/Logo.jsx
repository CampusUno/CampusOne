import React from "react";

const Logo = ({ className }) => {
  return (
    <div className={`font-semibold ${className || ""}`}>
      Campus<span className="text-primary">One</span>
    </div>
  );
};

export default Logo;
