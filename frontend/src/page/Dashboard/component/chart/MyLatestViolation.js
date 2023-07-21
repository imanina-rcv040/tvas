// import React Hook component
import { useState, useEffect } from "react";


// import Material UI components
import {
  Card,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export const MyLatestViolation = (props) => {
  // use props & state
  const backEndPath = props.backEndPath;
  let [latestViolation, setLatestViolation] = useState([]);

  // set specific backend path
  const backEndURL = `${backEndPath}/5-latest-violation`;

  // fetch data on component mount for latest violation (5)
  useEffect(() => {
    const fetchLatestViolation = async () => {
      try {
        const response = await fetch(backEndURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("[Data] Latest Violation:", responseData);
          setLatestViolation(responseData);
        } else {
          console.log("[5 Latest Violation] Error response:", response.status);
        }
      } catch (error) {
        console.log("[Error] Fetching 5 Latest Violation", error);
      }
    };
    fetchLatestViolation();
  }, []);

  latestViolation = latestViolation.map((violation) => {
    const date = new Date(violation.engineTimestamp);
    return {
      ...violation,
      engineTimestamp: date.toLocaleString(),
    };
  });

  return (
    <Card className="card">
      <Typography variant="h5" component="h3" className="text-chart-title">
        <span className="color-title">Recent</span>
        <span className="bg-color-title">Violation Incidents</span>
      </Typography>

      <TableContainer className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="tableHeader">Timestamp</TableCell>
              <TableCell className="tableHeader">Plate Number</TableCell>
              <TableCell className="tableHeader">Violation Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestViolation.map((violation, index) => (
              <TableRow key={index}>
                <TableCell className="dashboard-report tableCell engineTimestamp">
                  {violation.engineTimestamp}
                </TableCell>
                <TableCell className="dashboard-report tableCell licensePlateNo">
                  {violation.licensePlateNo}
                </TableCell>
                <TableCell className="dashboard-report tableCell typeEvent">
                  {violation.typeEvent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
