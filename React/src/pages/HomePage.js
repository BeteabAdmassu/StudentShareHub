import React from "react";

import HomeBody from "../components/body/HomeBody";
import Footer from "../components/footer/Footer";

import NavBar from "../components/body/NavBar";

import Loading from "../components/body/Loading";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

 useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      if (auth.isAuthenticated) {
        await dispatch({
          type: "GET_ALL_BOOK_BY_YEAR_AND_DEPARTMENT",
          payload: {
            department: user.data.department,
            year: user.data.year,
          },
        });
        await dispatch({
          type: "GET_ALL_VIDEO_BY_YEAR_AND_DEPARTMENT",
          payload: {
            department: user.data.department,
            year: user.data.year,
          },
        });
      } else {
        await dispatch({
          type: "GET_ALL_BOOk",
        });
        await dispatch({
          type: "GET_ALL_VIDEO",
        });
      }

    };

    fetchData();
  }, [auth.isAuthenticated, dispatch, user.data.department, user.data.year]);



  return (
    <>
    {loading && <Loading />}
      <NavBar />
      <HomeBody />
      <Footer />
    </>
  );
}
