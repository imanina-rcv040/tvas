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

const styles = {
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    height: 400,
  },
  table: {
    height: "100%",
    marginTop: "10px",
    maxHeight: "20em",
    overflowY: "auto",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#e8eaf6",
    color: "#000000",
  },

  tableCell: {
    fontSize: "13px",
    textAlign: "center",
  },
};

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/top-5-latest-violation`;
console.log("backendServerURL", backendServerURL);

export const MyLatestViolation = () => {
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
    <Card sx={styles.card}>
      <Typography
        variant="h5"
        component="h3"
        className="dashboard-title-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "5px",
        }}
      >
        <span
          style={{
            border: "1px solid #3b76a6",
            padding: "5px 10px",
            color: "#3b76a6",
          }}
        >
          Highlights
        </span>
        <span
          style={{
            background: "#3b76a6",
            border: "1px solid #3b76a6 ",
            padding: "5px 10px",
            color: "white",
          }}
        >
          Recent Violation Cases
        </span>
      </Typography>

      <TableContainer sx={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="dashboard-report" sx={styles.tableHeader}>
                Timestamp
              </TableCell>
              <TableCell className="dashboard-report" sx={styles.tableHeader}>
                Plate Number
              </TableCell>
              <TableCell className="dashboard-report" sx={styles.tableHeader}>
                Violation Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestViolation.map((violation, index) => (
              <TableRow key={index}>
                <TableCell
                  className="dashboard-report"
                  sx={{ ...styles.tableCell, backgroundColor: "#f5f5f5" }}
                >
                  {violation.engineTimestamp}
                </TableCell>
                <TableCell
                  className="dashboard-report"
                  sx={{
                    ...styles.tableCell,
                    backgroundColor: "rgba(0, 136, 254, 0.5)",
                  }}
                >
                  {violation.licensePlateNo}
                </TableCell>
                <TableCell
                  className="dashboard-report"
                  sx={{
                    ...styles.tableCell,
                    backgroundColor: "rgba(255, 187, 40, 0.5)",
                  }}
                >
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
