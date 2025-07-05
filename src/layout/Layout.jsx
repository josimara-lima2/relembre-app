import Sidebar from "../components/Sidebar";

function Layout({ children }) {

    return (
        <div className="h-screen w-screen overflow-hidden bg-primary-pure-5 flex ">
            <Sidebar />

            <div className="flex-1 overflow-auto relative z-10 pointer-events-auto p-4">
                {children}
            </div>
        </div>
    );
}

export default Layout;
