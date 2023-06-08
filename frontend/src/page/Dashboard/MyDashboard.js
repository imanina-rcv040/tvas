// import components
import { MyDashboardTitle } from "./component/MyPageHeader";
import { MyViolationCount } from "./component/chart/MyViolationCount";
import { MyLatestViolation } from "./component/chart/MyLatestViolation";
import { MyMonthlyComparison } from "./component/chart/MyMonthlyComparison";
import { MyTrafficViolationTrend } from "./component/chart/MyTrafficViolationTrend";
import { MyTodayViolationTypeReport } from "./component/chart/MyTodayViolationTypeReport";
import { MyMonthlyRegion } from "./component/chart/MyMonthlyRegion";

// import styling
import "./MyDashboard.css";

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
            <MyMonthlyComparison />
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
            <MyMonthlyRegion />
          </div>
        </div>
      </div>
    </>
  );
};
