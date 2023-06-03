import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";

const EditModal = ({
  open,
  onClose,
  heading,
  id,
  button,
  material,
  message,
  book,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (material == "Book") {
      const data = new FormData(event.currentTarget);

      setIsLoading(true);
      await new Promise((resolve, reject) => {
        dispatch({
          type: "UPDATE_BOOK",
          payload: {
            id: id,
            title: data.get("title"),
            description: data.get("description"),
            department: data.get("department"),
            year: data.get("year"),
            course: data.get("course"),
            video: data.get("video"),
          },
          callback: () => {
            setIsLoading(false);
            onClose();
            resolve();
          },
          errorCallback: (error) => {
            reject();
            setIsLoading(false);
          },
        });
      });
    }

    if (material == "Video") {
      const data = new FormData(event.currentTarget);
      setIsLoading(true);
      await new Promise((resolve, reject) => {
        dispatch({
          type: "UPDATE_VIDEO",
          payload: {
            id: id,
            title: data.get("title"),
            description: data.get("description"),
            department: data.get("department"),
            year: data.get("year"),
            course: data.get("course"),
            video: data.get("video"),
          },
          callback: () => {
            setIsLoading(false);
            onClose();
            resolve();
          },
          errorCallback: (error) => {
            reject();
            setIsLoading(false);
          },
        });
      });
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <Modal open={open} onClose={onClose} closeAfterTransition>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            borderRadius: "8px",
            outline: "none",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
            width: "400px",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Grid container justifyContent="flex-end">
              <IconButton color="inherit" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Edit {material}
            </Typography>
            <Typography variant="body2" gutterBottom marginBottom="1rem">
              {message}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="title"
                    label="Title"
                    defaultValue={book.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    defaultValue={book.description}
                    multiline
                    rows={4}
                    name="description"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Department</FormLabel>
                    <Select defaultValue={book.department} name="department">
                      <MenuItem value="Computer Science">
                        Computer Science
                      </MenuItem>
                      <MenuItem value="Software Engineering">
                        Software Engineering
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Year</FormLabel>
                    <Select defaultValue={book.year} name="year">
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course"
                    defaultValue={book.course}
                    name="course"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
