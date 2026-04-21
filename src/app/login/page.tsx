"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error" as "error" | "success",
  });

  // AUTO REDIRECT
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      router.replace("/dashboard");
    } else {
      generateCaptcha();
    }
  }, []);

  // CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // TOAST HELPER
  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // LOGIN
  const handleLogin = () => {
    if (!email || !password) {
      return showToast("Email dan password wajib diisi");
    }
    if (password.length < 6) {
      return showToast("Password minimal 6 karakter");
    }
    if (captchaInput !== captcha) {
      generateCaptcha();
      return showToast("Captcha salah");
    }

    setLoading(true);

    setTimeout(() => {
      if (email !== "test@gmail.com" || password !== "123456") {
        setLoading(false);
        return showToast("Email atau password salah");
      }

      Cookies.set("user", JSON.stringify({ email }), { expires: 1 });
      showToast("Login berhasil!", "success");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 800);
    }, 800);
  };

  return (
    <div className="login-root">

      {/* TOAST */}
      {toast.show && (
        <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          <span className="toast-icon">{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.message}
        </div>
      )}

      {/* LEFT PANEL */}
      <div className="left-panel">
        {/* Decorative shapes */}
        <div className="deco-circle deco-1" />
        <div className="deco-circle deco-2" />
        <div className="deco-grid" />

        <div className="left-content">
          {/* Logo */}
          <div className="brand">
            <div className="brand-mark">C</div>
            <span className="brand-name">CargoLite</span>
          </div>

          <div className="left-headline">
            <div className="badge-pill">● Platform Aktif · 99.8% Uptime</div>
            <h1 className="headline">
              Kirim Paket<br />
              Lebih Cepat<br />
              <span className="headline-accent">&amp; Aman</span>
            </h1>
            <p className="subtext">
              Platform pengiriman modern dengan<br />tracking real-time ke seluruh Indonesia.
            </p>
          </div>

          <div className="feature-pills">
            <span className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Cepat
            </span>
            <span className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Aman
            </span>
            <span className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Real-time
            </span>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">34+</span>
              <span className="stat-lbl">Kota</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">98.4%</span>
              <span className="stat-lbl">On-Time</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">4.9★</span>
              <span className="stat-lbl">Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-card">

          {/* Form header */}
          <div className="form-header">
            <div className="form-logo-sm">
              <div className="brand-mark-sm">C</div>
            </div>
            <h2 className="form-title">Selamat Datang</h2>
            <p className="form-sub">Masuk ke akun CargoLite Anda</p>
          </div>

          <div className="fields">

            {/* EMAIL */}
            <div className="field-group">
              <label className="field-label">Email</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-pw"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="field-group">
              <label className="field-label">Verifikasi</label>
              <div className="captcha-row">
                <div className="captcha-box">
                  <span className="captcha-text">{captcha}</span>
                  <button onClick={generateCaptcha} className="captcha-refresh" title="Refresh captcha">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                  </button>
                </div>
                <div className="field-wrap captcha-input-wrap">
                  <input
                    placeholder="Ketik kode di atas"
                    className="field-input"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-row">
              <Link href="/forgot-password" className="forgot-link">
                Lupa password?
              </Link>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`submit-btn ${loading ? "submit-loading" : ""}`}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  Masuk
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>

            {/* REGISTER LINK */}
            <p className="register-row">
              Belum punya akun?{" "}
              <Link href="/register" className="register-link">
                Daftar sekarang
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        /* ===== ROOT ===== */
        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif;
          background: #f0f5f1;
          position: relative;
          overflow: hidden;
        }

        /* ===== TOAST ===== */
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          animation: slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .toast-success { background: #166534; color: #dcfce7; }
        .toast-error { background: #991b1b; color: #fee2e2; }
        .toast-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          background: rgba(255,255,255,0.2);
        }

        /* ===== LEFT PANEL ===== */
        .left-panel {
          display: none;
          position: relative;
          width: 50%;
          background: linear-gradient(145deg, #14532d 0%, #166534 40%, #15803d 100%);
          padding: 48px;
          overflow: hidden;
          flex-direction: column;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .left-panel { display: flex; }
        }

        /* Decorative */
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .deco-1 {
          width: 480px; height: 480px;
          background: rgba(74,222,128,0.08);
          top: -160px; left: -160px;
          border: 1px solid rgba(74,222,128,0.12);
        }
        .deco-2 {
          width: 320px; height: 320px;
          background: rgba(74,222,128,0.06);
          bottom: -100px; right: -100px;
          border: 1px solid rgba(74,222,128,0.1);
        }
        .deco-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .left-content {
          position: relative;
          z-index: 1;
          animation: fadeUp 0.7s ease both;
        }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 48px;
        }
        .brand-mark {
          width: 36px; height: 36px;
          background: #4ade80;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 800; color: #14532d;
        }
        .brand-name {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .left-headline { margin-bottom: 32px; }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(74,222,128,0.15);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 12px;
          color: #86efac;
          margin-bottom: 20px;
          letter-spacing: 0.2px;
        }

        .headline {
          font-size: 44px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin: 0 0 16px;
        }
        .headline-accent {
          color: #4ade80;
        }
        .subtext {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0;
        }

        .feature-pills {
          display: flex;
          gap: 10px;
          margin-bottom: 36px;
        }
        .pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 7px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 16px 24px;
          width: fit-content;
        }
        .stat-item { text-align: center; padding: 0 20px; }
        .stat-num { display: block; font-size: 20px; font-weight: 800; color: #4ade80; letter-spacing: -0.5px; }
        .stat-lbl { display: block; font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }

        /* ===== RIGHT PANEL ===== */
        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          background: #f0f5f1;
        }

        .form-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 24px;
          padding: 40px 36px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(0,0,0,0.07);
          animation: fadeUp 0.6s ease both 0.1s;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .form-logo-sm {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        .brand-mark-sm {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 800; color: #fff;
          box-shadow: 0 4px 16px rgba(74,222,128,0.3);
        }
        .form-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f1f14;
          letter-spacing: -0.5px;
          margin: 0 0 6px;
        }
        .form-sub {
          font-size: 14px;
          color: #6b7c72;
          margin: 0;
        }

        /* ===== FIELDS ===== */
        .fields { display: flex; flex-direction: column; gap: 18px; }

        .field-group { display: flex; flex-direction: column; gap: 6px; }

        .field-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #374840;
          letter-spacing: 0.2px;
        }

        .field-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          color: #9cb4a4;
          display: flex;
          pointer-events: none;
        }
        .field-input {
          width: 100%;
          border: 1.5px solid #dce8e0;
          border-radius: 12px;
          padding: 12px 14px 12px 42px;
          font-size: 14px;
          color: #0f1f14;
          background: #f7faf8;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }
        .field-input::placeholder { color: #adc0b4; }
        .field-input:focus {
          border-color: #16a34a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
        }

        .toggle-pw {
          position: absolute;
          right: 13px;
          background: none;
          border: none;
          cursor: pointer;
          color: #9cb4a4;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .toggle-pw:hover { color: #16a34a; }

        /* CAPTCHA */
        .captcha-row {
          display: flex;
          gap: 10px;
          align-items: stretch;
        }
        .captcha-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #eef4f0;
          border: 1.5px solid #dce8e0;
          border-radius: 12px;
          padding: 10px 14px;
          flex-shrink: 0;
        }
        .captcha-text {
          font-family: 'Courier New', monospace;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #166534;
          user-select: none;
          text-decoration: line-through wavy rgba(22,101,52,0.3);
        }
        .captcha-refresh {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b9e7a;
          padding: 2px;
          display: flex;
          transition: color 0.15s, transform 0.2s;
        }
        .captcha-refresh:hover { color: #16a34a; transform: rotate(180deg); }
        .captcha-input-wrap { flex: 1; }
        .captcha-input-wrap .field-input { padding-left: 14px; }

        /* FORGOT */
        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -6px;
        }
        .forgot-link {
          font-size: 13px;
          color: #6b9e7a;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .forgot-link:hover { color: #16a34a; }

        /* SUBMIT */
        .submit-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(22,163,74,0.3);
          font-family: inherit;
          letter-spacing: -0.2px;
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #15803d, #166534);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(22,163,74,0.4);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-loading {
          background: #cbd5e1 !important;
          box-shadow: none !important;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* REGISTER */
        .register-row {
          text-align: center;
          font-size: 13.5px;
          color: #6b7c72;
          margin: 0;
        }
        .register-link {
          color: #16a34a;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.15s;
        }
        .register-link:hover { color: #14532d; text-decoration: underline; }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(48px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}