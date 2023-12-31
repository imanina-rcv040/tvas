// import libraries
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Line,
} from "recharts";

export const MyTrafficViolationTrend = (props) => {
  const backEndPath = props.backEndPath;
  const configPath = props.configPath;

  // set specific backend path
  const backEndURL = `${backEndPath}/last-24-hour`;

  const [trendViolation, setTrendViolation] = useState([]);
  const [colors, setColors] = useState([]);

  // fetch TVAS based on trend violation
  useEffect(() => {
    const fetchTrendViolation = async () => {
      try {
        const response = await fetch(backEndURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Data for violation trend:", responseData);
          setTrendViolation(responseData);
        } else {
          console.log("Error response monthly:", response.status);
        }
      } catch (error) {
        console.log("Error fetch monthly violations", error);
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

    fetchColors();
    fetchTrendViolation();
  }, []);

  return (
    <Grid>
      <Card className="card">
        <Typography variant="h5" component="h3" className="text-chart-title">
          <span className="color-title">Last 24 Hours</span>
          <span className="bg-color-title">Violation Trend</span>
        </Typography>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart width={730} data={trendViolation}>
              <XAxis dataKey="hour" />
              <YAxis />
              <CartesianGrid strokeDasharray="5 5" />
              <Bar dataKey="count" barSize={10} fill={colors[0]}></Bar>
              <Line
                type="monotone"
                dataKey="count"
                stroke="#000"
                name="violation"
              ></Line>
              <Tooltip cursor={{ strokeDasharray: "5 5" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
