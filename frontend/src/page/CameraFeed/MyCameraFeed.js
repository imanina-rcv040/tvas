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
