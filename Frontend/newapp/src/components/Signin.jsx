import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "../redux/user/userSlice";
import AuthWGoogle from "./AuthWGoogle";

const inputCls =
  "w-full rounded-md border border-slate-300 px-3 py-2.5 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

export default function Signin({ setSignin, onSwitch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user || {});
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signinFailure("Email and password are required."));
      return;
    }

    dispatch(signinStart());
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data) {
        dispatch(signinFailure(data?.message || "Signin failed."));
        return;
      }

      dispatch(signinSuccess(data));
      setSignin(false);
      navigate(data.role === "admin" ? "/admin/dashboard" : "/profile");
    } catch (err) {
      dispatch(signinFailure("Network error. Try again."));
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Log in to your account</p>
        </div>
        <button
          onClick={() => setSignin(false)}
          aria-label="Close"
          className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <RxCross2 size={24} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputCls}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter password"
              className={`${inputCls} pr-11`}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              aria-label={showPass ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-800"
            >
              {showPass ? <MdOutlineVisibilityOff size={22} /> : <MdOutlineRemoveRedEye size={22} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
            {typeof error === "string" ? error : "Something went wrong."}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-700 py-2.5 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or continue with
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex justify-center">
        <AuthWGoogle  onSuccess={() => setSignin(false)}/>
      </div>

      {onSwitch && (
        <p className="mt-5 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <button onClick={onSwitch} className="font-semibold text-blue-700 hover:underline">
            Sign up
          </button>
        </p>
      )}
    </div>
  );
}
