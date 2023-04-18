// import libraries
import { useState, useEffect } from "react";
import {
  Alert,
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

// set image path
const licensePlateImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}licenseplate/`;
const vehicleImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}screenshot/`;

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
  }

  if (offence === "illegal_uturn") {
    offence = "Illegal U-turn";
  }

  return (
    <>
      {alert && (
        <Card variant="outlined" style={{ height: "35em" }}>
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
                        src={licensePlateImgUrl + imgPath}
                        className="img-fluid img-captured-lp"
                        alt="Captured license plate"
                        title="license plate"
                      ></img>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <img
                        src={vehicleImgUrl + imgPath}
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle className="alert-box-heading">
                Description of Traffic Violation
              </DialogTitle>
              <DialogContent>
                <DialogContentText className="alert-box-content">
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    Violation: {offence}
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
                    Timestamp: {humanReadableTime || ""}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    Vehicle Image:&nbsp;
                    <a
                      href={vehicleImgUrl + imgPath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      click to view
                    </a>
                  </Typography>{" "}
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="alert-box-content"
                  >
                    License Plate Image:&nbsp;
                    <a
                      href={licensePlateImgUrl + imgPath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      click to view
                    </a>
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
