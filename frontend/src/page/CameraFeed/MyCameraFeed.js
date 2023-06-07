// import libraries
import { useState, useEffect, useRef } from "react";
import { Alert, Card, CardContent, Typography } from "@mui/material";

// import components
import { MyPageHeader } from "./component/MyPageHeader";

// import styling
import "./MyCameraFeed.css";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set image server
const IMAGE_STORAGE_HOST_URL =
  process.env.IMAGE_STORAGE_HOST_URL || "http://172.17.0.143:20004";

//set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}`;

// set image path for snapshot
const imgServerURL = `${IMAGE_STORAGE_HOST_URL}/snapshot`;
// set image path for evidence
const evidenceImgURL = `${IMAGE_STORAGE_HOST_URL}/evidence`;

console.log("API URL:", backendServerURL);
console.log("IMAGE URL:", imgServerURL);

export const MyCameraFeed = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(false);

  const [camInfo, setCamInfo] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraName, setSelectedCameraName] = useState(null);

  const [latestEvent, setLatestEvent] = useState(null);

  const [violationInfo, setViolationInfo] = useState({
    eventType: "Speeding",
    licensePlate: "WYL9335",
    licensePlateImage: "https://example.com/license_plate_image.jpg",
    vehicleImage: "https://example.com/vehicle_image.jpg",
    timestamp: "May 26, 2023 - 2:30 PM",
  });

  // TVAS event
  useEffect(() => {
    if (violationInfo != null) {
      setAlert(true);
    }
  }, [violationInfo]);

  // fetch all available camera
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const apiURL = `${backendServerURL}/camera`;
        const response = await fetch(apiURL);
        console.log("Response", response);

        try {
          const responseData = await response.json(); // Parse the response body as JSON
          console.log("Response Data", responseData);

          const camerasData = responseData.items;
          setCameras(camerasData);

          console.log("Success:", response.status);
        } catch (error) {
          console.log("Error:", response.status, error);
        }
      } catch (error) {
        console.log("Error:", error); // Log the error message
      }
    };

    fetchCameras();
  }, []);

  // initial: auto set camera info automatically for selected camera
  useEffect(() => {
    if (cameras.length > 0) {
      const initialCamera = cameras[0];
      setCamInfo(initialCamera);
      setSelectedCameraName(initialCamera.cameraName);
    }
  }, [cameras]);

  // fetch TVAS latest event
  const fetchLatestEvent = async () => {
    if (selectedCameraName) {
      try {
        const apiURL = `${backendServerURL}/event/latest?cameraName=${selectedCameraName}`;
        const response = await fetch(apiURL);
        const responseData = await response.json();
        setLatestEvent(responseData);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  // camera change handling
  const handleCameraChange = (e) => {
    const selectedCameraName = e.target.value;
    const selectedCamera = cameras.find(
      (camera) => camera.cameraName === selectedCameraName
    );
    if (selectedCamera) {
      setCamInfo(selectedCamera);
    }
    setSelectedCameraName(selectedCameraName);
  };

  // open dialogue handling
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // close dialogue handling
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const imgRef = useRef(null);

  //handle the image refreshing logic
  useEffect(() => {
    let timeoutId; //store the ID of the setTimeout function

    // update the src attribute of the img element
    const refreshImage = () => {
      // checks existing element exists & modifies the src by appending a query parameter with the current timestamp
      if (imgRef.current) {
        imgRef.current.src =
          imgRef.current.src.split("?")[0] + "?" + new Date().getTime();
      }
      timeoutId = setTimeout(refreshImage, 3000); // refresh every 3 seconds
    };

    refreshImage(); //initiate the refreshing process

    return () => {
      clearTimeout(timeoutId); // cleanup function to clear the timeout
    };
  }, []);

  return (
    <>
      <MyPageHeader />
      <div className="flex">
        <div className="leftCol">
          <div className="singleCol">
            <Typography variant="h5" component="h3" className="title-sub">
              TRAFFIC LIVE UPDATES
            </Typography>
            <div className="dropdown-wrapper">
              <select
                className="stream-dropdown"
                id="cameraName"
                value={selectedCameraName || ""}
                onChange={handleCameraChange}
              >
                {cameras.map((camera) => (
                  <option key={camera.cameraId} value={camera.cameraName}>
                    {camera.cameraName}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="button-update-stream"
              // onClick={reinitStream}
            >
              Update Stream
            </button>
            <Card>
              <CardContent title={"live updates"}>
                <div className="canvas-container">
                  <img
                    src={imgServerURL}
                    alt="Snapshot"
                    title={imgServerURL}
                    className="canvas-stream"
                    ref={imgRef}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rightCol">
          <div className="singleCol">
            <div className="section-wrapper">
              <div className="section">
                <Typography variant="h5" component="h3" className="title-sub">
                  TRAFFIC VIOLATION LIVE UPDATES
                </Typography>

                {alert && (
                  <div>
                    <Card>
                      <CardContent title={"violation updates"}>
                        <div className="canvas-container">
                          <div id="cvsVideo" className="canvas-stream2" />
                          <div id="cvsVideo" className="canvas-stream3" />
                        </div>
                      </CardContent>
                    </Card>
                    <Typography
                      variant="h5"
                      component="h3"
                      className="title-traffic-details"
                    >
                      TRAFFIC VIOLATION DETAILS
                    </Typography>
                    <Card>
                      <CardContent title="violation details">
                        <div className="canvas-container2">
                          <table className="violation-table">
                            <tbody>
                              <tr>
                                <td>
                                  <Typography
                                    variant="h5"
                                    component="h6"
                                    className="alert-text"
                                  >
                                    Event Type:
                                  </Typography>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={violationInfo.eventType}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <button
                                    onClick={handleOpenDialog}
                                    className="button-view-desc"
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
                                  <input
                                    type="text"
                                    value={violationInfo.licensePlate}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <div
                                    id="cvsVideo2"
                                    className="canvas-stream4"
                                  >
                                    <img
                                      className="img-fluid img-captured-lp"
                                      alt="captured license plate"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>

                      <CardContent>
                        <Dialog open={openDialog} onClose={handleCloseDialog}>
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
                                Violation Type: {violationInfo.eventType}
                              </Typography>
                              <Typography
                                variant="body1"
                                gutterBottom
                                className="alert-box-content"
                              >
                                License Plate: {violationInfo.licensePlate}
                              </Typography>
                              <Typography
                                variant="body1"
                                gutterBottom
                                className="alert-box-content"
                              >
                                License Plate Image:&nbsp;
                                <a
                                  href={violationInfo.licensePlateImage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  click to view
                                </a>
                              </Typography>
                              <Typography
                                variant="body1"
                                gutterBottom
                                className="alert-box-content"
                              >
                                Vehicle Image:&nbsp;
                                <a
                                  href={violationInfo.vehicleImage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  click to view
                                </a>
                              </Typography>
                              <Typography
                                variant="body1"
                                gutterBottom
                                className="alert-box-content"
                              >
                                Timestamp: {violationInfo.timestamp}
                              </Typography>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <button
                              onClick={handleCloseDialog}
                              className="button-close-desc"
                            >
                              Close
                            </button>
                          </DialogActions>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {!alert && (
                  <Card variant="outlined" className="card">
                    <CardContent>
                      <Alert severity="info">
                        <Typography
                          variant="h5"
                          component="h6"
                          className="alert-text2"
                        >
                          No traffic violation detected.
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="leftCol">
          <div className="singleCol">
            <Typography variant="h5" component="h3" className="title-sub">
              CAMERA INFORMATION
            </Typography>
            {camInfo && (
              <div className="device-info-cards">
                <div className="device-info-card">
                  <Card sx={{ flex: 1 }}>
                    <CardContent title={"device info"}>
                      <div className="device-info">
                        <p>
                          <strong>Camera Name: </strong>
                          {camInfo.cameraName}
                        </p>
                        <p>
                          <strong>Camera Type: </strong>
                          {camInfo.deviceType}
                        </p>
                        <p>
                          <strong>Resolution: </strong>
                          {camInfo.resolution}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="device-info-card">
                  <Card sx={{ flex: 1 }}>
                    <CardContent>
                      <div className="device-info">
                        <p>
                          <strong>Frame Rate: </strong>
                          {camInfo.fps}
                        </p>
                        <p>
                          <strong>Latitude: </strong>
                          {camInfo.geoLatitude}
                        </p>
                        <p>
                          <strong>Longitude: </strong>
                          {camInfo.geoLongitude}
                        </p>
                        <p>
                          <strong>Province: </strong>
                          {camInfo.province}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="device-info-card">
                  <Card sx={{ flex: 0.5 }}>
                    <CardContent>
                      <div className="device-info">
                        <p>
                          <strong>Detector Type: </strong>
                          {camInfo.detectorType}
                        </p>
                        <p>
                          <strong>IP Source: </strong> 192.168.0.100
                          {camInfo.ipSource}
                        </p>
                        <p>
                          <strong>Connection Status: </strong>
                          {camInfo.connectStatus}
                        </p>
                        <p>
                          <strong>Last Update: </strong>
                          {/* {camInfo.lastUpdate} */}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
