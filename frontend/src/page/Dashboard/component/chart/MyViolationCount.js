// import React Hook component
import { useState, useEffect } from "react";

// import Material UI components
import { Card, Typography } from "@mui/material";

export const MyViolationCount = (props) => {
  // use props & state
  const backEndPath = props.backEndPath;
  const [totalViolation, setTotalViolation] = useState([]);

  // set specific backend path
  const backEndURL = `${backEndPath}/total-violation`;

  // fetch data on component mount for violation count
  useEffect(() => {
    const fetchTotalViolation = async () => {
      try {
        const response = await fetch(backEndURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("[Data] Violation Count:", responseData);
          setTotalViolation(responseData);
        } else {
          console.log("[Violation Count] Error response:", response.status);
        }
      } catch (error) {
        console.log("[Error] Fetching Violation Count", error);
      }
    };
    fetchTotalViolation();
  }, []);

  return (
    <Card className="card chart-1">
      <Typography
        variant="h4"
        component="h2"
        className="dashboard chart-title"
      >
        Detected Violation
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        className="dashboard chart-title"
        color="gray"
      >
        Today
      </Typography>
      <Typography
        variant="h1"
        component="p"
        color="red"
        flexDirection="row"
      >
        {totalViolation.violationCount}
      </Typography>
    </Card>
  );
};
