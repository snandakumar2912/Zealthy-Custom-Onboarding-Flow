import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<Nav />
			{/* Center everything and limit width globally */}
			<main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6">
				<Routes>
					<Route path="/" element={<Wizard />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/data" element={<DataTable />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
