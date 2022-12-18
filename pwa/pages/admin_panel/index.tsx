import AdminPanelDrawer from "../../src/components/AdminPanelDrawer";

function AdminPanel() {
    return (
        <div className="relative flex w-full h-full">
            <AdminPanelDrawer />
            <div className="container mx-auto px-10 text-center">
                <h1 className="text-3xl font-bold underline my-4">Panel administratora</h1>
            </div>
        </div>
    );
}

export default AdminPanel;
