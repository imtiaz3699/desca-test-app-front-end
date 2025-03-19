import React, { useState } from "react";
import { Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { LiaEditSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { GrUserManager } from "react-icons/gr";
import { FcManager } from "react-icons/fc";

const UserManagement = ({
  data,
  handleUpdate,
  handleDelete,
  user,
  handleSelectUser,
}) => {
  const [open, setOpen] = useState(null);
  const confirm = async (e) => {
    const res = await handleDelete(e);
    if (res?.status === 200) {
      toast.success("User deleted successfully.");
      setOpen(null);
    }
  };
  const cancel = (e) => {
    console.log(e);
    setOpen(null);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  if (user.role === "admin") {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle " className="flex items-center gap-2">
          {record?.role === "user" && (
            <div className="cursor-pointer">
              {record?.manager?._id ? (
                <Tooltip placement="topLeft" title={record?.manager?.name}>
                  <FcManager className="text-[20px]" />
                </Tooltip>
              ) : (
                <GrUserManager
                  onClick={() => handleSelectUser(record?.key)}
                  className="text-[20px]"
                />
              )}
            </div>
          )}
          <div className="cursor-pointer" onClick={() => handleUpdate(record)}>
            <LiaEditSolid className="text-[24px]" />
          </div>

          <div className="cursor-pointer">
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => confirm(record?.key)}
              onCancel={cancel}
              open={open === record?.key}
              onOpenChange={() => setOpen(record?.key)}
              okText="Yes"
              cancelText="No"
            >
              <MdOutlineDelete
                className="text-[24px]"
                onClick={() => setOpen(record?.key)}
              />
            </Popconfirm>
          </div>
        </Space>
      ),
    });
  }
  return <Table columns={columns} dataSource={data} />;
};
export default UserManagement;
