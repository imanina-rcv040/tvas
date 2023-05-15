// import components
import { MyDashboardTitle } from "./DashboardTitle";
import { MyTodayViolationCount } from "./TodayViolationCount/TodayViolationCount";
import { TodayLatestViolation } from "./TodayLatestViolation/TodayLatestViolation";
import { MonthlyComparisonViolation } from "./MonthlyComparisonViolation/MonthlyComparisonViolation";
import { TodayTrafficViolationTrend } from "./TodayTrafficViolationTrend/TodayTrafficViolationTrend";
import { TodayViolationTypeReport } from "./TodayViolationTypeReport/TodayViolationTypeReport";
import { MonthlyRegionViolation } from "./MonthlyRegionViolation/MonthlyRegionViolation";

// import styling
import "./Dashboard.css";

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
