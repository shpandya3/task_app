import React, { useState } from "react";
import ImageSlider from "../components/Home/ImageSlider";
import LoginForm from "../components/Home/LoginForm";
import SignUpForm from "../components/Home/SignUpForm";


const Home = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid p-6 grid-nogutter">
      <div className="col-12 lg:col-4 overflow-auto">
        {checked ? (
          <LoginForm checked={checked} setChecked={setChecked} />
        ) : (
          <SignUpForm checked={checked} setChecked={setChecked} />
        )}
      </div>
      <div className="col-12 lg:col-8 pt-5 lg:pt-0">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Home;
