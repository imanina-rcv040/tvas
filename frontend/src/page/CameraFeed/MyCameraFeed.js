// import libraries
import { useState, useEffect, useRef } from "react";
import { Alert, Card, CardContent, Grid, Typography } from "@mui/material";
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
  const [alert, setAlert] = useState(false);

  const [camInfo, setCamInfo] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [selectedCameraName, setSelectedCameraName] = useState("");
  const [latestEvent, setLatestEvent] = useState(null);

  // fetch all available camera
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const apiURL = `${backendServerURL}/camera`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          const camerasData = responseData.items;
          setCameras(camerasData);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error fetch all available cameras:", error);
      }
    };

    fetchCameras();
  }, []);

  // initial: auto set camera info automatically for selected camera
  useEffect(() => {
    if (cameras.length > 0) {
      const initialCamera = cameras[0];
      setCamInfo(initialCamera);
      setSelectedCameraId(initialCamera.cameraId);
      setSelectedCameraName(initialCamera.cameraName);
    }
  }, [cameras]);

  // fetch TVAS latest event
  useEffect(() => {
    const fetchLatestEvent = async () => {
      if (selectedCameraId) {
        try {
          const apiURL = `${backendServerURL}/camera/${selectedCameraId}/latest-event`;
          console.log("API URL fetch latest event", apiURL);
          const response = await fetch(apiURL);
          if (response.ok) {
            const responseData = await response.json();
            console.log("Latest Event", responseData);
            setLatestEvent(responseData);
            setAlert(responseData !== null);
          } else {
            console.log("Error Response:", response.status);
            setLatestEvent(null);
            setAlert(false);
          }
        } catch (error) {
          console.log("Error fetch TVAS latest event:", error);
        }
      }
    };
    fetchLatestEvent();
  }, [selectedCameraId]);

  // camera change handling
  const handleCameraChange = (event) => {
    const cameraName = event.target.value;
    const selectedCamera = cameras.find(
      (camera) => camera.cameraName === cameraName
    );
    console.log("Selected camera:", selectedCamera);

    if (selectedCamera) {
      setSelectedCameraId(selectedCamera.cameraId);
      setSelectedCameraName(selectedCamera.cameraName);
      setCamInfo(selectedCamera);
    }
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
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* row1 */}
        <Grid item xs={12}>
          <MyPageHeader />
        </Grid>

        {/* row2 */}
        <Grid item xs={6}>
          {/* top left */}
          <Typography variant="h5" component="h3" className="title-sub">
            TRAFFIC UPDATES
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
        </Grid>

        <Grid item xs={6}>
          {/* top right */}
          <Typography variant="h5" component="h3" className="title-sub">
            TRAFFIC VIOLATION UPDATES
          </Typography>
        </Grid>
        <Grid item xs={3} >
          <Typography variant="h5" component="h3" className="title-sub">
            ENTRY PHOTO
          </Typography>
        </Grid>

        <Grid item xs={3} >
          <Typography variant="h5" component="h3" className="title-sub">
            EXIT PHOTO
          </Typography>
        </Grid>

        {/* row3 */}
        <Grid item xs={6}>
          <Card>
            <CardContent title={"live updates"}>
              <div className="canvas-container">
                <img
                  src={`${imgServerURL}/${selectedCameraId}/s.jpg`}
                  alt={`Snapshot for camera: ${selectedCameraId}`}
                  title={`${imgServerURL}/${selectedCameraId}/s.jpg`}
                  className="canvas-stream"
                  ref={imgRef}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} >
          {alert && (
            <div >
              <Card>
                <CardContent title={"violation updates"}>
                  <div className="canvas-container">
                    <img
                      src={`${evidenceImgURL}/${selectedCameraId}/raw/${latestEvent.imageId}`}
                      title={`${evidenceImgURL}/${selectedCameraId}/raw/${latestEvent.imageId}`}
                      alt={`${evidenceImgURL}/${selectedCameraId}/raw/${latestEvent.imageId}`}
                      className="canvas-stream"
                    />
                  </div>
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
        </Grid>

        <Grid item xs={3}>
          {alert && (
            <div >
              <Card>
                <CardContent title={"violation updates"}>
                  <div className="canvas-container">
                    <img
                      src={`${evidenceImgURL}/${selectedCameraId}/raw2/${latestEvent.imageId}`}
                      title={`${evidenceImgURL}/${selectedCameraId}/raw2/${latestEvent.imageId}`}
                      alt={`${evidenceImgURL}/${selectedCameraId}/raw2/${latestEvent.imageId}`}
                      className="canvas-stream"
                    />
                  </div>
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
        </Grid>

        {/* row4 */}
        <Grid item xs={6}>
          {/* top left */}
          <Typography variant="h5" component="h3" className="title-sub">
            DEVICE INFO
          </Typography>
        </Grid>

        <Grid item xs={6} >
          <Typography variant="h5" component="h3" className="title-sub">
            TRAFFIC VIOLATION DETAILS
          </Typography>
        </Grid>

        {/* row5 */}
        <Grid item xs={2}>
          {camInfo && (
            <div>
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
          )}
        </Grid>

        <Grid item xs={2}>
          {camInfo && (
            <div>
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
          )}
        </Grid>

        <Grid item xs={2}>
          {camInfo && (
            <div>
              <Card sx={{ flex: 0.5 }}>
                <CardContent>
                  <div className="device-info">
                    <p>
                      <strong>Detector Type: </strong>
                      {camInfo.detectorType}
                    </p>
                    <p>
                      <strong>IP Source: </strong>
                      {camInfo.sourceIp}
                    </p>
                    <p>
                      <strong>Connection Status: </strong>
                      {camInfo.connectStatus}
                    </p>
                    <p>
                      <strong>Last Update: </strong>
                      {camInfo.snapTimestamp}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </Grid>

        <Grid item xs={6}>
          {alert && (
            <div>
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
                              Event Type
                            </Typography>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={latestEvent.typeEvent}
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Typography
                              variant="h5"
                              component="h6"
                              className="alert-text"
                            >
                              License Plate
                            </Typography>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={latestEvent.licensePlateNo}
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td colSpan="2">
                            <img
                              src={`${evidenceImgURL}/${selectedCameraId}/lp/${latestEvent.imageId}`}
                              alt={`${evidenceImgURL}/${selectedCameraId}/lp/${latestEvent.imageId}`}
                              title={`${evidenceImgURL}/${selectedCameraId}/lp/${latestEvent.imageId}`}
                              className="img-fluid img-captured-lp"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Typography
                              variant="h5"
                              component="h6"
                              className="alert-text"
                            >
                              Engine Timestamp
                            </Typography>
                          </td>
                          <td colSpan="1">
                            <input
                              type="text"
                              value={latestEvent.engineTimestamp}
                              readOnly
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!alert && (
            <Card variant="outlined">
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
        </Grid>

      </Grid >

    </>
  );
};
