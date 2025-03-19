import React from "react";
import { FiPlusCircle } from "react-icons/fi";
function PageHeader({ heading,btnText,setIsModalOpen,isModalOpen }) {
  return (
    <div  className="flex flex-row items-center justify-between w-full mt-10">
      <h1 className="font-bold text-[30px]">{heading}</h1>
      <div  onClick={()=> setIsModalOpen(!isModalOpen)} className="flex flex-row items-center gap-2 cursor-pointer">
      <p className = 'text-[20px]'>{btnText}</p>
      <FiPlusCircle className = 'text-[20px]' />
      </div>
    </div>
  );
}

export default PageHeader;
