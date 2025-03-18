import React from "react";
import Input from "../../components/Input/Input";
import { MdDashboard } from "react-icons/md";
import { useApi } from "../../context/apiFuncContext";

function Login() {
    const {postRequest} = useApi()
    
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
          <form className="space-y-6" action="#" method="POST">
            <Input label="Email" name="email" type="email" />
            <Input
              label="Password"
              name="email"
              type="password"
              password={true}
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
