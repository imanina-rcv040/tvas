// import libraries
import { fetchUtils } from "react-admin"; // to handle HTTP requests in react-admin

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001"; // use environment variable or use default URL for backend server

const backendServerURL = REACT_APP_BACKEND_TVAS_SERVER; // a tool for assigning or debugging purpose
console.log("backendServerURL:", backendServerURL);

const httpClient = fetchUtils.fetchJson; // fetchJson function is used to make HTTP requests and returns a promise that resolves to the JSON response

// define and export dataProvider object for data retrieval
export const dataProvider = {
  //implement getList method: fetch data from backend server
  getList: async (resource, params) => {
    console.log("This is getList method");
    console.log("(getList) resource:", resource); // representing resource name. e.g; history
    console.log("(getList) params:", params); // containing pagination, sorting, & filtering info
    const { page, perPage } = params.pagination; // extract pagination
    const { field, order } = params.sort; // extract sorting

    //construct query obj
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

      return { data, total: json.total };
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
