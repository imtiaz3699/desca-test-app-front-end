import React, { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

const Navbar = () => {
  const {logout} = useUser();
  const items = [
    { key: "1", label: <Link to="/dashboard">Home</Link> },
    { key: "2", label: <Link to="/task-management">Task</Link> },
  ];
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-indigo-600">MyApp</div>
        <div className="">
          <Menu mode="horizontal" items={items} className="border-none" />
        </div>
        <div onClick={logout}  className="hidden md:block">
          <Button type="primary">Logout</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
