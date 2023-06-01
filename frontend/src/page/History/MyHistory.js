// import libraries
import * as React from "react";
import {
  List,
  Datagrid,
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

// set image file server
const REACT_APP_BACKEND_FILE_SERVER =
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:20004";

// set image path
const imgURL = `${REACT_APP_BACKEND_FILE_SERVER}/evidence/`;

const HistoryFilters = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <ReferenceInput source="event" reference="history" allowEmpty>
      <SelectInput
        source="event"
        label="Violation Event"
        choices={[
          { id: "u-turn", name: "Illegal U-turn" },
          { id: "parking", name: "Illegal Parking" },
          { id: "speeding", name: "Speeding" },
        ]}
      />
    </ReferenceInput>
    <DateInput source="time" label="Date" />
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
        <Datagrid>
          <TextField source="id" label="Event ID" />
          <TextField source="typeEvent" label="Event Type" />
          <TextField source="licensePlateNo" label="License Plate Number" />
          <TextField source="engineTimestamp" label="Engine TImestamp" />
          <TextField source="imageId" label="Image ID" />
          <TextField source="cameraId" label="Camera ID" />
          <TextField source="snapTimestamp" label="Snapshot Timestamp" />
          <FunctionField
            source="plate_number_link"
            label="Plate Number Image"
            render={(record) => (
              <a
                href={imgURL + `${record.camera_id}/raw/${record.image_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                click to view
              </a>
            )}
          />
          <FunctionField
            source="vehicle_link"
            label="Vehicle Image"
            render={(record) => (
              <a
                href={imgURL + `${record.camera_id}/lp/${record.image_id}`}
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
