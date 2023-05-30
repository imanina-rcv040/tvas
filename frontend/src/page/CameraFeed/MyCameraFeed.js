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

// import components
import { MyPageHeader } from "./component/MyPageHeader";

// import styling
import "./MyCameraFeed.css";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "172.17.0.143:20001";
console.log("REACT_APP_BACKEND_TVAS_SERVER:", REACT_APP_BACKEND_TVAS_SERVER);

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
        const API_URL = `http://${REACT_APP_BACKEND_TVAS_SERVER}/camera`;
        const response = await fetch(API_URL);
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
        const API_URL = `http://${REACT_APP_BACKEND_TVAS_SERVER}/event/latest?cameraName=${selectedCameraName}`;
        const response = await fetch(API_URL);
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

  return (
    <>
      <MyPageHeader />
