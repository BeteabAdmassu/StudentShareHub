import React from "react";
import LandingNav from "../components/header/LandingNav";
import Footer from "../components/footer/Footer";
import LandingBody from "../components/body/LandingBody";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <LandingBody />
      <Footer />
    </>
  );
}
