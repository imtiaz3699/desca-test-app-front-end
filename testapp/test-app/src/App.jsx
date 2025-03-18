import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { UserProvider } from "./context/userContext";
import { ApiProvider } from "./context/apiFuncContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import DashboardLayout from "./pages/dashboard/dashboardLayout";
import UserManagement from "./pages/UserManagement/UserManagement";
function App() {
  return (
    <>
      <UserProvider>
        <ApiProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<UserManagement />}>
              {/* <Route index element={<Dashboard />} />
              <Route path="user" element={<UserPage />} />
              <Route path="product" element={<ProductPage />} /> */}
            </Route>
          </Route>
          </Routes>
        </ApiProvider>
      </UserProvider>
    </>
  );
}

export default App;
