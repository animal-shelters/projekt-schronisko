import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'tw-elements';
import App from "./App";
import AddAnimal from "./components/AddAnimal";
import FormCreator from "./components/forms/FormCreator";
import Header from "./components/Header";
import LandingPageEdit from "./components/LandingPageEdit";
import Login from "./components/Login";
import Registration from "./components/Registration";
import "./index.css";
import { Role } from "./models/role-type";
import Unathorized from "./routes/401";
import AdminPanelView from "./routes/AdminPanel";
// import AnimalsPage from "./routes/AnimalsPage";
import TempForm from "./routes/TempForm";
import useUser from "./utils/useUser";

function Protected(props: { children: JSX.Element }): JSX.Element {
  const { user, setUser } = useUser();

  return (user && user.roles.includes(Role.admin) ? props.children : Unathorized())
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin_panel" element={<Protected ><AdminPanelView /></Protected>}>
        <Route path="edit_landing_page" element={<LandingPageEdit />} />
        <Route path="create_form" element={<FormCreator />} />
        <Route path="add_animal" element={<AddAnimal />} />
      </Route>
      {/* <Route path="animals" element={<AnimalsPage />} /> */}
      <Route path="temp_form" element={<TempForm />} />
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
