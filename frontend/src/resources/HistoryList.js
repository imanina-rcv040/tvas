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
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:6060/";
console.log("REACT_APP_BACKEND_FILE_SERVER", REACT_APP_BACKEND_FILE_SERVER);

// set image path
const licensePlateImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}licenseplate/`;
const vehicleImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}screenshot/`;

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

export const HistoryList = (props) => {
  const [open, setOpen] = useState(false); // Initialize open state as false
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <List {...props} filters={<HistoryFilters />}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="time" />
          <TextField source="plate_number" label="Plate Number" />
          <FunctionField
            source="image_savename"
            label="Plate Number Image"
            render={(record) => (
              <a
                href={licensePlateImgUrl + record.image_savename}
                target="_blank"
                rel="noopener noreferrer"
              >
                click to view
              </a>
            )}
          />
          <FunctionField
            source="image_savename"
            label="Vehicle Image"
            render={(record) => (
              <a
                href={vehicleImgUrl + record.image_savename}
                target="_blank"
                rel="noopener noreferrer"
              >
                click to view
              </a>
            )}
          />
          <TextField source="event" label="Violation Event" />
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
