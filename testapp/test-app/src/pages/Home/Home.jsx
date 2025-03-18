import React from "react";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import Login from "../Login/Login";
function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Login/>
    </>
  );
}

export default Home;
