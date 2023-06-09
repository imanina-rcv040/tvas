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
  Tooltip,
} from "@mui/material";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/5-latest-violation`;
console.log("backendServerURL", backendServerURL);

export const MyLatestViolation = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  let [latestViolation, setLatestViolation] = useState([]);

  // fetch latest five TVAS
  useEffect(() => {
    const fetchLatestViolation = async () => {
      try {
        const apiURL = `${backendServerURL}`;
        const response = await fetch(apiURL);
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
        <span className="highlight-title">Highlights</span>
        <span className="recent-title">Recent Violation Cases</span>
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
        <Box className="box-tooltip">
          <Tooltip title="View more details in History" arrow>
            <span onClick={handleCameraFeedClick}>View more...</span>
          </Tooltip>
        </Box>
      </TableContainer>
    </Card>
  );
};
