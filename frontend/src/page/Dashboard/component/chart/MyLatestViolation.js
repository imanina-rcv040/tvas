// import libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
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
  const navigate = useNavigate(); // Initialize useNavigate
  const backEndPath = props.backEndPath;

  // set specific backend path
  const backEndURL = `${backEndPath}/5-latest-violation`;

  let [latestViolation, setLatestViolation] = useState([]);

  // fetch latest five TVAS
  useEffect(() => {
    const fetchLatestViolation = async () => {
      try {
        const response = await fetch(backEndURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("5 latest violation: data", responseData);
          setLatestViolation(responseData);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error fetch 5 latest violations:", error);
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

  const handleCameraFeedClick = () => {
    navigate("/history"); // Navigate to history
    console.log("Navigate to history");
  };

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
