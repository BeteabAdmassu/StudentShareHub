import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignUp from "./components/body/SignUp";
import SignIn from "./components/body/SignIn";
import ChooseDepartment from "./pages/ChooseDepartmentPage";
import ChooseYear from "./pages/ChooseYearPage";
import NotFound from "./pages/NotFound";
import store from './store/index';
import Profile from "./pages/ProfilePage";
import ChangePassword from "./pages/PasswordChangePage";
import UploadBook from "./pages/BookUploadPage";
import UploadVideo from "./pages/VideoUploadPage";
import UploadQuiz from "./pages/QuizUploadPage";


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      {/* <Header /> */}
      
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
