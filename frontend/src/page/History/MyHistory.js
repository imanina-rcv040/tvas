// import libraries
import * as React from "react";
import {
  List,
  Datagrid,
  DateField,
  TextField,
  FunctionField,
  Filter,
  DateInput,
  ReferenceInput,
  SearchInput,
  SelectInput,
} from "react-admin";
import { Box, Drawer } from "@mui/material";
import { useState } from "react"; // Import the useState hook

// import styling
import "./MyHistory.css";

// set image file server
const REACT_APP_BACKEND_FILE_SERVER =
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:20004";

// set image path
const imgURL = `${REACT_APP_BACKEND_FILE_SERVER}/evidence/`;

const HistoryFilters = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <ReferenceInput source="typeEvent" reference="history" label="Event">
      <SelectInput
        source="typeEvent"
        label="Event Type"
        choices={[
          { id: "illegal-uturn", name: "illegal-uturn" },
          { id: "illegal-parking", name: "illegal-parking" },
        ]}
      />
    </ReferenceInput>
    <ReferenceInput source="cameraId" label="Camera" reference="history">
      <SelectInput optionText="cameraId" />
    </ReferenceInput>
    <DateInput source="snapTimestamp_start" label="Start Date" />
    <DateInput source="snapTimestamp_end" label="End Date" />
  </Filter>
);

export const MyHistory = (props) => {
  const [open, setOpen] = useState(false); // Initialize open state as false
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <List {...props} filters={<HistoryFilters />}>
        <Datagrid className="table-event">
          <TextField source="id" label="Event ID" />
          <TextField source="typeEvent" label="Event Type" />
          <TextField source="licensePlateNo" label="License Plate Number" />
          <TextField source="cameraId" label="Camera ID" />
          <DateField
            source="snapTimestamp"
            label="Snapshot Timestamp"
            showTime={true}
          />
          <FunctionField
            source="plate_number_link"
            label="Plate Number Image"
            render={(record) => (
              <a
                href={imgURL + `${record.cameraId}/lp/${record.imageId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                click to view
              </a>
            )}
          />
          <FunctionField
            source="vehicle_link"
            label="Evidence 1"
            render={(record) => (
              <a
                href={imgURL + `${record.cameraId}/raw/${record.imageId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                click to view
              </a>
            )}
          />
          <FunctionField
            source="vehicle_link"
            label="Evidence 2"
            render={(record) => (
              <a
                href={imgURL + `${record.cameraId}/raw2/${record.imageId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                click to view
              </a>
            )}
          />
        </Datagrid>
      </List>
      <Drawer
        variant="persistent"
        open={open}
        anchor="right"
        onClose={handleClose}
        sx={{ zIndex: 100 }}
      ></Drawer>
    </Box>
  );
};
