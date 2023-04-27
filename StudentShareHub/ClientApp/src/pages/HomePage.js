import React from "react";

import HomeBody from "../components/body/HomeBody";
import Footer from "../components/footer/Footer";
import HomeView from "../components/body/HomeViews";
import NavBar from "../components/body/NavBar";
import { useSelector } from "react-redux";


export default function HomePage() {

  return (
    <>
      <NavBar/>
         <HomeBody />
     
      <Footer />
    </>
  );
}
