import React, { useState } from "react";
import { GoEye } from "react-icons/go";

function Input({ label, name, type, onChange, value, placeholder, password,error }) {
  const [passwordType, setPasswordType] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          for="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      </div>
      <div className="mt-2 relative">
        <div>
        <input
          type={passwordType ? "text" : type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <p className = 'w-full text-red-500 text-start'>{error}</p>
        </div>
        {password && (
          <div onClick={()=> setPasswordType(!passwordType)} className="absolute right-0 top-[30%] right-[5%] cursor-pointer hover:text-blue-500">
            <svg
              className="shrink-0 size-3.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                className="hs-password-active:hidden"
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              ></path>
              <path
                className="hs-password-active:hidden"
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              ></path>
              <path
                className="hs-password-active:hidden"
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              ></path>
              <line
                className="hs-password-active:hidden"
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              ></line>
              <path
                className="hidden hs-password-active:block"
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              ></path>
              <circle
                className="hidden hs-password-active:block"
                cx="12"
                cy="12"
                r="3"
              ></circle>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
