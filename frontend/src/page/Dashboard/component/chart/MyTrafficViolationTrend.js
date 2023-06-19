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

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/last-24-hour`;
console.log("backendServerURL", backendServerURL);

export const MyTrafficViolationTrend = () => {
  const [trendViolation, setTrendViolation] = useState([]);

  // fetch TVAS based on trend violation
  useEffect(() => {
    const fetchTrendViolation = async () => {
      try {
        const apiURL = `${backendServerURL}`;
        const response = await fetch(apiURL);
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
              <Bar dataKey="count" barSize={10} fill="#DC143C"></Bar>
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
