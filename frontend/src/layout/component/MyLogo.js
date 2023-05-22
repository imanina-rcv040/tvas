import logo from "../asset/recocloud.png";
import "../MyLayout.css";

export const MyLogo = ({ width, height }) => {
  return <img src={logo} alt="Logo" style={{ width, height }} />;
};
