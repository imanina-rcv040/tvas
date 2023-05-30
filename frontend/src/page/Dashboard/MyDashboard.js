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
            <MyViolationCount />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MyLatestViolation />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MyMonthlyComparison />
          </div>
        </div>
      </div>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.singleCol}>
            <MyTrafficViolationTrend />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MyTodayViolationTypeReport />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MyMonthlyRegion />
          </div>
        </div>
      </div>
    </>
  );
};
