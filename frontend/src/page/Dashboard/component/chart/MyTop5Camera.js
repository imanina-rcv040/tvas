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
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/top-5-camera`;
console.log("backendServerURL", backendServerURL);

const colors = ["#DC143C", "#800020", "#CD581E", "#FFB020", "#FF7518"];

export const MyTop5Camera = () => {
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

  return (
    <Grid>
      <Card className="card">
        <Typography variant="h5" component="h3" className="text-chart-title">
          <span className="color-title">Past Month</span>
          <span className="bg-color-title">
            Top 5 Cameras:
            <br />
            Most Violations Captured
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
