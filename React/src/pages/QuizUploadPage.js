import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Radio,
  FormControlLabel,
  Box,
  Avatar,
} from "@mui/material";
import { AddCircle, RemoveCircle} from "@mui/icons-material";
import Modal from "../components/body/Modal";
import HomeNav from "../components/header/HomeNav";

export default function ExamCreator() {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    setOpen(false);
  };
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleRemoveChoice = (index) => {
    if (choices.length > 2) {
      const newChoices = [...choices];
      newChoices.splice(index, 1);
      setChoices(newChoices);
      if (index === answerIndex) {
        setAnswerIndex(0);
      } else if (index < answerIndex) {
        setAnswerIndex(answerIndex - 1);
      }
    }
  };

  const handleAddChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, ""]);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswerIndex(parseInt(event.target.value));
  };

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    // do something with the question, choices, answerIndex, and explanation
  };

  const handleIncrement = () => {
    setNumQuestions(numQuestions + 1);
  };


  return (
    <>
      <HomeNav />

      <Grid
        container
        sx={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={2.5} sx={{ margin: "1rem" }}>
          <Paper sx={{ marginTop: "1rem", padding: "1rem" }}>
            <Typography variant="h6" align="left">
              Set duration
            </Typography>
            <Typography variant="subtitle2" align="left">
              The duration of the exam
            </Typography>
            <form>
              <TextField
                label="H"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 24 } }}
                sx={{ width: "4rem", margin: "1rem 0.25rem" }}
              />
              <TextField
                label="M"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 59 } }}
                sx={{ width: "4rem", margin: "1rem 0.25rem" }}
              />
              <TextField
                label="S"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 59 } }}
                sx={{ width: "4rem", margin: "1rem 0.25rem" }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Save
              </Button>
            </form>
          </Paper>
          <Paper sx={{ padding: "1rem" }}>
            <Typography sx={{ marginTop: "2rem" }} variant="h6" align="left">
              Exam Information
            </Typography>
            <Typography variant="subtitle2" align="left">
              Enter the following information about the exam
            </Typography>
            <form>
              <TextField
                required
                sx={{ marginTop: "1rem" }}
                label="Title"
                fullWidth
              />
              <TextField
                sx={{ marginTop: "1rem" }}
                label="Description"
                multiline
                rows={4}
                fullWidth
                required
              />
              <TextField
                sx={{ marginTop: "1rem" }}
                label="Department"
                fullWidth
                select
                SelectProps={{ native: true }}
                required
              >
                <option value="computer-science">Computer Science</option>
                <option value="software-engineering">
                  Software Engineering
                </option>
              </TextField>
              <TextField
                sx={{ marginTop: "1rem" }}
                label="Year"
                fullWidth
                select
                SelectProps={{ native: true }}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </TextField>
              <TextField
                required
                sx={{ marginTop: "1rem" }}
                label="Course"
                fullWidth
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </form>
          </Paper>{" "}
        </Grid>

        <Grid item xs={5} sx={{ margin: "1rem" }}>
          <Paper>
            <Typography
              sx={{
                padding: "0.5rem",

                backgroundColor: "#2b6cb0",
                color: "#fff",
              }}
              variant="h6"
              align="center"
            >
              Exam Studio
            </Typography>
            <form onSubmit={handleSave}>
              <Typography variant="h6" align="center" marginTop="3rem">
                Question
              </Typography>
              <Box sx={{ padding: "1rem 2rem" }}>
                <TextField
                  sx={{ margin: "1rem 0" }}
                  label="Question"
                  fullWidth
                  value={question}
                  onChange={handleQuestionChange}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" display="inline" marginLeft="1rem">
                  Choice
                </Typography>
                <IconButton onClick={handleAddChoice}>
                  <AddCircle />
                </IconButton>
              </Box>
              {choices.map((choice, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        color="primary"
                        checked={index === answerIndex}
                        onChange={handleAnswerChange}
                        value={index}
                      />
                    }
                    label=""
                  />
                  <TextField
                    sx={{ width: "100%" }}
                    label={`Choice ${index + 1}`}
                    required
                    value={choice}
                    onChange={(event) =>
                      handleChoiceChange(index, event.target.value)
                    }
                  />
                  <IconButton onClick={() => handleRemoveChoice(index)}>
                    <RemoveCircle />
                  </IconButton>
                </Box>
              ))}
              <Box sx={{ padding: "2rem" }}>
                <TextField
                  fullWidth
                  label="Explanation"
                  multiline
                  rows={4}
                  value={explanation}
                  onChange={handleExplanationChange}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ margin: "1rem" }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ margin: "1rem" }}
                  onClick={handleDeleteClick}
                >
                  Remove
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={2.5} sx={{ margin: "1rem" }}>
          <Paper>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" align="center">
                Questions
              </Typography>
              <IconButton onClick={handleIncrement}>
                <AddCircle />
              </IconButton>
            </div>
            <Typography variant="subtitle1" align="center">
              Add questions below
            </Typography>
            <Box
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {Array.from(Array(numQuestions).keys()).map((question) => (
                <IconButton sx={{margin: '1rem',  width: 30, height: 30, backgroundColor:'#2b6cb0', color: '#fff'}}>
                  <Typography variant="subtitle2">{question + 1}</Typography>
                
                </IconButton>
              ))}
          
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {  open && < Modal open={open} onClose={handleModalClose}/>}
    </>
  );
}
