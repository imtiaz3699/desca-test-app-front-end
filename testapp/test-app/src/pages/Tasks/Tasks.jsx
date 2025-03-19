import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Modal } from "antd";
import AddUpdateTask from "../../components/AddUpdateTask/AddUpdateTask";
import { useFormik } from "formik";
import { useApi } from "../../context/apiFuncContext";
import { useUser } from "../../context/userContext";
import TaskManagementTable from "../../Tables/TaskManagementTable/TaskManagementTable";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import TaskFilters from "../../components/TaskFilters/TaskFilters";
function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const { getRequest, postRequest, deleteRequest, putRequest } = useApi();
  const fetchLists = async () => {
    try {
      const res = await getRequest(
        `/api/task/get-tasks?status=${status}&startDate=${dates?.startDate}&endDate=${dates?.endDate}`
      );
      if (res?.status === 200) {
        setData(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(dueDate[0], "afhsldkjfhalsdhfalj");
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      createdBy: user?._id,
      due_date: dayjs(new Date()),
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (userId?.key) {
          const res = await putRequest(
            `/api/task/update-task/${userId?.key}`,
            values,
            true
          );
          if (res?.status === 200) {
            toast.success("Task Updated Successfully");
            fetchLists();
            setIsModalOpen(false);
            resetForm();
            setUserId("");
          }
        } else {
          const res = await postRequest("/api/task/add-task", values, true);
          if (res?.status === 200) {
            toast.success("Task Added Successfully");
            fetchLists();
            setIsModalOpen(false);
            resetForm();
            setUserId("");
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    fetchLists();
  }, [status, dates]);

  const usbData =
    data?.length > 0 &&
    data?.map((element, idx) => ({
      key: element?._id,
      title: element?.title,
      description: element?.description,
      status: element?.status,
      due_date: element?.due_date
        ? dayjs(element?.due_date)
        : dayjs(new Date()),
      createdBy: element?.createdBy ? element?.createdBy?.name : "---",
    }));
  const handleDelete = async (id) => {
    try {
      const res = await deleteRequest(`/api/task/delete-tasks/${id}`, true);
      if (res?.status === 200) {
        fetchLists();
        setUserId("");
      }
      return res;
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  const handleUpdate = async (id) => {
    setUserId(id);
    setIsModalOpen(true);
    formik.setFieldValue("title", id?.title);
    formik.setFieldValue("description", id?.description);
    formik.setFieldValue("status", id?.status);
    console.log(id, "fadlfajsdlfhasdkl");
    formik.setFieldValue(
      "due_date",
      id?.due_date ? dayjs(id?.due_date) : dayjs(new Date())
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
    setUserId("");
  };
  console.log(status, dueDate, "fasdlfjashdlkfj");
  return (
    <div className="flex flex-col px-5 w-full">
      <PageHeader
        heading={"Task Management"}
        btnText={"Add Task"}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        user={user}
        task={true}
      />
      <div className="mt-10 w-full flex flex-col gap-10">
        <div className="w-full flex items-start">
          <TaskFilters
            status={status}
            setStatus={setStatus}
            dueDate={dueDate}
            setDueDate={setDueDate}
            setDates={setDates}
          />
        </div>
        <TaskManagementTable
          handleUpdate={handleUpdate}
          data={usbData}
          handleDelete={handleDelete}
          user={user}
        />
      </div>
      <Modal
        centered
        onClose={handleCancel}
        footer={null}
        title="Add Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <AddUpdateTask formik={formik} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}

export default Tasks;
