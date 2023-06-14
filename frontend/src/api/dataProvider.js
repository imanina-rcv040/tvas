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
    console.log("(getList) query", query);
    //construct query string
    let queryString = ""; // initialize empty string
    queryString = "?" + new URLSearchParams(query).toString(); // appends query string
    console.log("queryString", queryString); // using URLSearchParams example - "name=John&age=30&city=New%20York"
    const apiURL = `${backendServerURL}/${resource}/${queryString}`; // complete URL for API from concatenation
    console.log("API URL:", apiURL);

    try {
      console.log("getList: trying..");
      const { json } = await httpClient(apiURL); // sends HTTP GET request to API URL using httpClient func & awaits the response // response data = { json }

      // mapping and extracting relevant data properties
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
      console.log("getList: trying executed");
      console.log("Fetched raw json object:", json);
      console.log("Data (items from JSON object):", data);
      console.log("Total data per page:", data.length);
      console.log("Total data:", json.total);
      return { data, total: json.total };
    } catch (error) {
      console.error("getList: error catched", error);
      throw new Error("getList: Error fetching data");
    }
  },

  //implement getMany method: fetch data from backend server
  getMany: async (resource, params) => {
    console.log("This is getMany method");
    console.log("(getMany) resource:", resource);
    console.log("(getMany) params:", params);

    try {
      console.log("getMany: trying..");
      const { ids } = params;
      console.log("ids", ids);
      const apiURL2 = `${backendServerURL}/${resource}?type-event=${ids.join(
        ","
      )}`; // API request
      console.log("apiurl2", apiURL2);
      const { json } = await httpClient(apiURL2);
      console.log("json2", json);

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
      console.log("getMany: trying executed");

      return { data };
    } catch (error) {
      console.error("getMany: error catched", error);
      throw new Error("getMany: Error fetching data");
    }
  },
};
