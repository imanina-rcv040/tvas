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

export const MyMonthlyComparison = () => {


  return (
    <Grid item xs={6} md={3}>
        <Typography variant="h5" component="h3" className="text-chart-title-3">
          <span className="color-title">Monthly Basis</span>
          <span className="bg-color-title">Violation Incidents</span>
        </Typography>
        <CardContent>
          <ResponsiveContainer width="100%" height={275}>
            <BarChart data={violationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="month"
                width={100}
                tick={{ fontSize: 13, fontFamily: "Poppins" }}
              />
              <Tooltip />
              <Legend />
              {violationData[0].violations.map((v, i) => (
                <Bar
                  key={i}
                  dataKey={`violations[${i}].count`}
                  stackId="violationStack" // Add stackId prop
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
