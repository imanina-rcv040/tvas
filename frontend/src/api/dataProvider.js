// import libraries
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

let backendServerURL = REACT_APP_BACKEND_TVAS_SERVER;
console.log("API URL:", backendServerURL);

const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter, // Include filter parameters in the query
    };
    const apiURL = `${backendServerURL}/${resource}`;
    console.log("URL", apiURL);

    try {
      const { json } = await httpClient(apiURL);
      const data = json.items.map((item) => ({
        id: item.eventId,
        event: item.typeEvent,
        plate_number: item.licensePlateNo,
        time: item.engineTimestamp,
        image_id: item.imageId,
        image_savename: item.image_savename,
        vehicle_xmin: item.vehBboxXmin,
        vehicle_ymin: item.vehBboxYmin,
        vehicle_xmax: item.vehBboxXmax,
        vehicle_ymax: item.vehBboxYmax,
        lp_xmin: item.lpBboxXmin,
        lp_ymin: item.lpBboxYmin,
        lp_xmax: item.lpBboxXmax,
        lp_ymax: item.lpBboxYmax,
        camera_id: item.cameraId,
        snap_timestamp: item.snapTimestamp,
      }));
      return { data, total: data.length };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching data");
    }
  },

  getMany: async (resource, params) => {
    const { event } = params.filter; // Extract the selected event from the filter object
    const apiURL = `${backendServerURL}/${resource}?${stringify({
      event, // Pass the selected event as a query parameter
    })}`;
    const { json } = await httpClient(apiURL);
    const data = json.items.map((item) => ({
      id: item.eventId,
      event: item.typeEvent,
      plate_number: item.licensePlateNo,
      time: item.engineTimestamp,
      image_id: item.imageId,
      image_savename: item.image_savename,
      vehicle_xmin: item.vehBboxXmin,
      vehicle_ymin: item.vehBboxYmin,
      vehicle_xmax: item.vehBboxXmax,
      vehicle_ymax: item.vehBboxYmax,
      lp_xmin: item.lpBboxXmin,
      lp_ymin: item.lpBboxYmin,
      lp_xmax: item.lpBboxXmax,
      lp_ymax: item.lpBboxYmax,
      camera_id: item.cameraId,
      snap_timestamp: item.snapTimestamp,
    }));
    return { data };
  },
};
