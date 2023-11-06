import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./auth/Login";
import Mainlayout from "./mainlayout/Mainlayout";
import Dashboard from "./admin/dashboard/Dashboard";
import Employeeslist from "./admin/employees/Employeeslist";
import Addemployee from "./admin/employees/Addemployee";
import Employeedetail from "./admin/employees/Employeedetail";
import axios from "axios";
import Employeeprofile from "./employee/profile/Employeeprofile";
import Departmentlist from "./admin/department/Departmentlist";

function App() {

  window.axios = axios;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Admin Route */}
        <Route path="/admin" element={<Mainlayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Outlet />}>
            <Route index element={<Employeeslist />} />
            <Route path=":id" element={<Employeedetail />} />
            <Route path="add" element={<Addemployee />} />
          </Route>
          <Route path="departments" element={<Departmentlist />}/>
        </Route>
        {/* Employee Route */}
        <Route path="/employee" element={<Mainlayout />}>
          {/* <Route path="dashboard/:id" element={<Dashboard />} /> */}
          <Route path="profile/:id" element={<Employeeprofile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
