// import libraries
import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";

export const MyViolationCount = (props) => {
  const backEndPath = props.backEndPath;
  const [totalViolation, setTotalViolation] = useState([]);

  // set specific backend path
  const backEndURL = `${backEndPath}/total-violation`;

  // fetch TVAS based on trend violation
  useEffect(() => {
    const fetchTotalViolation = async () => {
      try {
        const response = await fetch(backEndURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Data for violation total:", responseData);
          setTotalViolation(responseData);
        } else {
          console.log("Error response total:", response.status);
        }
      } catch (error) {
        console.log("Error fetch total violations", error);
      }
    };

    fetchTotalViolation();
  }, []);

  return (
    <Card className="card">
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
