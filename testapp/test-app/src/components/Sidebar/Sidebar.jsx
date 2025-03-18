import { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { MdOutlineLogout } from "react-icons/md";
import { useUser } from "../../context/userContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {logout} = useUser();
  return (
    <div className="h-screen">
      <div
        className={`bg-gray-900 text-white h-screen flex flex-col justify-between p-4 ${
          collapsed ? "w-16" : "w-60"
        } duration-300`}
      >
        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={collapsed}
          className="bg-transparent text-white border-none"
        >
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
