import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "../../ui/Card";

export default function MyComponent(props) {
  return (
    <>
      <Box margin="2rem 5rem 2rem 5rem" width="95%">
        <Typography variant="h6" sx={{ textAlign: "left", fontWeight: 700 }}>
          {props.materialType}
        </Typography>
        <Box
          sx={{
            width: "100%", // '100%
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          {         
          props.materialType === "Books" ? props.books.map((item) => (
            <Card key={item.id} data={item} title={"Books"} />
          )) : props.materialType === "Videos" ? props.videos.map((item) => (
            <Card key={item.id} data={item} title={"Videos"} />
          )) : props.materialType === "Quizzes" ? props.quizzes.map((item) => (
            <Card key={item.id} data={item} title={"Quizzes"} />
          )): null
          
        }


        </Box>
      </Box>
    </>
  );
}
