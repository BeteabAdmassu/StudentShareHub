import React from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import BookEditPage from "../../pages/BookEditPage";
import { setSubmitted, setDeleted } from "../../store/user-slice";
import { useNavigate } from 'react-router-dom';


export default function MyComponent(props) {
  const dispatch = useDispatch();


  

  const onYesHandle = async () => {
    if (props.material === "Book") {
      if (props.button === "Post") {
        await dispatch(setSubmitted({ id: props.id, material: "Book" }));
        await dispatch({ type: "SUBMIT_BOOK", payload: { id: props.id } });
        //await dispatch({type: 'FETCH_BOOK_BY_EMAIL'})
      } else if (props.button === "Edit") {
        props.edit(true);
      } else if (props.button === "Delete") {
        await dispatch(setDeleted({ id: props.id, material: "Book" }));
        await dispatch({ type: "DELETE_BOOK", payload: { id: props.id } });
        //  await dispatch({type: 'FETCH_BOOK_BY_EMAIL'})
      }
    }

    if (props.material === "Video") {
      if (props.button === "Post") {
        await dispatch(setSubmitted({ id: props.id, material: "Video" }));
        await dispatch({ type: "SUBMIT_VIDEO", payload: { id: props.id } });
        //await dispatch({type: 'FETCH_VIDEO_BY_EMAIL'})
      } else if (props.button === "Edit") {
        props.edit(true);
      } else if (props.button === "Delete") {
        await dispatch(setDeleted({ id: props.id, material: "Video" }));
        await dispatch({ type: "DELETE_VIDEO", payload: { id: props.id  } });
        // await dispatch({type: 'FETCH_VIDEO_BY_EMAIL'})
      }
    }
  };



 
  return (
    <>
    <Backdrop open={props.open} onClick={props.onClose}>
      <Modal open={props.open} onClose={props.handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "4px",
            width: "400px",
            height: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2">
              {props.title}
            </Typography>

            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="subtitle2">{props.message}</Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button variant="contained" color="primary" onClick={onYesHandle}>
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={props.onClose}
              style={{ marginLeft: "12px" }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Backdrop>
    </>
  );
}
