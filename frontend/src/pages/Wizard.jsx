import { useMemo, useState, useEffect } from "react";
import AboutMe from "../components/AboutMe";
import Address from "../components/Address";
import Birthdate from "../components/Birthdate";
import { useConfig } from "../ConfigContext";
import { upsertSubmission } from "../api/submissionsApi";

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
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Wizard() {
  const { config } = useConfig();
  const [step, setStep] = useState(1); // 1..3
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [showBack, setShowBack] = useState(false); // controls Back button visibility

  useEffect(() => {
    setShowBack(step > 1); // Back is visible only on steps 2 and 3
  }, [step]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aboutMe: "",
    address: { street: "", city: "", state: "", zip: "" },
    birthdate: "",
  });

  const page2 = useMemo(() => config.page2Components || [], [config]);
  const page3 = useMemo(() => config.page3Components || [], [config]);

  const renderComponents = (keys) => (
    <div className="space-y-4">
      {keys.map((key) => {
        if (key === "aboutMe") {
          return (
            <AboutMe
              key={key}
              value={formData.aboutMe}
              onChange={(v) => setFormData({ ...formData, aboutMe: v })}
            />
          );
        }
        if (key === "address") {
          return (
            <Address
              key={key}
              value={formData.address}
              onChange={(v) => setFormData({ ...formData, address: v })}
            />
          );
        }
        if (key === "birthdate") {
          return (
            <Birthdate
              key={key}
              value={formData.birthdate}
              onChange={(v) => setFormData({ ...formData, birthdate: v })}
            />
          );
        }
        return null;
      })}
    </div>
  );

  const saveProgress = async (currentStep) => {
    if (!formData.email) {
      alert("Enter email first (used as unique id).");
      return false;
    }
    setSaving(true);
    try {
      await upsertSubmission({
        email: formData.email,
        aboutMe: formData.aboutMe,
        address: formData.address,
        birthdate: formData.birthdate,
        step: currentStep - 1,
      });
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1500);
      return true;
    } catch (e) {
      console.error(e);
      alert("Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const next = async () => {
    const ok = await saveProgress(step);
    if (ok) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const finish = async () => {
    const ok = await saveProgress(step);
    if (ok) alert("All steps saved! Check the Data page to confirm.");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="mx-auto w-full max-w-3xl">
          <header className="mb-4 sm:mb-6">
            <h1 className="text-2xl font-semibold sm:text-3xl tracking-tight">
              Onboarding
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill your details across a couple of short steps.
            </p>
          </header>

          {/* Stepper */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm
                    ${
                      step >= n
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    {n}
                  </div>
                  {n < 3 && (
                    <div
                      className={`h-[2px] w-8 sm:w-12 ${
                        step > n ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow sm:p-6">
            {step === 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label className="mt-3 block text-sm font-medium">
                  Password
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Password is demo-only and not sent to the backend.
                </p>
              </div>
            )}

            {step === 2 && renderComponents(page2)}
            {step === 3 && renderComponents(page3)}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-grey-500 h-5">
                {savedTick ? "Saved ✓" : " "}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:auto-cols-max sm:grid-flow-col">
                {/* Back button: visible only on steps 2 & 3, blue shades */}
                {showBack && (
                  <Button
                    variant="secondary"
                    className="bg-blue-200 text-blue-900 hover:bg-blue-300 border-transparent"
                    disabled={saving}
                    onClick={back}
                  >
                    Back
                  </Button>
                )}

                {/* Next / Finish with blue shades */}
                {step < 3 ? (
                  <Button
                    variant="secondary"
                    className="bg-blue-200 text-blue-900 hover:bg-blue-300 border-transparent"
                    onClick={next}
                    disabled={saving}
                  >
                    {saving ? "Saving…" : "Next"}
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="bg-blue-200 text-blue-900 hover:bg-blue-300 border-transparent"
                    onClick={finish}
                    disabled={saving}
                  >
                    {saving ? "Saving…" : "Finish"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <footer className="mt-4 text-xs text-gray-500">Step {step} of 3</footer>
        </div>
      </div>
    </div>
  );
}
