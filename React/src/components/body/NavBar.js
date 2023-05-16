import React from "react";
import { useSelector } from "react-redux";

import LandingNav from "../header/LandingNav";
import HomeNav from "../header/HomeNav";

export default function NavBar() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return <>{isAuth ? <HomeNav /> : <LandingNav />}</>;
}
