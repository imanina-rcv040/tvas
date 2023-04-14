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

// set image file server
const REACT_APP_BACKEND_FILE_SERVER =
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:6060/";
console.log("REACT_APP_BACKEND_FILE_SERVER", REACT_APP_BACKEND_FILE_SERVER);

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

  let {
    plate_number: lpr,
    image_savename: imgPath,
    time: timestamp,
    event: offence,
  } = props.data;

  let date, dateOptions, timeOptions, humanReadableTime;
  if (timestamp !== null) {
    console.log("date type", typeof timestamp);
    date = new Date(timestamp);
    dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    timeOptions = {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    humanReadableTime =
      date.toLocaleTimeString("en-US", timeOptions) +
      ", " +
      date.toLocaleDateString("en-GB", dateOptions);
    console.log("humanReadableTime", humanReadableTime);
  }

  if (offence === "illegal_uturn") {
    offence = "Illegal U-turn";
  }

  return (
    <>
      {alert && (
        <Card variant="outlined">
          <CardContent>
            <Alert severity="warning" style={{ height: "35em" }}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Typography
                        variant="h5"
                        component="h6"
                        className="alert-text"
                      >
                        Traffic Violation:
                      </Typography>
                    </td>
                    <td>
                      <input type="text" value={offence || ""} readOnly></input>
                    </td>
                    <td>
                      <button
                        onClick={handleTrafficOffence}
                        className="button-dashboard"
                      >
                        View Description
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography
                        variant="h5"
                        component="h6"
                        className="alert-text"
                      >
                        License Plate:
                      </Typography>
                    </td>
                    <td>
                      <input type="text" value={lpr || ""} readOnly></input>
                    </td>
                    <td>
                      <img
                        src={
                          REACT_APP_BACKEND_FILE_SERVER +
                          "licenseplate/" +
                          imgPath
                        }
                        className="img-fluid img-captured-lp"
                        alt="Captured license plate"
                        title="license plate"
                      ></img>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <img
                        src={
                          REACT_APP_BACKEND_FILE_SERVER +
                          "screenshot/" +
                          imgPath
                        }
                        className="img-fluid img-captured-vehicle"
                        alt="Captured vehicle"
                        title="vehicle"
                      ></img>
                    </td>
                  </tr>
                </tbody>
              </table>
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
