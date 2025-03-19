import React from "react";
import Input from "../Input/Input";
import { Button, Select } from "antd";
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
function AddUpdateTask({ formik, handleCancel }) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue("status", value);
  };
  const onChange = (date, dateString) => {
    console.log(date,'ladksjfhalsdkjhfashdkjf');
    formik.setFieldValue("due_date", date);
  };
  console.log(formik.values,';fa lfadsflkakdj')
  return (
    <div>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-row items-center gap-5">
            <Input
              value={formik.values.title}
              name="title"
              onChange={formik.handleChange}
              label="Title"
              error={formik.touched.title && formik.errors.title}
            />
            <Input
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              label="description"
              error={formik.touched.description && formik.errors.description}
            />
          </div>
          <div className = 'flex flex-row items-center justify-between gap-5 w-full '>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-2">
              <label
                for="password"
                className="block mb-2 text-sm/6 font-medium text-gray-900"
              >
                Status
              </label>
              <Select
                defaultValue="pending"
                className="!w-full"
                name="status"
                value={formik.values.status}
                style={{ width: "100%", height: "35px" }}
                onChange={handleChange}
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "in-progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                ]}
              />
            </div>
            <p>{formik.touched.role && formik.errors.role}</p>
          </div>
          <div className = 'w-full flex flex-col items-start '>
          <label className = 'block mb-2 text-sm/6 font-medium text-gray-900'>Due Date</label>
          <DatePicker value={formik.values.due_date} onChange={onChange} className = 'w-full h-[35px]'/>
          </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button
            onClick={handleCancel}
            htmlType="button"
            variant="solid"
            color="red"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddUpdateTask;
