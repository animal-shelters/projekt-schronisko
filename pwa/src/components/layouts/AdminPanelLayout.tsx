import AdminPanelDrawer from "../AdminPanelDrawer";

interface Props {
    children: JSX.Element;
}

function AdminPanelLayout({ children }: Props) {
    return (
        <div className="relative flex w-full h-full">
            <AdminPanelDrawer />
            <div className="container mx-auto px-10 text-center">
                <h1 className="text-3xl font-bold underline my-4">Panel administratora</h1>
                {children}
            </div>
        </div>
    );
}

export default AdminPanelLayout;