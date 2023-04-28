import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  TextInput,
  Filter,
} from "react-admin";

// set image file server
const REACT_APP_BACKEND_FILE_SERVER =
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:6060/";
console.log("REACT_APP_BACKEND_FILE_SERVER", REACT_APP_BACKEND_FILE_SERVER);

// set image path
const licensePlateImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}licenseplate/`;
const vehicleImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}screenshot/`;

const HistoryFilter = (props) => (
  <Filter {...props}>
    <TextInput source="q" label="Search" alwaysOn />
  </Filter>
);

export const HistoryList = (props) => (
  <List {...props} filters={<HistoryFilter />}>
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
);
