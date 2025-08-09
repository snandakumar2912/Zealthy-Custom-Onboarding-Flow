// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Wizard from "./pages/Wizard";
// import Admin from "./pages/Admin";
// import DataTable from "./pages/DataTable";
// import { ConfigProvider } from "./ConfigContext";
// import "./index.css";

// function Nav() {
// 	return (
// 		<nav className="border-b bg-white">
// 			<div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 p-4 sm:gap-6">
// 				<span className="mr-auto text-base font-semibold sm:text-lg">
// 					Zealthy Demo
// 				</span>
// 				<Link to="/" className="text-blue-600 hover:underline">
// 					Onboarding
// 				</Link>
// 				<Link to="/admin" className="text-blue-600 hover:underline">
// 					Admin
// 				</Link>
// 				<Link to="/data" className="text-blue-600 hover:underline">
// 					Data
// 				</Link>
// 			</div>
// 		</nav>
// 	);
// }

// function App() {
// 	return (
// 		<div className="min-h-screen bg-gray-50 text-gray-900">
// 			<Nav />
// 			{/* each page handles its own centering */}
// 			<Routes>
// 				<Route path="/" element={<Wizard />} />
// 				<Route path="/admin" element={<Admin />} />
// 				<Route path="/data" element={<DataTable />} />
// 			</Routes>
// 		</div>
// 	);
// }

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<BrowserRouter>
// 		<ConfigProvider>
// 			<App />
// 		</ConfigProvider>
// 	</BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Wizard from "./pages/Wizard";
import Admin from "./pages/Admin";
import DataTable from "./pages/DataTable";
import { ConfigProvider } from "./ConfigContext";
import "./index.css";

function Nav() {
	const linkBase = "px-3 py-1.5 rounded-md text-sm";
	return (
		<nav className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 p-3 sm:p-4">
				<span className="mr-auto text-base font-semibold sm:text-lg">
					Zealthy Demo
				</span>
				<NavLink
					to="/"
					end
					className={({ isActive }) =>
						`${linkBase} ${
							isActive
								? "bg-blue-100 text-blue-700"
								: "text-blue-700 hover:bg-blue-50"
						}`
					}
				>
					Onboarding
				</NavLink>
				<NavLink
					to="/admin"
					className={({ isActive }) =>
						`${linkBase} ${
							isActive
								? "bg-blue-100 text-blue-700"
								: "text-blue-700 hover:bg-blue-50"
						}`
					}
				>
					Admin
				</NavLink>
				<NavLink
					to="/data"
					className={({ isActive }) =>
						`${linkBase} ${
							isActive
								? "bg-blue-100 text-blue-700"
								: "text-blue-700 hover:bg-blue-50"
						}`
					}
				>
					Data
				</NavLink>
			</div>
		</nav>
	);
}

function App() {
	return (
		<div id="puneeth" className="min-h-screen bg-gray-50 text-gray-900">
			<Nav />
			<Routes>
				<Route path="/" element={<Wizard />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/data" element={<DataTable />} />
			</Routes>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ConfigProvider>
			<App />
		</ConfigProvider>
	</BrowserRouter>
);
