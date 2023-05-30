import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Arrow = ({ dataJAN, dataFEB }) => {
  const totalJAN = dataJAN.reduce((acc, curr) => acc + curr.count, 0);
  const totalFEB = dataFEB.reduce((acc, curr) => acc + curr.count, 0);
  console.log("totalJan", totalJAN);

  if (totalFEB > totalJAN) {
    return <ArrowUpwardIcon sx={styles.arrow} />;
  } else if (totalFEB < totalJAN) {
    return <ArrowDownwardIcon sx={styles.arrow} />;
  } else {
    return null;
  }
};

const colors = ["#00C49F", "#FFBB28", "#0088FE", "#8884d8", "#ff8042"];

const violationData = [
  {
    month: "January",
    violations: [
      { type: "Speeding", count: 100 },
      { type: "Red Light Running", count: 150 },
      { type: "Illegal Parking", count: 300 },
      { type: "Improper Lane Usage", count: 200 },
      { type: "Illegal U-turn", count: 100 },
    ],
  },
  {
    month: "February",
    violations: [
      { type: "Speeding", count: 150 },
      { type: "Red Light Running", count: 130 },
      { type: "Illegal Parking", count: 120 },
      { type: "Improper Lane Usage", count: 110 },
      { type: "Illegal U-turn", count: 140 },
    ],
  },
];

const styles = {
  arrow: {
    fontSize: 50,
    verticalAlign: "middle",
  },

  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    height: 400,
  },
};
export const MyMonthlyComparison = () => {
  const dataJAN = violationData[0].violations;
  console.log("dataJAN", dataJAN);
  const dataFEB = violationData[1].violations;
  console.log("dataFEB", dataFEB);

  return (
    <Grid item xs={6} md={3}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography
            variant="h5"
            component="h3"
            className="dashboard-title-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              paddingBottom: "5px",
            }}
          >
            Monthly Comparison
            <span
              style={{
                background: "#000",
                padding: "5px 10px",
                color: "white",
              }}
            >
              JAN
            </span>
            vs
            <span
              style={{
                background: "#000",
                padding: "5px 10px",
                color: "white",
              }}
            >
              FEB
            </span>
            <Arrow dataJAN={dataJAN} dataFEB={dataFEB} />
          </Typography>
          <ResponsiveContainer width="100%" height={275}>
            <BarChart data={violationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {violationData[0].violations.map((v, i) => (
                <Bar
                  key={i}
                  dataKey={`violations[${i}].count`}
                  name={v.type}
                  fill={colors[i % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
