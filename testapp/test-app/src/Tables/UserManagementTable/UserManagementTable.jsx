import React from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
        {console.log(record,'faldsfhlaskdj')}
          <div onClick={()=> handleUpdate(record?.key)}>Edit</div>
          <a>Delete</a>
          <a>View</a>
        </Space>
      ),
    },
  ];
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       email: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sydney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];
const UserManagement = ({data}) => (
<Table columns={columns} dataSource={data} />
);
export default UserManagement;