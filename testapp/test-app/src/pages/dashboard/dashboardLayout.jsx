import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
const DashboardLayout = () => {
  return (
    <>
      <div className="flex flex-row items-start  h-screen">
        <Sidebar />
        <div className="flex flex-col items-start w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
