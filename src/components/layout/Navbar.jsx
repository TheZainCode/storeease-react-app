
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="text-xl font-bold text-slate-900">
          ReactProject
        </NavLink>

        <div className="flex flex-wrap items-center gap-4">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-600"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-indigo-600" : "text-slate-600"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <span className="text-sm text-slate-600">
                {user?.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white cursor-pointer  hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({isActive})=> `text-sm font-medium ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600 "}`}
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
