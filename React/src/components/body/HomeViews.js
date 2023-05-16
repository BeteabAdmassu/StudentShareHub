import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "../../ui/Card";
import { useSelector } from "react-redux";

export default function MyComponent(props) {

  return (
    <>
      <Box margin="3rem" width="95%">
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
          {props.books.map((item) => (
            <Card key={item.id} data={item} title={"Books"} />
          ))}
        </Box>
      </Box>
    </>
  );
}
