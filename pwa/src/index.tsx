import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'tw-elements';
import App from "./App";
import FormCreator from "./components/forms/FormCreator";
import Header from "./components/Header";
import Login from "./components/Login";
import Registration from "./components/Registration";
import "./index.css";
import AdminPanelView from "./routes/AdminPanel";
import TempForm from "./routes/TempForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin_panel" element={<AdminPanelView />}>
        <Route path="create_form" element={<FormCreator />} />
      </Route>
      <Route path="temp_form" element={<TempForm />} />
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
