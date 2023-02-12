import React from "react";
import Challenge from "../../components/challenge/Challenge";
import Footer from "../../components/footer/Footer";

const ChallengePage = () => {
  return (
    <div className={"content"}>
      <h2 className={"challengeHeading"}>Challenge</h2>
      <div className="wrapper">
        <Challenge />
      </div>
      <Footer />
    </div>
  );
};

export default ChallengePage;
