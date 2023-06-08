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

export const MyLatestViolation = () => {
  let latestViolation = [
    {
      timestamp: "2023-04-18T17:28:47.204951+08:00",
      plateNumber: "ABC 123",
      violationType: "Speeding",
    },
    {
      timestamp: "2023-04-18T17:35:57.210939+08:00",
      plateNumber: "DEF 456",
      violationType: "Red Light Running",
    },
    {
      timestamp: "2023-04-18T17:37:17.531941+08:00",
      plateNumber: "GHI 789",
      violationType: "Illegal Parking",
    },
    {
      timestamp: "2023-04-18T17:37:17.531941+08:00",
      plateNumber: "JKL 012",
      violationType: "Illegal U-turn",
    },
    {
      timestamp: "2023-04-18T17:37:17.531941+08:00",
      plateNumber: "MNO 345",
      violationType: "Improper Lane Usage",
    },
  ];

  latestViolation = latestViolation.map((violation) => {
    const date = new Date(violation.timestamp);
    return {
      ...violation,
      timestamp: date.toLocaleString(),
    };
  });

  return (
    <Card sx={styles.card}>
      <Typography variant="h5" component="h3" className="dashboard-title-2">
        Latest Violation
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
                  {violation.timestamp}
                </TableCell>
                <TableCell
                  className="dashboard-report"
                  sx={{
                    ...styles.tableCell,
                    backgroundColor: "rgba(0, 136, 254, 0.5)",
                  }}
                >
                  {violation.plateNumber}
                </TableCell>
                <TableCell
                  className="dashboard-report"
                  sx={{
                    ...styles.tableCell,
                    backgroundColor: "rgba(255, 187, 40, 0.5)",
                  }}
                >
                  {violation.violationType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
