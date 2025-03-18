import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { UserProvider } from "./context/userContext";
import { ApiProvider } from "./context/apiFuncContext";

function App() {
  
  return (
    <>
    <ApiProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UserProvider>
      </ApiProvider>
    </>
  );
}

export default App;
