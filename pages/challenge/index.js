import React from "react";
import Challenge from "../../components/challenge/Challenge";
import Footer from "../../components/footer/Footer";

const ChallengePage = () => {
  return (
    <>
      <div className="wrapper">
        <h2 className={"heading"}>Challenge</h2>
        <Challenge />
      </div>
      <Footer />
    </>
  );
};

export default ChallengePage;
