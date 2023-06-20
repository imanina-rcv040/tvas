// import components
import { MyDashboardTitle } from "./component/MyPageHeader";
import { MyViolationCount } from "./component/chart/MyViolationCount";
import { MyLatestViolation } from "./component/chart/MyLatestViolation";
import { MyMonthlyComparison } from "./component/chart/MyMonthlyComparison";
import { MyTrafficViolationTrend } from "./component/chart/MyTrafficViolationTrend";
import { MyTodayViolationTypeReport } from "./component/chart/MyTodayViolationTypeReport";
import { MyTop5Camera } from "./component/chart/MyTop5Camera";

// import styling
import "./MyDashboard.css";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set backend config server
const REACT_APP_BACKEND_CONFIG_SERVER =
  process.env.REACT_APP_BACKEND_CONFIG_SERVER || "http://172.17.0.143:20005";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary`;
console.log("backendServerURL", backendServerURL);

// set config path
const username = localStorage.getItem("username");
const configServerURL = `${REACT_APP_BACKEND_CONFIG_SERVER}/user/${username}`;
console.log("configServerURL", configServerURL);

export const MyDashboard = () => {
  return (
    <>
      <MyDashboardTitle />
      <div className="flex">
        <div className="leftCol">
          <div className="singleCol">
            <MyViolationCount />
          </div>
        </div>
        <div className="rightCol">
          <div className="singleCol">
            <MyLatestViolation />
          </div>
        </div>
        <div className="rightCol">
          <div className="singleCol">
            <MyMonthlyComparison
              backEndPath={backendServerURL}
              configPath={configServerURL}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="leftCol">
          <div className="singleCol">
            <MyTrafficViolationTrend />
          </div>
        </div>
        <div className="rightCol">
          <div className="singleCol">
            <MyTodayViolationTypeReport />
          </div>
        </div>
        <div className="rightCol">
          <div className="singleCol">
          <MyTop5Camera />
          </div>
        </div>
      </div>
    </>
  );
};
