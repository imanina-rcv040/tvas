// import libraries
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.10.83:20001";

const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/top-5-camera`;
console.log("backendServerURL", backendServerURL);

const colors = ["#00C49F", "#FFBB28", "#0088FE", "#8884d8", "#ff8042"];

  const [topCamViolation, setTopCamViolation] = useState([]);

  // Fetch cams with most violations
  useEffect(() => {
    const fetchTopCamViolation = async () => {
      try {
        const apiURL = `${backendServerURL}`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Data for camera violation report:", responseData);
          setTopCamViolation(responseData);
        } else {
          console.log("Error response camera:", response.status);
        }
      } catch (error) {
        console.log("Error fetch camera violations", error);
      }
    };

    fetchTopCamViolation();
    console.log("topCamViolation", topCamViolation);
  }, []);
