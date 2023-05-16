import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";

export default function MyComponent(props) {
  return (
    
    <Backdrop open={props.open} onClick={props.onClose}>
      <Modal
        open={props.open}
        onClose={props.handleModalClose}
        center={true}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "4px",
            width: "400px",
            height: "200px",
          }}
        >
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <Typography variant="h6" component="h2">
            Your about to delete a question ?
            </Typography>

            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </div>
            <Typography variant="subtitle2">
            The question will be deleted immediately. You can't undo this
            action.
            </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button variant="contained" color="primary">
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
  );
}
