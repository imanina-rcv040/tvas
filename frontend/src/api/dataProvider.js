// import libraries
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "172.17.0.143:20001";
console.log("REACT_APP_BACKEND_TVAS_SERVER:", REACT_APP_BACKEND_TVAS_SERVER);

const API_URL = `http://${REACT_APP_BACKEND_TVAS_SERVER}`;
console.log("API_URL", API_URL);

const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter, // Include filter parameters in the query
    };
    const url = `${API_URL}/${resource}`;
    console.log("URL", url);

    try {
      const { json } = await httpClient(url);
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
  getOne: async (resource, params) => {
    const { id } = params;
    const url = `${API_URL}/${resource}/${id}`;
    const { json } = await httpClient(url);
    const data = {
      id: json.ctx.id,
      event: json.ctx.event,
      image_savename: json.ctx.image_savename,
      plate_number: json.ctx.plate_number,
      time: json.ctx.time,
    };
    return { data };
  },
  getMany: async (resource, params) => {
    const { event } = params.filter; // Extract the selected event from the filter object
    const url = `${API_URL}/${resource}?${stringify({
      event, // Pass the selected event as a query parameter
    })}`;
    const { json } = await httpClient(url);
    const data = json.ctx.history.map((item) => ({
      id: item.id,
      event: item.event,
      image_savename: item.image_savename,
      plate_number: item.plate_number,
      time: item.time,
    }));
    return { data };
  },
};
