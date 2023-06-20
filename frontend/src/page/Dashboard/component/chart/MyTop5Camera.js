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

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set backend config server
const REACT_APP_BACKEND_CONFIG_SERVER =
  process.env.REACT_APP_BACKEND_CONFIG_SERVER || "http://172.17.0.143:20005";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/top-5-camera`;
console.log("backendServerURL", backendServerURL);

// set config path
const username = localStorage.getItem("username");
const configServerURL = `${REACT_APP_BACKEND_CONFIG_SERVER}/user/${username}`;

export const MyTop5Camera = () => {
  const [topCamViolation, setTopCamViolation] = useState([]);
  const [colors, setColors] = useState([]);

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

    const fetchColors = async () => {
      try {
        const response = await fetch(`${configServerURL}`);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Colors data:", responseData);
          if (responseData.item && responseData.item.colors) {
            setColors(responseData.item.colors);
          }
        } else {
          console.log("Error response colors:", response.status);
        }
      } catch (error) {
        console.log("Error fetching colors", error);
      }
    };

    fetchTopCamViolation();
    fetchColors();
    console.log("topCamViolation", topCamViolation);
  }, []);

  return (
    <Grid>
      <Card className="card">
        <Typography variant="h7" component="h3" className="text-chart-title">
          <span className="color-title">Past Month</span>
          <span className="bg-color-title">
            Most Violations Captured on Cameras
          </span>
        </Typography>
        <CardContent>
          <ResponsiveContainer height={275} width="100%">
            <BarChart data={topCamViolation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="camera" />
              <YAxis />
              <Tooltip />
              <Legend />
              {topCamViolation.length > 0 &&
                topCamViolation[0].violations.map((v, i) => (
                  <Bar
                    key={i}
                    dataKey={`violations[${i}].count`}
                    name={v.type}
                    stackId="violationStack"
                    fill={colors[i % colors.length]}
                    barSize={10}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
