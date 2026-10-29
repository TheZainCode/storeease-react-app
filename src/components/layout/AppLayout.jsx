import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function AppLayout(){
    return(
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <main className="mx-auto max-w-7xl px-6 py-8">
                <Outlet />
            </main>
            <footer className="border-t border-slate-200 px-6 py-2 text-sm text-slate-500 text-center">
                ReactProject — Build with React and Tailwind CSS 
            </footer>
        </div>
    );
}
export default AppLayout;