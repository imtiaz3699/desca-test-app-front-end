import { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { MdOutlineLogout } from "react-icons/md";
import { useUser } from "../../context/userContext";
import { Link, useLocation } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useUser();
  const { user } = useUser();
  const location = useLocation();
  const menuKeyMap = {
    "/dashboard": "1",
    "/dashboard/tasks": "2",
    "/dashboard/manager/tasks": "3",
  };
  return (
    <div className="h-screen">
      <div
        className={`bg-[#001529] text-white h-screen flex flex-col justify-between p-4 ${
          collapsed ? "w-16" : "w-60"
        } duration-300`}
      >
        <Menu
          selectedKeys={[menuKeyMap[location.pathname] || ""]}
          theme="dark"
          mode="inline"
          inlineCollapsed={collapsed}
          className="bg-gray-900 text-white border-none"
        >
          {user.role !== "user" && (
            <Menu.Item key="1" icon={<FaTasks />}>
              <Link to="/dashboard">User</Link>
            </Menu.Item>
          )}
          <Menu.Item key="2" icon={<HomeOutlined />}>
            <Link to="/dashboard/tasks">
              {user.role === "manager" ? `Users Task` : "Tasks"}
            </Link>
          </Menu.Item>
          {user.role === "manager" && (
            <Menu.Item key="3" icon={<HomeOutlined />}>
              <Link to="/dashboard/manager/tasks">Task</Link>
            </Menu.Item>
          )}
        </Menu>
        <div
          onClick={logout}
          className="flex items-center gap-2 justify-center w-full group cursor-pointer"
        >
          <p className="text-[16px] font-bold group-hover:text-blue-500 ">
            Logout
          </p>
          <MdOutlineLogout className="text-[20px] font-bold group-hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
