// import libraries
import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";

const styles = {
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    height: 400, // Add height property here
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#222",
    fontWeight: "bold",
    fontSize: "28px",
  },
  count: {
    color: "#555",
    fontSize: "48px",
    // marginTop: "12px",
  },
};

export const MyViolationCount = () => {
  let violationCount = 10;
  return (
    <Card sx={styles.card}>
      <Typography
        variant="h4"
        component="h2"
        className="dashboard-title"
        margin="0"
      >
        Detected Violation
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        className="dashboard-title"
        color="gray"
      >
        Today
      </Typography>
      <Typography
        variant="h1"
        component="p"
        color="red"
        className="dashboard-report"
        flexDirection="row"
      >
        {violationCount}
      </Typography>
    </Card>
  );
};
