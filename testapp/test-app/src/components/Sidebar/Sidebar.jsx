import { useState } from "react";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-900 text-white p-4 ${
          collapsed ? "w-16" : "w-60"
        } duration-300`}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 text-white"
        />

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
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content</h1>
      </div>
    </div>
  );
};

export default Sidebar;
