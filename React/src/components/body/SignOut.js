import React from "react";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBar from "../body/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../store/auth-slice";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../body/Loading";


const Backdrop = styled("div")`
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(Paper)`
  padding: ${(props) => props.theme.spacing(4)};
  text-align: center;
`;

const ButtonWrapper = styled("div")`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

function LogoutConfirmationPage() {
 
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();




  const handleLogout = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve, reject) => {
      dispatch({
        type: "LOGOUT_REQUEST",
        callback: () => {
        
          setIsLoading(false); // Stop loading
          resolve(); // Resolve the Promise to continue with the code after the dispatch
          navigate("/");
        },
        errorCallback: (error) => {
          setIsLoading(false); // Stop loading
        },
      });
    });
  };


  return (
    <Backdrop>
      <NavBar />
      {isLoading && <Loading />}
      <Content>
        <Typography variant="h5">Are you sure you want to log out?</Typography>
        <ButtonWrapper>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </ButtonWrapper>
      </Content>
    </Backdrop>
  );
}

export default LogoutConfirmationPage;

