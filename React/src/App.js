import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignUp from "./components/body/SignUp";
import SignIn from "./components/body/SignIn";
import ChooseDepartment from "./pages/ChooseDepartmentPage";
import ChooseYear from "./pages/ChooseYearPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/ProfilePage";
import ChangePassword from "./pages/PasswordChangePage";
import UploadBook from "./pages/BookUploadPage";
import UploadVideo from "./pages/VideoUploadPage";
import UploadQuiz from "./pages/QuizUploadPage";
import SignOut from "./components/body/SignOut";
import MyMaterial from "./pages/MyMaterial";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loginUser } from "./store/auth-slice";



function App() {
  const dispatch = useDispatch();
   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(loginUser(token));
    }
    if (isAuthenticated === true) {
      dispatch({ type: "FETCH_USER_DATA" });

    }
  }, [isAuthenticated, dispatch]);


  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/choose-department" element={<ChooseDepartment />} />
        <Route path="/choose-year" element={<ChooseYear />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/upload-book" element={<UploadBook />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/upload-quiz" element={<UploadQuiz />} />
        <Route path="/my-material" element={<MyMaterial />} />

      </Routes>
    </div>
  );
}

export default App;
