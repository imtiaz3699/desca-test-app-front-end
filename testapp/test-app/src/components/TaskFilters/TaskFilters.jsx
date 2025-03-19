import { DatePicker, Select } from "antd";
import React from "react";

function TaskFilters({ status, setStatus, dueDate, setDueDate, setDates }) {
  const handleChange = (value) => {
    setStatus(value);
  };
  const { RangePicker } = DatePicker;
  const onChange = (values) => {
    if (values) {
      if (values && values.length === 2) {
        setDates({
          startDate: values[0]?.toDate().toISOString(), 
          endDate: values[1]?.toDate().toISOString(),
        });
      } else {
        setDates({ startDate: null, endDate: null });
      }
      const formattedDates = values.map((date) => date?.toDate().toISOString()); 
      setDueDate(values);
    } else {
      setDueDate([null, null]);
    }
  };
  return (
    <div className="flex flex-row items-center gap-5">
      <Select
        defaultValue="Select status"
        className="!w-[150px] text-start"
        name="status"
        labelRender={"label"}
        value={status}
        style={{ width: "100%", height: "35px" }}
        onChange={handleChange}
        options={[
          { value: "", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "in-progress", label: "In Progress" },
          { value: "completed", label: "Completed" },
        ]}
      />
      <RangePicker
        value={dueDate}
        onChange={onChange}
        className="w-full h-[35px]"
      />
    </div>
  );
}

export default TaskFilters;
