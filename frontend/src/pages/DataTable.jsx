
import { useEffect, useState } from "react";
import { listSubmissions } from "../api/submissionsApi";

export default function DataTable() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { items } = await listSubmissions({ page: 1, limit: 50 });
				setRows(items);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className="min-h-[calc(100vh-64px)] bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 py-6">
				<div className="mx-auto w-full max-w-6xl">
					<header className="mb-4 sm:mb-6">
						<h1 className="text-2xl font-semibold sm:text-3xl tracking-tight">
							Public Data
						</h1>
						<p className="mt-1 text-sm text-gray-600">
							Submissions saved from the onboarding wizard.
						</p>
					</header>

					<div className="w-full rounded-xl bg-white p-4 shadow sm:p-6">
						<div className="overflow-x-auto rounded-lg border">
							<table className="min-w-[720px] w-full border-collapse text-xs sm:text-sm">
								<thead className="bg-gray-50">
									<tr className="text-gray-700">
										{[
											"Email",
											"About Me",
											"Street",
											"City",
											"State",
											"Zip",
											"Birthdate",
											"Step",
											"Created",
										].map((h) => (
											<th
												key={h}
												className="border-b px-3 py-2 text-left font-medium"
											>
												{h}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{loading ? (
										[...Array(5)].map((_, i) => (
											<tr key={i} className="animate-pulse">
												{Array.from({ length: 9 }).map((__, j) => (
													<td key={j} className="border-b px-3 py-2">
														<div className="h-3 w-24 rounded bg-gray-200" />
													</td>
												))}
											</tr>
										))
									) : rows.length === 0 ? (
										<tr>
											<td
												className="px-6 py-10 text-center text-gray-600"
												colSpan={9}
											>
												No submissions yet. Try filling the{" "}
												<span className="font-medium">Onboarding</span> form.
											</td>
										</tr>
									) : (
										rows.map((r) => (
											<tr key={r._id} className="odd:bg-white even:bg-gray-50">
												<td className="border-b px-3 py-2">{r.email}</td>
												<td className="border-b px-3 py-2">
													{r.aboutMe || ""}
												</td>
												<td className="border-b px-3 py-2">
													{r.address?.street || ""}
												</td>
												<td className="border-b px-3 py-2">
													{r.address?.city || ""}
												</td>
												<td className="border-b px-3 py-2">
													{r.address?.state || ""}
												</td>
												<td className="border-b px-3 py-2">
													{r.address?.zip || ""}
												</td>
												<td className="border-b px-3 py-2">
													{r.birthdate || ""}
												</td>
												<td className="border-b px-3 py-2">{r.step ?? 0}</td>
												<td className="border-b px-3 py-2">
													{new Date(r.createdAt).toLocaleString()}
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
