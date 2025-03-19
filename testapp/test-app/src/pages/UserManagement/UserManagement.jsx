import { useEffect, useState } from "react";
import React from "react";
import { useApi } from "../../context/apiFuncContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import UserManagementTable from "../../Tables/UserManagementTable/UserManagementTable";
import { Modal } from "antd";
import AddUpdateUser from "../../components/AddUpdateUser/AddUpdateUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

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
  const { getRequest, postRequest, putRequest, deleteRequest } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const fetchLists = async () => {
    try {
      const response = await getRequest("/api/admin/get-user");
      if (response?.status === 200) {
        setData(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchLists();
  }, []);
  console.log(data, "sfasdfda");
  const usbData =
    data?.length > 0 &&
    data?.map((element, idx) => ({
      key: element?._id,
      name: element?.name,
      email: element?.email,
      role: element?.role,
    }));
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
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
    console.log(id, "fasdlfjskda");
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
  return (
    <div className="flex flex-col px-5 w-full">
      <PageHeader
        heading={"User Management"}
        btnText="Add User"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <div className="mt-10">
        <UserManagementTable
          data={usbData}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
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
    </div>
  );
}

export default UserManagement;
