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

