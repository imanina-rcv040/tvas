// import libraries
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

const backendServerURL = REACT_APP_BACKEND_TVAS_SERVER;
console.log("backendServerURL:", backendServerURL);

const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  getList: async (resource, params) => {
    console.log("getlist");
    console.log("resource", resource);
    console.log("params", params);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter, // Include filter parameters in the query
      page: page,
      perPage: perPage,
      field: field,
      order: order,
    };
    console.log("query", query);
    let queryString = "";
    // if (Object.keys(query).length) {
    queryString = "?" + new URLSearchParams(query).toString();
    // }
    console.log("queryString", queryString);
    const apiURL = `${backendServerURL}/${resource}/${queryString}`;
    console.log("API URL:", apiURL);

    try {
      console.log("try first");
      const { json } = await httpClient(apiURL);
      const data = json.items.map((item) => ({
        id: item.eventId,
        typeEvent: item.typeEvent,
        licensePlateNo: item.licensePlateNo,
        engineTimestamp: item.engineTimestamp,
        imageId: item.imageId,
        vehBboxXmin: item.vehBboxXmin,
        vehBboxYmin: item.vehBboxYmin,
        vehBboxXmax: item.vehBboxXmax,
        vehBboxYmax: item.vehBboxYmax,
        lpBboxXmin: item.lpBboxXmin,
        lpBboxYmin: item.lpBboxYmin,
        lpBboxXmax: item.lpBboxXmax,
        lpBboxYmax: item.lpBboxYmax,
        cameraId: item.cameraId,
        snapTimestamp: item.snapTimestamp,
      }));
      console.log("try finish");
      console.log("raw json data:", json);
      console.log("total data per page=", data.length);
      console.log("total data:", json.total);

      return { data, total: data.length };
    } catch (error) {
      console.error("Error catched!", error);
      throw new Error("Error fetching data");
    }
  },

  getMany: async (resource, params) => {
    console.log("getMany");
    console.log("resource (getMany)", resource);
    console.log("params (getMany)", params);
    const apiURL2 = `${backendServerURL}/${resource}`;

    try {
      console.log("try first at many");
      const { json } = await httpClient(apiURL2);
      const data = json.items.map((item) => ({
        id: item.eventId,
        typeEvent: item.typeEvent,
        licensePlateNo: item.licensePlateNo,
        engineTimestamp: item.engineTimestamp,
        imageId: item.imageId,
        vehBboxXmin: item.vehBboxXmin,
        vehBboxYmin: item.vehBboxYmin,
        vehBboxXmax: item.vehBboxXmax,
        vehBboxYmax: item.vehBboxYmax,
        lpBboxXmin: item.lpBboxXmin,
        lpBboxYmin: item.lpBboxYmin,
        lpBboxXmax: item.lpBboxXmax,
        lpBboxYmax: item.lpBboxYmax,
        cameraId: item.cameraId,
        snapTimestamp: item.snapTimestamp,
      }));
      console.log("try finish at (getMany)");

      return { data };
    } catch (error) {
      console.error("Error catched at (getMany)!", error);
      throw new Error("Error fetching data at MANY");
    }
  },
};
