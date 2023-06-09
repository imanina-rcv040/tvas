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



const colors = ["#00C49F", "#FFBB28", "#0088FE", "#8884d8", "#ff8042"];

const violationData = [
  {
    month: "January",
    violations: [
      { type: "Speeding", count: 100 },
      { type: "Red Light Running", count: 150 },
      { type: "Illegal U-turn", count: 90 },
    ],
  },
  {
    month: "February",
    violations: [
      { type: "Speeding", count: 150 },
      { type: "Red Light Running", count: 130 },
      { type: "Illegal U-turn", count: 160 },
    ],
  },
  {
    month: "March",
    violations: [
      { type: "Speeding", count: 160 },
      { type: "Red Light Running", count: 120 },
      { type: "Illegal U-turn", count: 110 },
    ],
  },
  {
    month: "April",
    violations: [
      { type: "Speeding", count: 90 },
      { type: "Red Light Running", count: 160 },
      { type: "Illegal U-turn", count: 170 },
    ],
  },
  {
    month: "May",
    violations: [
      { type: "Speeding", count: 170 },
      { type: "Red Light Running", count: 110 },
      { type: "Illegal U-turn", count: 160 },
    ],
  },
  {
    month: "June",
    violations: [
      { type: "Speeding", count: 100 },
      { type: "Red Light Running", count: 150 },
      { type: "Illegal U-turn", count: 90 },
    ],
  },
  {
    month: "July",
    violations: [
      { type: "Speeding", count: 150 },
      { type: "Red Light Running", count: 130 },
      { type: "Illegal U-turn", count: 160 },
    ],
  },
  {
    month: "August",
    violations: [
      { type: "Speeding", count: 160 },
      { type: "Red Light Running", count: 120 },
      { type: "Illegal U-turn", count: 110 },
    ],
  },
  {
    month: "September",
    violations: [
      { type: "Speeding", count: 90 },
      { type: "Red Light Running", count: 160 },
      { type: "Illegal U-turn", count: 170 },
    ],
  },
  {
    month: "October",
    violations: [
      { type: "Speeding", count: 170 },
      { type: "Red Light Running", count: 110 },
      { type: "Illegal U-turn", count: 160 },
    ],
  },
  {
    month: "November",
    violations: [
      { type: "Speeding", count: 90 },
      { type: "Red Light Running", count: 160 },
      { type: "Illegal U-turn", count: 170 },
    ],
  },
  {
    month: "December",
    violations: [
      { type: "Speeding", count: 170 },
      { type: "Red Light Running", count: 110 },
      { type: "Illegal U-turn", count: 160 },
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
  const dataJAN = violationData.map((data) => ({
    type: data.type,
    count: data.violations.find((v) => v.month === "January").count,
  }));

  const dataFEB = violationData.map((data) => ({
    type: data.type,
    count: data.violations.find((v) => v.month === "February").count,
  }));

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
                background: colors[0],
                padding: "5px 10px",
                color: "black",
              }}
            >
              JAN
            </span>
            vs
            <span
              style={{
                background: colors[1],
                padding: "5px 10px",
                color: "black",
              }}
            >
              FEB
            </span>
            <Arrow dataJAN={dataJAN} dataFEB={dataFEB} />
          </Typography>
          <ResponsiveContainer width="100%" height={275}>
            <BarChart data={violationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="type"
                width={100}
                tick={{ fontSize: 13, fontFamily: "Poppins" }}
              />
              <Tooltip />
              <Legend />
              {violationData[0].violations.map((v, i) => (
                <Bar
                  key={i}
                  dataKey={`violations[${i}].count`}
                  name={v.month}
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
