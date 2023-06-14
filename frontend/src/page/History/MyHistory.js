// import libraries
import { useState, useEffect } from "react";
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

// import styling
import "./MyHistory.css";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set image file server
const REACT_APP_BACKEND_FILE_SERVER =
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:20004";

//set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}`;

// set image path
const imgURL = `${REACT_APP_BACKEND_FILE_SERVER}/evidence/`;

const HistoryFilters = (props) => {
  const [eventSelection, setEventSelection] = useState([]);
  const [cameraSelection, setCameraSelection] = useState([]);

  useEffect(() => {
    // Fetch event types from the API
    const fetchEvents = async () => {
      try {
        const apiURL = `${backendServerURL}/history/type-event`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          setEventSelection(responseData);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error fetch event type:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Fetch event types from the API
    const fetchCameras = async () => {
      try {
        const apiURL = `${backendServerURL}/history/camera`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          setCameraSelection(responseData);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error fetch camera for filter selection:", error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
      <ReferenceInput source="typeEvent" reference="history" label="Event">
        <SelectInput
          source="typeEvent"
          label="Event Type"
          choices={eventSelection.map((eventType) => ({
            id: eventType.id,
            name: eventType.name,
          }))}
        />
      </ReferenceInput>
      <ReferenceInput source="cameraId" label="Camera" reference="history">
        <SelectInput
          source="cameraId"
          label="Camera ID"
          choices={cameraSelection.map((camera) => ({
            id: camera.id,
            name: camera.name,
          }))}
        />
      </ReferenceInput>
      <DateInput source="snapTimestamp_start" label="Start Date" />
      <DateInput source="snapTimestamp_end" label="End Date" />
    </Filter>
  );
};

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
            label="Entrance Evidence"
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
            label="Exit Evidence"
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
