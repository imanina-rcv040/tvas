// import libraries
import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

export const MyTrafficOffenceAlert = (props) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (props.data != null) {
      setAlert(true);
    }
  }, [props.data]);

  // function to handle opening dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // function to handle closing dialog
  const handleClose = () => {
    setOpen(false);
  };

  // this function is called when a traffic offence is detected
  const handleTrafficOffence = () => {
    // open the dialog box
    setAlert(true);
    handleClickOpen();
  };

  let data = props.data;
  let lpr = data.plate_number;
  let imgPath = data.image_savename;
  let timestamp = new Date(data.time);
  let offence = data.event;

  if (offence === "illegal_uturn") {
    offence = "Illegal U-turn";
    timestamp = timestamp[Symbol.toPrimitive]("string");
  }

  return (
    <>
      {alert && (
        <Card variant="outlined">
          <CardContent>
            <Alert severity="warning">
              <Typography variant="h5" component="h6" className="alert-text">
                Alert: Traffic Offence
              </Typography>
            </Alert>
          </CardContent>
          <CardContent>
            <button onClick={handleTrafficOffence} className="button-dashboard">
              View Details
            </button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle className="alert-box-heading">
                Traffic Offence Description
              </DialogTitle>
              <DialogContent>
                <DialogContentText className="alert-box-content">
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    Offence: {offence}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    License Plate: {lpr}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    Timestamp: {timestamp}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    Image Path: {imgPath}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button onClick={handleClose} className="button-dashboard">
                  Close
                </button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      )}
      {!alert && (
        <Card variant="outlined">
          <CardContent>
            <Alert severity="warning">
              <Typography variant="h5" component="h6" className="alert-text">
                No traffic offence detected.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}
    </>
  );
};
