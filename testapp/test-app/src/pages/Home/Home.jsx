import React from "react";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import Login from "../Login/Login";
function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className = 'flex items-center justify-center h-screen'>
      <Login/>
    </div>
  );
}

export default Home;
