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

export const MyTop5Camera = (props) => {
  const backEndPath = props.backEndPath;
  const configPath = props.configPath;

  // set specific backend path
  const backEndURL = `${backEndPath}/top-5-camera`;

  const [topCamViolation, setTopCamViolation] = useState([]);
  const [colors, setColors] = useState([]);

  // Fetch cams with most violations
  useEffect(() => {
    const fetchTopCamViolation = async () => {
      try {
        const response = await fetch(backEndURL);
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
        const response = await fetch(configPath);
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
