import { Outlet, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Layout } from "antd";
const { Header,Content } = Layout;
const DashboardLayout = () => {
  return (
    <>
    <div className = 'flex flex-row items-start gap-5 h-screen'>
    <Sidebar />
    <div className = 'flex flex-col items-start'>
    <div>I am navbar</div>
    <Outlet />
    </div>
    </div>
    </>
  );
};

export default DashboardLayout;
