import { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { MdOutlineLogout } from "react-icons/md";
import { useUser } from "../../context/userContext";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {logout} = useUser();
  const location = useLocation();
  const menuKeyMap = {
    "/dashboard": "1",
    "/profile": "2",
    "/settings": "3",
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
          theme="dark" mode="inline" inlineCollapsed={collapsed} className="bg-gray-900 text-white border-none">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
        <div onClick={logout} className="flex items-center gap-2 justify-center w-full group cursor-pointer">
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
