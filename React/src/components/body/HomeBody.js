import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchBar from "./Searchbar";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import Card from "../../ui/Card";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import HomeViews from "./HomeViews";
import { useDispatch } from "react-redux";

export default function SimpleContainer(props) {
  const [filterValue, setFilterValue] = React.useState(false);

  const books = useSelector((state) => state.books.books);
  const videos = useSelector((state) => state.videos.videos);


  const handleSearch = (labelOptionValue) => {
    //...
    console.log(labelOptionValue);
  };
  const Filter = ({ filters, onFilterChange }) => {
    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      onFilterChange(name, value);
    };


    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
  
        <Box sx={{ width: "60%" }}>
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
            Filter
          </Typography>

          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Material Type</InputLabel>
            <Select
              name="materialType"
              value={filters.materialType}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem>Books</MenuItem>
              <MenuItem>Videos</MenuItem>
              <MenuItem >Quizzes</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">Year 1</MenuItem>
              <MenuItem value="2">Year 2</MenuItem>
              <MenuItem value="3">Year 3</MenuItem>
              <MenuItem value="4">Year 4</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="software-engineering">
                Software Engineering
              </MenuItem>
              <MenuItem value="electrical-engineering">
                Electrical Engineering
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ marginTop: "4rem" }}>
        <Box sx={{ padding: "1rem" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
          >
            <SearchBar
              // value={}
              // onChange={}
              width="50%"
              onSearch={handleSearch}
            />
            <IconButton
              aria-label="filter"
              sx={{ marginLeft: "1rem" }}
              onClick={() => setFilterValue(!filterValue)}
            >
              <FilterListIcon />
            </IconButton>
          </Box>
          {filterValue && (
            <Filter
              filters={{
                materialType: "",
                year: "",
                department: "",
              }}
              onFilterChange={(name, value) => {
                console.log(name, value);
              }}
            />
          )}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
              flexWrap: "wrap",
            }}
          >
         
      

            {
              books.length === 0? <Typography variant="h6" sx={{ textAlign: "left", fontWeight: 700 }}>No Books</Typography> : <HomeViews books={books} materialType="Books"/>
            }
            { videos.length > 0 && <HomeViews videos={videos} materialType="Videos"/>}


          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
