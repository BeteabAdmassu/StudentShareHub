import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import dummy from "../assets/dummy.jpg";
import DrawerBook from "../components/drawer/DrawerBook";
import DrawerQuiz from "../components/drawer/DrawerQuiz";
import DrawerVideo from "../components/drawer/DrawerVideo";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookCardPdf from "../components/body/BookCardPdf";
import { useState, useEffect } from "react";




function getYouTubeVideoId(url) {
  // Match the video ID pattern in the YouTube URL
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w-]{11})/
  );

  if (match) {
    // Extract the video ID from the match
    return match[1];
  } else {
    // The URL doesn't match the expected pattern
    return null;
  }
}


export default function ReviewCard(props) {
  const [state, setState] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [VIDEO_ID, setVIDEO_ID] = useState("");
  const VIDEO_SRC = `https://www.youtube.com/embed/${VIDEO_ID}`;


  // if(props.title === "Videos"){
  //   setVIDEO_ID(getYouTubeVideoId(props.data.videoUrl));
  //   console.log(VIDEO_ID);
  // }
   
  useEffect(() => {
    if(props.title === "Videos"){
      setVIDEO_ID(getYouTubeVideoId(props.data.videoUrl));
      console.log(VIDEO_ID);
    }
  }, []);

 
    




  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const Drawer = () => {
    switch (props.title) {
      case "Books":
        return (
          <DrawerBook
            state={state}
            toggleDrawer={toggleDrawer}
            data={props.data}
          />
        );
      case "Quizzes":
        return (
          <DrawerQuiz
            state={state}
            toggleDrawer={toggleDrawer}
            data={props.data}
          />
        );
      case "Videos":
        return (
          <DrawerVideo
            state={state}
            toggleDrawer={toggleDrawer}
            data={props.data}
          />
        );
      default:
        return (
          <DrawerBook
            state={state}
            toggleDrawer={toggleDrawer}
            data={props.data}
          />
        );
    }
  };
  const toggleDrawer = () => (event) => {
    setState(!state);
  };
  return (
    <>
     {state && Drawer()}
      <Card
        sx={{ maxWidth: 250, minWidth: 250, borderRadius: "20px", margin: 2 }}
      >
        {props.title === "Books" && <BookCardPdf pdf={props.data.filePath} />}
        {props.title === "Videos" && (
          // console.log(VIDEO_SRC),
           
          //Iframe
          // <CardMedia
          //   component="iframe"
          //   height="140"
          //   image={VIDEO_SRC}
          //   alt="video"
          // />

          <iframe
              width="100%"
             src={VIDEO_SRC}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>


          )}  
      
        <CardContent
          style={{
            maxHeight: "3rem",
            minHeight: "3rem",
            textAlign: "left",
            fontWeight: 700,
          }}
          onClick={toggleDrawer()}
          pointer="cursor"
        >
          <Typography
            variant="body"
            color="#2b6cb0"
            sx={{ textAlign: "left", width: "100%", height: "100%" }}
          >
           {props.data.title}
          </Typography>
        </CardContent>
        <CardHeader
          style={{ maxHeight: "3rem", minHeight: "3rem", textAlign: "left", marginTop:'1rem' }}
          avatar={
            <Avatar aria-label="user profile">
              <img
                src={props.data.authorProfilePic
                }   
                alt="user profile"
                style={{ width: "100%", height: "100%" }}
              />
            </Avatar>
          }
          title={props.data.author}
          subheader={props.data.date}
        />

        <CardActions
          disableSpacing
          style={{ maxHeight: "2rem", minHeight: "2rem" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="text"
              sx={{ marginRight: "1rem" }}
              onClick={handleLikeClick}
            >
              <ThumbUpAltIcon
                sx={{ marginRight: "0.5rem" }}
                color='silver'
              />
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ marginLeft: "0.5rem" }}
              >
                {props.data.likes}
              </Typography>
            </Button>

            
            <Button variant="text">
              <VisibilityIcon sx={{ marginRight: "0.5rem" }} />
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ marginLeft: "0.5rem" }}
              >
                {props.data.views}
              </Typography>
            </Button>
          </Box>
        </CardActions>
      </Card> 
    </>
  );
}
