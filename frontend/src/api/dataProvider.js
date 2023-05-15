import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:5000";
const httpClient = fetchUtils.fetchJson;

// set image file server
const REACT_APP_BACKEND_FILE_SERVER =
  process.env.REACT_APP_BACKEND_FILE_SERVER || "http://172.17.0.143:6060/";
console.log("REACT_APP_BACKEND_FILE_SERVER", REACT_APP_BACKEND_FILE_SERVER);

// set image path
const licensePlateImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}licenseplate/`;
const vehicleImgUrl = `${REACT_APP_BACKEND_FILE_SERVER}screenshot/`;

export const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter, // Include filter parameters in the query
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    console.log("URL", url);

    try {
      const { json } = await httpClient(url);
      const data = json.ctx.history.map((item) => ({
        id: item.id,
        event: item.event,
        image_savename: item.image_savename,
        plate_number: item.plate_number,
        time: item.time,
        plate_number_link: licensePlateImgUrl + item.image_savename,
        vehicle_link: vehicleImgUrl + item.image_savename,
      }));
      return { data, total: data.length };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching data");
    }
  },
  getOne: async (resource, params) => {
    const { id } = params;
    const url = `${apiUrl}/${resource}/${id}`;
    const { json } = await httpClient(url);
    const data = {
      id: json.ctx.id,
      event: json.ctx.event,
      image_savename: json.ctx.image_savename,
      plate_number: json.ctx.plate_number,
      time: json.ctx.time,
      plate_number_link: `${licensePlateImgUrl}${json.ctx.image_savename}`,
      vehicle_link: `${vehicleImgUrl}${json.ctx.image_savename}`,
    };
    return { data };
  },
  getMany: async (resource, params) => {
    const { event } = params.filter; // Extract the selected event from the filter object
    const url = `${apiUrl}/${resource}?${stringify({
      event, // Pass the selected event as a query parameter
    })}`;
    const { json } = await httpClient(url);
    const data = json.ctx.history.map((item) => ({
      id: item.id,
      event: item.event,
      image_savename: item.image_savename,
      plate_number: item.plate_number,
      time: item.time,
      plate_number_link: `${licensePlateImgUrl}${item.image_savename}`,
      vehicle_link: `${vehicleImgUrl}${item.image_savename}`,
    }));
    return { data };
  },
};
