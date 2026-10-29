import { useAuth } from "../context/AuthContext";
const stats =[
    { label: "Total Projects", value: "03", description: "Learning projects "},
    { label: "Account Status", value: "Active", description: "Current session "},
    { label: "Application", value: "v1.0", description: "Project dashboard"},
];
function Dashboard(){
    const { user }=useAuth();
    return(
        <div className="space-y-8">
            <section className="rounded-2xl bg-indigo-600 p-8 text-white sm:p-10">
                <p className="text-sm font-medium text-indigo-100">
                    YOUR WORKSPACE
                </p>
                <h1 className="mt-3 font-bold text-3xl sm:text-4xl">Welcome back, {user?.name || "User"}!</h1>
                <p className="mt-3 leading-7 max-w-2xl text-indigo-100">Your dashboard is ready. Review your application overview and continue building with modern React.</p>
            </section>
            <section>
                <h2 className="text-xl font-bold text-slate-900">Overview</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat)=>(
                        <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
                            <p className="mt-2 text-sm font-medium text-slate-500">{stat.description}</p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-slate-900">Account Information</h2>
                <div className="mt-4 space-y-3 text-sm">
                    <p className="text-slate-600">
                        <span className="font-medium text-slate-900">Name: </span>
                        {user?.name || "Not available"}
                    </p>
                    <p className="text-slate-600">
                        <span className="font-medium text-slate-900">Email: </span>
                        {user?.email || "Not available"}
                    </p>
                </div>
            </section>
        </div>
    );
}
export default Dashboard;