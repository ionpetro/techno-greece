import React from "react";
import DjRegistrationForm from "../components/djinvite/djregistrationform/DjRegistrationForm";
import Footer from "../components/footer/Footer";

const DjRegisterPage = () => {
  return (
    <>
      <div className="wrapper">
        <h2 className={"heading"}>Dj register</h2>
        <DjRegistrationForm />
      </div>
      <Footer />
    </>
  );
};

export default DjRegisterPage;
