import React from "react";
import Input from "../../components/Input/Input";
import { MdDashboard } from "react-icons/md";
import { useApi } from "../../context/apiFuncContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
function Login() {
  const { setUser, setToken,token } = useUser();
  const { postRequest } = useApi();
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postRequest("/api/auth/login", values);
        if (response && response?.status == 200) {
          Cookies.set("token", response?.data?.token, {
            expires: 7,
            secure: true,
          });         
          Cookies.set("user", JSON.stringify(response?.data?.user), {
            expires: 7,
            secure: true,
          });
          setUser(response?.data?.user);
          setToken(response?.data?.token);
          toast.success("Login Successful.");
          if(response?.data?.user?.role === 'admin') {
            navigate("/dashboard")
          } else if(response?.data?.user?.role === 'user'){
            navigate("/dashboard/tasks")
          } else {
            navigate("/dashboard")
          }
          
        }
      } catch (error) {
        console.error(error?.response?.data?.message, "urlError");
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    },
  });
  return (
    <div className="border-[1px] border-gray-300 rounded-[10px] shadow-md w-[400px] mx-auto">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
          <MdDashboard className="text-[50px]" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error = {formik.touched.email && formik.errors.email}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              password={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              error = {formik.touched.password && formik.errors.password}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
