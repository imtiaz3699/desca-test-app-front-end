import React, { useState } from "react";
import { Table, Popconfirm, Space } from "antd";
import { LiaEditSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";

function TaskManagementTable({ data, handleUpdate, handleDelete,user }) {
  const [open, setOpen] = useState(null);
  const confirm = async (e) => {
    const res = await handleDelete(e);
    if (res?.status === 200) {
      toast.success("Task deleted successfully.");
      setOpen(null);
    }
  };
  const cancel = (e) => {
    console.log(e);
    setOpen(null);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
    },
  ];
  const obj = {
    title: "Created By",
    dataIndex: "createdBy",
    key: "status",
  }
  const index = columns?.length -1;
  if(user?.role === 'admin' || user?.role === 'manager') {
    columns.splice(index,0,obj)
  }
  
  return <Table columns={columns} dataSource={data} />;
}

export default TaskManagementTable;
