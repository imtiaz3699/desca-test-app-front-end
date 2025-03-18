import React, { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const items = [
    { key: "1", label: <Link to="/">Home</Link> },
    { key: "2", label: <Link to="/about">About</Link> },
    { key: "3", label: <Link to="/services">Services</Link> },
    { key: "4", label: <Link to="/contact">Contact</Link> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-indigo-600">MyApp</div>
        <div className="hidden md:flex">
          <Menu mode="horizontal" items={items} className="border-none" />
        </div>
        <div className="hidden md:block">
          <Button type="primary">Login</Button>
        </div>

        <div className="md:hidden">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
        </div>
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Menu mode="vertical" items={items} />
          <Button type="primary" block className="mt-4">
            Login
          </Button>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
