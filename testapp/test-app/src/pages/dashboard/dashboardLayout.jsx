import { Outlet, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex w-full">
      <Sidebar/>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
