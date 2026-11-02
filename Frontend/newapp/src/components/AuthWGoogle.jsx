import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signinSuccess } from "../redux/user/userSlice";

export default function AuthWGoogle({ onSuccess }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleClick = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("1. Firebase OK:", result.user.email);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          avatar: result.user.photoURL,
          email: result.user.email,
          name: result.user.displayName,
        }),
      });
      console.log("2. Backend status:", res.status);

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || `Server error (${res.status}).`);
        return;
      }

      dispatch(signinSuccess(data));
      onSuccess?.();
      navigate(data.role === "admin" ? "/admin/dashboard" : "/profile");
    } catch (err) {
      console.error("Google auth error:", err.code, err.message, err);
      setError(`Google sign in failed (${err.code || err.message}).`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
      >
        <FcGoogle size={22} />
        {loading ? "Please wait..." : "Continue with Google"}
      </button>
      {error && <p className="mt-2 text-center text-sm font-medium text-rose-600">{error}</p>}
    </div>
  );
}