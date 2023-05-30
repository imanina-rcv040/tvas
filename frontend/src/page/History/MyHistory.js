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
  process.env.REACT_APP_BACKEND_FILE_SERVER || "172.17.0.143:20004";
console.log("REACT_APP_BACKEND_FILE_SERVER", REACT_APP_BACKEND_FILE_SERVER);

// set image path
const imgUrl = `http://${REACT_APP_BACKEND_FILE_SERVER}/evidence/`;

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
          <TextField source="event" label="Event Type" />
          <TextField source="plate_number" label="License Plate Number" />
          <TextField source="time" label="Engine TImestamp" />
          <TextField source="image_id" label="Image ID" />
          <TextField source="camera_id" label="Camera ID" />
          <TextField source="snap_timestamp" label="Snapshot Timestamp" />
          <FunctionField
            source="plate_number_link"
            label="Plate Number Image"
            render={(record) => (
              <a
                href={imgUrl + `${record.camera_id}/raw/${record.image_id}`}
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
                href={imgUrl + `${record.camera_id}/lp/${record.image_id}`}
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
