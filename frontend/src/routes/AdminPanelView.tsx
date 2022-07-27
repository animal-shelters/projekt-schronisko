import AdminPanelDrawer from "../components/AdminPanelDrawer";

function HelloWorld(props: any) {
  return (
    <div className="container">
        <AdminPanelDrawer/>
        <h1 className="text-3xl font-bold underline">Hello!</h1>
    </div>
  );
}

export default HelloWorld;
