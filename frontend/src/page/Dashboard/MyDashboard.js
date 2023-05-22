// import components
import { MyDashboardTitle } from "./component/MyPageHeader";
import { MyTodayViolationCount } from "./component/chart/MyViolationCount";
import { TodayLatestViolation } from "./component/chart/MyLatestViolation";
import { MonthlyComparisonViolation } from "./component/chart/MyMonthlyComparison";
import { TodayTrafficViolationTrend } from "./component/chart/MyTrafficViolationTrend";
import { TodayViolationTypeReport } from "./component/chart/TodayViolationTypeReport";
import { MonthlyRegionViolation } from "./component/chart/MyMonthlyRegion";

// import styling
import "./MyDashboard.css";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: {
    flex: 1,
    marginRight: "0.5em",
  },
  rightCol: {
    flex: 1,
    marginLeft: "0.5em",
    height: "10em",
  },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

export const MyDashboard = () => {

  return (
    <>
      <MyDashboardTitle />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.singleCol}>
            <MyTodayViolationCount />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <TodayLatestViolation />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MonthlyComparisonViolation />
          </div>
        </div>
      </div>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.singleCol}>
            <TodayTrafficViolationTrend />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <TodayViolationTypeReport />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MonthlyRegionViolation />
          </div>
        </div>
      </div>
    </>
  );
};
