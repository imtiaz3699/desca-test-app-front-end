import React from "react";
import Input from "../Input/Input";
import { Button, Select } from "antd";
function AddUpdateUser({ formik,handleCancel }) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue("role", value);
  };
  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 mb-5">
        <div className="flex flex-row justify-between w-full gap-5">
          <Input
            label="Name"
            name="name"
            type="text"
            value={formik?.values?.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full gap-5">
          <Input
            label={"Password"}
            name="password"
            type={"password"}
            password={true}
            value={formik?.values?.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
          />
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-2">
              <label
                for="password"
                className="block mb-2 text-sm/6 font-medium text-gray-900"
              >
                Role
              </label>
              <Select
                defaultValue="lucy"

                className="!w-full"
                value={formik.values.role}
                style={{ width: "100%", height: "35px" }}
                onChange={handleChange}
                options={[
                  { value: "manager", label: "Manager" },
                  { value: "user", label: "User" },
                ]}
              />
            </div>
            <p>{formik.touched.role && formik.errors.role}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button onClick={handleCancel} htmlType="button" variant="solid" color="red">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddUpdateUser;
