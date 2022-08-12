import { Link, Outlet } from "react-router-dom";
import AdminPanelDrawer from "../components/AdminPanelDrawer";

function HelloWorld() {
  return (
    <div className="container">
        <AdminPanelDrawer/>
        <h1 className="text-3xl font-bold underline">Hello!</h1>
        <Link to="/temp_form">Temp form</Link>
        <Link to="create_form">Create form</Link>

        <Outlet />
    </div>
  );
}

export default HelloWorld;
