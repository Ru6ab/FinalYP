import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Signin from "./Signin";
import Signup from "./Signup";

const AuthModalContext = createContext();
export const useAuthModal = () => useContext(AuthModalContext);

function Modal({ children, onClose }) {
  return createPortal(
    <div
    style={{ zIndex: 9999 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        {children}
      </div>
    </div>,
    document.body
  );
}

export function AuthModalProvider({ children }) {
  const [mode, setMode] = useState(null); // "signin" | "signup" | null
  const close = () => setMode(null);

  useEffect(() => {
    if (!mode) return;
    const onKey = (e) => e.key === "Escape" && setMode(null);
    const prevOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mode]);

  const value = {
    openSignin: () => setMode("signin"),
    openSignup: () => setMode("signup"),
    close,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      {mode === "signin" && (
        <Modal onClose={close}>
          <Signin setSignin={close} onSwitch={() => setMode("signup")} />
        </Modal>
      )}
      {mode === "signup" && (
        <Modal onClose={close}>
          <Signup setSignup={close} onSwitch={() => setMode("signin")} />
        </Modal>
      )}
    </AuthModalContext.Provider>
  );
}