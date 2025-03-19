import { useEffect, useState } from "react";
import React from "react";
import { useApi } from "../../context/apiFuncContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import UserManagementTable from "../../Tables/UserManagementTable/UserManagementTable";
import { Button, Modal, Select } from "antd";
import AddUpdateUser from "../../components/AddUpdateUser/AddUpdateUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Name is required"),
  role: Yup.string().required("Role is required"),
});
function UserManagement() {
  const [data, setData] = useState([]);
  const { user } = useUser();
  const { getRequest, postRequest, putRequest, deleteRequest } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [managers, setManagers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedManager,setSelectedManager] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const fetchLists = async () => {
    try {
      const response = await getRequest("/api/admin/get-user");
      if (response?.status === 200) {
        setData(response?.data);
        const mang = response?.data
          ?.filter((element) => element?.role === "manager") // ✅ Remove non-managers first
          ?.map((element) => ({
            value: element?._id,
            label: element?.name,
          }));
        setManagers(mang);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchLists();
  }, []);
  const usbData =
    data?.length > 0 &&
    data?.map((element, idx) => ({
      key: element?._id,
      name: element?.name,
      email: element?.email,
      role: element?.role,
      manager: element?.managerId ? element?.managerId : "",
    }));
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      createdBy: user?._id,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (userId?.key) {
          const res = await putRequest(
            `/api/admin/edit-user/${userId?.key}`,
            values,
            true
          );
          if (res && res?.status === 200) {
            toast.success("User Updated Successfully");
            fetchLists();
            setIsModalOpen(false);
            formik.resetForm();
          }
        } else {
          const res = await postRequest("/api/admin/add-user", values, true);
          if (res && res?.status === 200) {
            toast.success("User Added Successfully");
            fetchLists();
            setIsModalOpen(false);
            formik.resetForm();
          }
        }
      } catch (error) {
        console.log(error?.response?.data?.message, "fasdlfjskda");
        toast.error(error?.response?.data?.message);
      }
    },
  });
  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
    setUserId("");
  };
  const handleUpdate = (id) => {
    setUserId(id);
    setIsModalOpen(true);
    formik.setFieldValue("name", id?.name);
    formik.setFieldValue("email", id?.email);
    formik.setFieldValue("role", id?.role);
  };
  const handleDelete = async (id) => {
    try {
      const res = await deleteRequest(`/api/admin/delete-user/${id}`);
      if (res && res?.status === 200) {
        toast.success("User Deleted Successfully");
        fetchLists();
      }
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const handleAssignManager = async (obj) => {
    try {
      const res = await postRequest(`/api/admin/assign-manager`, obj, true);
      if(res?.status === 200) {
        fetchLists();
        setModalOpen(false);
        setSelectedUser('');
        setSelectedManager('');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (id) => {
    setSelectedManager(id);
  }
  const handleSelectUser = (id) => {
    if(id) {
      setModalOpen(true);
      setSelectedUser(id);
    }
  }
  
  console.log(data,'alsdkjhflasdhflaksdj')
  console.log(managers, "fasdlkfjahdslkfhasldManagers");
  return (
    <div className="flex flex-col px-5 w-full">
      <PageHeader
        heading={"User Management"}
        btnText="Add User"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        user={user}
      />
      <div className="mt-10">
        <UserManagementTable
          data={usbData}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          user={user}
          handleSelectUser={handleSelectUser}
        />
      </div>

      <Modal
        centered
        footer={null}
        title="Add User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddUpdateUser formik={formik} handleCancel={handleCancel} />
      </Modal>
      <Modal
        centered
        footer={null}
        title="Assign Manager"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
      >
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2">
            <label
              for="password"
              className="block mb-2 text-sm/6 font-medium text-gray-900"
            >
              Managers
            </label>
            <Select
              defaultValue="pending"
              className="!w-full"
              name="status"
              value={selectedManager  || ""}
              style={{ width: "100%", height: "35px" }}
              onChange={handleChange}
              options={managers}
            />
          </div>
          <div className = 'flex flex-row items-end justify-end w-full gap-5 mt-4'>
            <Button
            onClick={()=> handleAssignManager({userId: selectedUser, managerId: selectedManager})}
            type="primary"
            >Submit</Button>
            <Button color = "red" variant="outlined" onClick={() => setModalOpen(false)} >Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserManagement;
