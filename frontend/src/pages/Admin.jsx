
import { useEffect, useState } from "react";
import { useConfig } from "../ConfigContext";

function Button({
	children,
	variant = "primary",
	fullWidth = false,
	disabled = false,
	className = "",
	...props
}) {
	const base =
		"inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition " +
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50";
	const variants = {
		primary:
			"bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 shadow",
		secondary:
			"border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300",
		ghost: "text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300",
	};
	return (
		<button
			className={`${base} ${variants[variant]} ${
				fullWidth ? "w-full" : ""
			} ${className}`}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}

const LABELS = {
	aboutMe: "About Me",
	address: "Address",
	birthdate: "Birthdate",
};

export default function Admin() {
	const { config, setConfig, ALLOWED, loading } = useConfig();
	const [page2, setPage2] = useState(new Set(config.page2Components));
	const [page3, setPage3] = useState(new Set(config.page3Components));
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);
	const [savedAt, setSavedAt] = useState(null);

	useEffect(() => {
		setPage2(new Set(config.page2Components || []));
		setPage3(new Set(config.page3Components || []));
	}, [config]);

	const toggle = (set, key) => {
		const next = new Set(set);
		next.has(key) ? next.delete(key) : next.add(key);
		return next;
	};

	const save = async () => {
		const p2 = Array.from(page2),
			p3 = Array.from(page3);
		if (!p2.length || !p3.length)
			return setError("Each page must have at least one component.");
		setError("");
		setSaving(true);
		try {
			await setConfig({ page2Components: p2, page3Components: p3 });
			setSavedAt(new Date());
		} catch (e) {
			console.error(e);
			setError("Failed to save configuration. Try again.");
		} finally {
			setSaving(false);
			setTimeout(() => setSavedAt(null), 3000);
		}
	};

	if (loading) {
		return (
			<div className="p-6">
				<div className="mx-auto max-w-6xl animate-pulse space-y-4">
					<div className="h-8 w-64 rounded bg-gray-200" />
					<div className="h-24 rounded-xl bg-gray-200" />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-[calc(100vh-64px)] bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 py-6">
				<div className="mx-auto w-full max-w-6xl">
					<header className="mb-4 sm:mb-6">
						<h1 className="text-2xl font-semibold sm:text-3xl tracking-tight">
							Admin Configuration
						</h1>
						<p className="mt-1 text-sm text-gray-600">
							Choose which components show on each step of the wizard.
						</p>
					</header>

					<div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
						{/* Left: Options */}
						<div className="lg:col-span-2 rounded-xl bg-white p-4 shadow sm:p-6">
							<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
								<fieldset className="rounded-lg border p-4">
									<legend className="px-1 text-sm font-medium text-gray-800">
										Page 2
									</legend>
									<div className="mt-3 space-y-3">
										{ALLOWED.map((k) => (
											<label key={k} className="flex items-center gap-2">
												<input
													className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
													type="checkbox"
													checked={page2.has(k)}
													onChange={() => setPage2((prev) => toggle(prev, k))}
												/>
												<span className="text-sm">{LABELS[k]}</span>
											</label>
										))}
									</div>
								</fieldset>

								<fieldset className="rounded-lg border p-4">
									<legend className="px-1 text-sm font-medium text-gray-800">
										Page 3
									</legend>
									<div className="mt-3 space-y-3">
										{ALLOWED.map((k) => (
											<label key={k} className="flex items-center gap-2">
												<input
													className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
													type="checkbox"
													checked={page3.has(k)}
													onChange={() => setPage3((prev) => toggle(prev, k))}
												/>
												<span className="text-sm">{LABELS[k]}</span>
											</label>
										))}
									</div>
								</fieldset>
							</div>

							{error && <p className="mt-4 text-sm text-red-600">{error}</p>}

							<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
								<Button
									variant="secondary"
									className="sm:w-auto"
									onClick={() => {
										setPage2(new Set(config.page2Components));
										setPage3(new Set(config.page3Components));
									}}
								>
									Reset
								</Button>
								<Button
									variant="secondary"
									className="sm:w-auto"
									onClick={save}
									disabled={saving}
								>
									{saving ? "Saving…" : "Save changes"}
								</Button>
							</div>
						</div>

						{/* Right: Preview */}
						<aside className="rounded-xl bg-white p-4 shadow sm:p-6">
							<h2 className="mb-2 text-sm font-medium text-gray-800">
								Current Config
							</h2>
							<pre className="rounded-md bg-gray-50 p-3 text-xs text-gray-800 overflow-auto">
								{JSON.stringify(config, null, 2)}
							</pre>
							{savedAt && (
								<p className="mt-3 text-xs text-green-700">
									Saved {savedAt.toLocaleTimeString()} 
								</p>
							)}
						</aside>
					</div>
				</div>
			</div>
		</div>
	);
}
