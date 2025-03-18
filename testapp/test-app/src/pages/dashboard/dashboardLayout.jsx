import { Outlet, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
const { Header,Content } = Layout;
const DashboardLayout = () => {
  return (
    <>
    <div className = 'flex flex-row items-start  h-screen'>
    <Sidebar />
    <div className = 'flex flex-col items-start w-full'>
    <Navbar/>
    <Outlet />
    </div>
    </div>
    </>
  );
};

export default DashboardLayout;
