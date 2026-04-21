"use client";

import { useState, useEffect } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  // PASSWORD STRENGTH
  const getPasswordStrength = () => {
    if (password.length < 6) return "weak";
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    if (password.length >= 8 && hasNumber && hasUpper) return "strong";
    return "medium";
  };

  const strength = getPasswordStrength();

  // CAPTCHA
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  const handleRegister = () => {
    setError("");

    if (!name || !email || !password) {
      return setError("Semua field wajib diisi");
    }
    if (password.length < 6) {
      return setError("Password minimal 6 karakter");
    }
    if (captchaInput !== captcha) {
      generateCaptcha();
      return setError("Captcha salah");
    }

    alert("Register berhasil!");
  };

  const getStrengthColor = () => {
    if (strength === "weak") return "#ef4444";
    if (strength === "medium") return "#f59e0b";
    return "#16a34a";
  };

  const getStrengthWidth = () => {
    if (strength === "weak") return "33%";
    if (strength === "medium") return "66%";
    return "100%";
  };

  const getStrengthText = () => {
    if (strength === "weak") return "Lemah — tambahkan angka & huruf kapital";
    if (strength === "medium") return "Sedang — tambahkan huruf kapital";
    return "Kuat — password sudah aman";
  };

  return (
    <div className="register-root">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="deco-circle deco-1" />
        <div className="deco-circle deco-2" />
        <div className="deco-grid" />

        <div className="left-content">
          {/* Brand */}
          <div className="brand">
            <div className="brand-mark">S</div>
            <span className="brand-name">SwiftSend</span>
          </div>

          <div className="left-headline">
            <div className="badge-pill">● Bergabung Sekarang · Gratis</div>
            <h1 className="headline">
              Mulai Kirim<br />
              Paket Hari Ini<br />
              <span className="headline-accent">Tanpa Ribet</span>
            </h1>
            <p className="subtext">
              Buat akun dalam 30 detik dan nikmati<br />
              kemudahan pengiriman ke seluruh Indonesia.
            </p>
          </div>

          {/* Steps */}
          <div className="steps">
            {[
              { num: "01", title: "Daftar Akun", desc: "Isi form registrasi dengan data valid" },
              { num: "02", title: "Verifikasi Email", desc: "Cek inbox untuk konfirmasi akun" },
              { num: "03", title: "Mulai Kirim", desc: "Dashboard siap, langsung buat pengiriman" },
            ].map((s, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{s.num}</div>
                <div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">12K+</span>
              <span className="stat-lbl">Pengguna</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">34+</span>
              <span className="stat-lbl">Kota</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">Gratis</span>
              <span className="stat-lbl">Daftar</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-card">

          {/* Header */}
          <div className="form-header">
            <div className="form-logo-sm">
              <div className="brand-mark-sm">S</div>
            </div>
            <h2 className="form-title">Buat Akun Baru</h2>
            <p className="form-sub">Isi data di bawah untuk mulai menggunakan SwiftSend</p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="error-banner">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <div className="fields">

            {/* NAMA */}
            <div className="field-group">
              <label className="field-label">Nama Lengkap</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input
                  type="text"
                  placeholder="Nama sesuai KTP"
                  className="field-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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

            {/* PASSWORD + STRENGTH */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* STRENGTH BAR */}
              {password.length > 0 && (
                <div className="strength-wrap">
                  <div className="strength-track">
                    <div
                      className="strength-fill"
                      style={{
                        width: getStrengthWidth(),
                        background: getStrengthColor(),
                      }}
                    />
                  </div>
                  <div className="strength-meta">
                    <span
                      className="strength-label"
                      style={{ color: getStrengthColor() }}
                    >
                      {strength === "weak" ? "Lemah" : strength === "medium" ? "Sedang" : "Kuat"}
                    </span>
                    <span className="strength-hint">{getStrengthText()}</span>
                  </div>
                  {/* Strength segments */}
                  <div className="strength-segments">
                    {["Huruf kecil", "Angka (0–9)", "Huruf kapital (A–Z)", "Min. 8 karakter"].map((req, i) => {
                      const checks = [
                        /[a-z]/.test(password),
                        /[0-9]/.test(password),
                        /[A-Z]/.test(password),
                        password.length >= 8,
                      ];
                      return (
                        <div key={i} className={`seg-item ${checks[i] ? "seg-ok" : "seg-no"}`}>
                          <span className="seg-dot">{checks[i] ? "✓" : "○"}</span>
                          {req}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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

            {/* SUBMIT */}
            <button onClick={handleRegister} className="submit-btn">
              Daftar Sekarang
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {/* LOGIN LINK */}
            <p className="login-row">
              Sudah punya akun?{" "}
              <a href="/login" className="login-link">Masuk di sini</a>
            </p>

          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .register-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif;
          background: #f0f5f1;
        }

        /* ===== LEFT PANEL ===== */
        .left-panel {
          display: none;
          position: relative;
          width: 48%;
          background: linear-gradient(145deg, #14532d 0%, #166534 40%, #15803d 100%);
          padding: 48px;
          overflow: hidden;
          flex-direction: column;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .left-panel { display: flex; }
        }

        .deco-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .deco-1 {
          width: 480px; height: 480px;
          background: rgba(74,222,128,0.07);
          top: -160px; left: -160px;
          border: 1px solid rgba(74,222,128,0.1);
        }
        .deco-2 {
          width: 300px; height: 300px;
          background: rgba(74,222,128,0.05);
          bottom: -80px; right: -80px;
          border: 1px solid rgba(74,222,128,0.08);
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

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 44px;
        }
        .brand-mark {
          width: 36px; height: 36px;
          background: #4ade80;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 800; color: #14532d;
        }
        .brand-name {
          font-size: 18px; font-weight: 700;
          color: #fff; letter-spacing: -0.3px;
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
        }

        .headline {
          font-size: 40px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin: 0 0 14px;
        }
        .headline-accent { color: #4ade80; }

        .subtext {
          font-size: 14.5px;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin: 0;
        }

        /* STEPS */
        .steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .step-num {
          width: 32px; height: 32px;
          background: rgba(74,222,128,0.15);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
          color: #4ade80;
          flex-shrink: 0;
          letter-spacing: 0.3px;
        }
        .step-title {
          font-size: 13.5px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-bottom: 2px;
        }
        .step-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          line-height: 1.4;
        }

        /* STATS */
        .stats-row {
          display: flex;
          align-items: center;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px 22px;
          width: fit-content;
        }
        .stat-item { text-align: center; padding: 0 18px; }
        .stat-num { display: block; font-size: 18px; font-weight: 800; color: #4ade80; letter-spacing: -0.5px; }
        .stat-lbl { display: block; font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 2px; }
        .stat-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.1); }

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
          padding: 36px 34px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(0,0,0,0.07);
          animation: fadeUp 0.6s ease both 0.1s;
        }

        .form-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .form-logo-sm {
          display: flex;
          justify-content: center;
          margin-bottom: 14px;
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
          font-size: 22px;
          font-weight: 800;
          color: #0f1f14;
          letter-spacing: -0.5px;
          margin: 0 0 5px;
        }
        .form-sub {
          font-size: 13px;
          color: #6b7c72;
          margin: 0;
          line-height: 1.5;
        }

        /* ERROR */
        .error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #be123c;
          margin-bottom: 18px;
          font-weight: 500;
        }

        /* FIELDS */
        .fields { display: flex; flex-direction: column; gap: 16px; }
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

        /* STRENGTH */
        .strength-wrap {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          animation: fadeUp 0.3s ease both;
        }
        .strength-track {
          height: 5px;
          background: #e5ede8;
          border-radius: 100px;
          overflow: hidden;
        }
        .strength-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s;
        }
        .strength-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .strength-label {
          font-size: 12px;
          font-weight: 700;
        }
        .strength-hint {
          font-size: 11.5px;
          color: #8fa898;
        }
        .strength-segments {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 12px;
          margin-top: 2px;
        }
        .seg-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          transition: color 0.2s;
        }
        .seg-ok { color: #16a34a; }
        .seg-no { color: #adc0b4; }
        .seg-dot { font-size: 11px; font-weight: 700; }

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
          transition: color 0.15s, transform 0.3s;
        }
        .captcha-refresh:hover { color: #16a34a; transform: rotate(180deg); }
        .captcha-input-wrap { flex: 1; }
        .captcha-input-wrap .field-input { padding-left: 14px; }

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
          margin-top: 4px;
        }
        .submit-btn:hover {
          background: linear-gradient(135deg, #15803d, #166534);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(22,163,74,0.4);
        }
        .submit-btn:active { transform: translateY(0); }

        /* LOGIN LINK */
        .login-row {
          text-align: center;
          font-size: 13.5px;
          color: #6b7c72;
          margin: 0;
        }
        .login-link {
          color: #16a34a;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.15s;
        }
        .login-link:hover { color: #14532d; text-decoration: underline; }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}