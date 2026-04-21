"use client";

import { useState } from "react";

interface TrackingEvent {
  status: string;
  location: string;
  time: string;
  date: string;
  icon: string;
  completed: boolean;
}

interface TrackingResult {
  resi: string;
  status: string;
  statusColor: string;
  pengirim: string;
  penerima: string;
  origin: string;
  destination: string;
  estimasi: string;
  berat: string;
  layanan: string;
  events: TrackingEvent[];
}

const dummyData: Record<string, TrackingResult> = {
  "CGL-2024-00123": {
    resi: "CGL-2024-00123",
    status: "Dalam Perjalanan",
    statusColor: "#16a34a",
    pengirim: "PT. Maju Jaya Indonesia",
    penerima: "Budi Santoso",
    origin: "Jakarta Pusat",
    destination: "Surabaya",
    estimasi: "23 April 2025",
    berat: "12.5 kg",
    layanan: "Express Cargo",
    events: [
      { status: "Paket tiba di gudang tujuan", location: "Surabaya Hub", time: "08:30", date: "21 Apr 2025", icon: "📦", completed: true },
      { status: "Dalam perjalanan ke kota tujuan", location: "Semarang Transit", time: "02:15", date: "21 Apr 2025", icon: "🚛", completed: true },
      { status: "Berangkat dari gudang asal", location: "Jakarta Pusat Hub", time: "22:00", date: "20 Apr 2025", icon: "🏭", completed: true },
      { status: "Paket telah diproses", location: "Jakarta Pusat Hub", time: "18:45", date: "20 Apr 2025", icon: "⚙️", completed: true },
      { status: "Paket diterima oleh CargoLite", location: "Jakarta Pusat", time: "14:20", date: "20 Apr 2025", icon: "✅", completed: true },
      { status: "Pengiriman ke alamat penerima", location: "Surabaya", time: "Estimasi 23 Apr", date: "", icon: "🏠", completed: false },
    ],
  },
  "CGL-2024-00456": {
    resi: "CGL-2024-00456",
    status: "Terkirim",
    statusColor: "#0284c7",
    pengirim: "Toko Online Berkah",
    penerima: "Siti Rahayu",
    origin: "Bandung",
    destination: "Yogyakarta",
    estimasi: "Sudah Terkirim",
    berat: "3.2 kg",
    layanan: "Regular Cargo",
    events: [
      { status: "Paket berhasil diterima penerima", location: "Yogyakarta", time: "13:10", date: "19 Apr 2025", icon: "🎉", completed: true },
      { status: "Kurir menuju alamat penerima", location: "Yogyakarta", time: "09:00", date: "19 Apr 2025", icon: "🛵", completed: true },
      { status: "Paket tiba di kota tujuan", location: "Yogyakarta Hub", time: "06:30", date: "19 Apr 2025", icon: "📦", completed: true },
      { status: "Dalam perjalanan", location: "Purwokerto Transit", time: "01:00", date: "19 Apr 2025", icon: "🚛", completed: true },
      { status: "Berangkat dari Bandung", location: "Bandung Hub", time: "20:00", date: "18 Apr 2025", icon: "🏭", completed: true },
      { status: "Paket diterima oleh CargoLite", location: "Bandung", time: "10:15", date: "18 Apr 2025", icon: "✅", completed: true },
    ],
  },
};

export default function LacakPage() {
  const [resiInput, setResiInput] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTrack = () => {
    if (!resiInput.trim()) {
      setError("Masukkan nomor resi terlebih dahulu.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const found = dummyData[resiInput.trim().toUpperCase()];
      if (found) {
        setResult(found);
      } else {
        setError("Nomor resi tidak ditemukan. Coba: CGL-2024-00123 atau CGL-2024-00456");
      }
      setLoading(false);
    }, 1200);
  };

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: "🏠" },
    { label: "Pengiriman", href: "#", icon: "📮" },
    { label: "Lacak", href: "#", icon: "🔍", active: true },
    { label: "History", href: "#", icon: "📋" },
    { label: "About Us", href: "#", icon: "ℹ️" },
  ];

  return (
    <div style={{ fontFamily: "'Sora', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f0fdf4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .topbar {
          position: sticky; top: 0; z-index: 100;
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
          box-shadow: 0 2px 20px rgba(6,78,59,0.4);
          padding: 0 24px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo-text {
          font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px;
        }
        .logo-text span { color: #6ee7b7; }
        .nav-desktop {
          display: flex; gap: 4px;
        }
        .nav-link {
          padding: 8px 16px; border-radius: 8px; color: #a7f3d0;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.2s; text-decoration: none; display: flex; align-items: center; gap: 6px;
          border: none; background: transparent;
        }
        .nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .nav-link.active { background: rgba(110,231,183,0.15); color: #6ee7b7; font-weight: 600; border: 1px solid rgba(110,231,183,0.3); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          background: none; border: none; padding: 4px;
        }
        .hamburger span { display: block; width: 24px; height: 2px; background: #fff; border-radius: 2px; transition: 0.3s; }
        .sidebar-overlay {
          display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200;
        }
        .sidebar-overlay.open { display: block; }
        .sidebar {
          position: fixed; top: 0; left: -280px; width: 280px; height: 100vh;
          background: linear-gradient(180deg, #064e3b, #047857);
          z-index: 300; transition: left 0.3s ease; padding: 24px 0;
        }
        .sidebar.open { left: 0; }
        .sidebar-header { padding: 0 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .sidebar-close { background: none; border: none; color: #a7f3d0; font-size: 24px; cursor: pointer; }
        .sidebar-link { display: flex; align-items: center; gap: 12px; padding: 14px 24px; color: #a7f3d0; font-size: 15px; font-weight: 500; cursor: pointer; transition: 0.2s; text-decoration: none; }
        .sidebar-link:hover, .sidebar-link.active { background: rgba(255,255,255,0.1); color: #fff; }
        .sidebar-link.active { border-left: 3px solid #6ee7b7; }

        .hero-section {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 40%, #059669 80%, #10b981 100%);
          padding: 60px 24px 80px;
          text-align: center; position: relative; overflow: hidden;
        }
        .hero-section::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(110,231,183,0.15); border: 1px solid rgba(110,231,183,0.3);
          color: #6ee7b7; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px; margin-bottom: 20px;
        }
        .hero-title {
          font-size: clamp(28px, 5vw, 48px); font-weight: 800; color: #fff; line-height: 1.15;
          margin-bottom: 12px; letter-spacing: -1px;
        }
        .hero-title span { color: #6ee7b7; }
        .hero-sub { color: #a7f3d0; font-size: 16px; max-width: 500px; margin: 0 auto 36px; line-height: 1.6; }

        .search-card {
          background: #fff; border-radius: 20px; padding: 28px;
          max-width: 640px; margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2); position: relative; z-index: 1;
        }
        .search-label { font-size: 13px; font-weight: 600; color: #065f46; margin-bottom: 10px; display: block; letter-spacing: 0.3px; }
        .input-wrapper { display: flex; gap: 10px; }
        .resi-input {
          flex: 1; padding: 14px 18px; border: 2px solid #d1fae5; border-radius: 12px;
          font-size: 15px; font-family: inherit; color: #064e3b; background: #f0fdf4;
          outline: none; transition: border 0.2s;
        }
        .resi-input:focus { border-color: #059669; background: #fff; }
        .resi-input::placeholder { color: #9ca3af; }
        .track-btn {
          padding: 14px 28px; background: linear-gradient(135deg, #059669, #047857);
          color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap;
        }
        .track-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(5,150,105,0.4); }
        .track-btn:active { transform: translateY(0); }
        .hint-text { font-size: 12px; color: #6b7280; margin-top: 10px; }
        .error-text { color: #dc2626; font-size: 13px; margin-top: 10px; font-weight: 500; }

        .main-content { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; }

        .loading-wrap { text-align: center; padding: 48px 0; }
        .spinner {
          width: 48px; height: 48px; border: 4px solid #d1fae5; border-top-color: #059669;
          border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .result-header {
          background: #fff; border-radius: 20px; padding: 28px; margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(6,78,59,0.08); border: 1px solid #d1fae5;
        }
        .rh-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
        .resi-badge {
          font-size: 13px; font-weight: 700; letter-spacing: 1px; color: #065f46;
          background: #ecfdf5; padding: 6px 14px; border-radius: 8px; border: 1px solid #a7f3d0;
        }
        .status-badge {
          font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 8px;
          display: flex; align-items: center; gap: 6px;
        }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .route-display {
          display: flex; align-items: center; gap: 12px; background: #f0fdf4;
          border-radius: 14px; padding: 18px; margin-bottom: 20px;
        }
        .route-city { text-align: center; flex: 1; }
        .rc-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .rc-name { font-size: 16px; font-weight: 700; color: #064e3b; }
        .route-arrow { font-size: 24px; color: #059669; flex-shrink: 0; }
        .route-progress { flex: 2; }
        .progress-bar-wrap { background: #d1fae5; border-radius: 100px; height: 6px; overflow: hidden; }
        .progress-bar-fill { background: linear-gradient(90deg, #059669, #34d399); height: 100%; border-radius: 100px; transition: width 0.8s ease; }
        .progress-label { font-size: 11px; color: #059669; text-align: center; margin-top: 4px; font-weight: 600; }

        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
        .info-item { }
        .ii-label { font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
        .ii-value { font-size: 14px; font-weight: 600; color: #064e3b; }

        .timeline-card {
          background: #fff; border-radius: 20px; padding: 28px;
          box-shadow: 0 4px 20px rgba(6,78,59,0.08); border: 1px solid #d1fae5;
        }
        .tc-title { font-size: 16px; font-weight: 700; color: #064e3b; margin-bottom: 24px; display: flex; align-items: center; gap: 8px; }
        .timeline { position: relative; }
        .timeline-item { display: flex; gap: 16px; position: relative; padding-bottom: 28px; }
        .timeline-item:last-child { padding-bottom: 0; }
        .tl-left { display: flex; flex-direction: column; align-items: center; }
        .tl-icon {
          width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0; border: 2px solid;
        }
        .tl-icon.done { background: #ecfdf5; border-color: #059669; }
        .tl-icon.pending { background: #f9fafb; border-color: #d1d5db; }
        .tl-line { width: 2px; flex: 1; margin-top: 4px; min-height: 20px; }
        .tl-line.done { background: #059669; }
        .tl-line.pending { background: #e5e7eb; border: 1px dashed #d1d5db; }
        .tl-content { padding-top: 8px; flex: 1; }
        .tl-status { font-size: 14px; font-weight: 600; color: #064e3b; margin-bottom: 4px; }
        .tl-status.pending { color: #9ca3af; }
        .tl-meta { font-size: 12px; color: #6b7280; display: flex; gap: 12px; flex-wrap: wrap; }
        .tl-loc::before { content: "📍 "; }
        .tl-time::before { content: "🕐 "; }

        .empty-state {
          text-align: center; padding: 60px 24px;
          background: #fff; border-radius: 20px;
          box-shadow: 0 4px 20px rgba(6,78,59,0.06); border: 1px solid #d1fae5;
        }
        .es-icon { font-size: 64px; margin-bottom: 16px; }
        .es-title { font-size: 20px; font-weight: 700; color: #064e3b; margin-bottom: 8px; }
        .es-sub { color: #6b7280; font-size: 14px; max-width: 320px; margin: 0 auto 24px; line-height: 1.6; }
        .es-samples { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .sample-btn {
          padding: 8px 16px; background: #ecfdf5; border: 1px solid #a7f3d0;
          color: #065f46; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: 0.2s;
        }
        .sample-btn:hover { background: #d1fae5; }

        .stats-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 40px;
        }
        .stat-card {
          background: #fff; border-radius: 16px; padding: 20px 16px; text-align: center;
          border: 1px solid #d1fae5; box-shadow: 0 2px 10px rgba(6,78,59,0.05);
        }
        .sc-icon { font-size: 28px; margin-bottom: 8px; }
        .sc-num { font-size: 24px; font-weight: 800; color: #064e3b; }
        .sc-label { font-size: 12px; color: #6b7280; margin-top: 2px; }

        @media (max-width: 640px) {
          .nav-desktop { display: none; }
          .hamburger { display: flex; }
          .input-wrapper { flex-direction: column; }
          .track-btn { width: 100%; }
          .route-display { flex-direction: column; }
          .stats-row { grid-template-columns: repeat(3, 1fr); }
          .sc-num { font-size: 18px; }
        }
      `}</style>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <div className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <span className="logo-text">Cargo<span>Lite</span></span>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} className={`sidebar-link${l.active ? " active" : ""}`}>
            <span>{l.icon}</span> {l.label}
          </a>
        ))}
      </div>

      {/* Topbar */}
      <nav className="topbar">
        <div className="logo-text">Cargo<span>Lite</span></div>
        <div className="nav-desktop">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className={`nav-link${l.active ? " active" : ""}`}>
              {l.label}
            </a>
          ))}
        </div>
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Hero + Search */}
      <div className="hero-section">
        <div className="hero-badge">🚚 Real-Time Tracking</div>
        <h1 className="hero-title">Lacak Paket <span>CargoLite</span><br />Kapan Saja, Di Mana Saja</h1>
        <p className="hero-sub">Pantau status pengiriman barang Anda secara real-time dengan akurasi tinggi dan update terkini.</p>

        <div className="search-card">
          <label className="search-label">NOMOR RESI / TRACKING ID</label>
          <div className="input-wrapper">
            <input
              className="resi-input"
              placeholder="Contoh: CGL-2024-00123"
              value={resiInput}
              onChange={(e) => setResiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <button className="track-btn" onClick={handleTrack} disabled={loading}>
              {loading ? "⏳ Melacak..." : "🔍 Lacak"}
            </button>
          </div>
          {error && <p className="error-text">⚠️ {error}</p>}
          {!error && <p className="hint-text">💡 Masukkan nomor resi untuk melihat status pengiriman Anda</p>}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Stats Row */}
        {!result && !loading && (
          <>
            <div className="stats-row">
              <div className="stat-card"><div className="sc-icon">📦</div><div className="sc-num">12.4K</div><div className="sc-label">Paket Hari Ini</div></div>
              <div className="stat-card"><div className="sc-icon">✅</div><div className="sc-num">98.7%</div><div className="sc-label">Tepat Waktu</div></div>
              <div className="stat-card"><div className="sc-icon">🚛</div><div className="sc-num">340+</div><div className="sc-label">Kota Terjangkau</div></div>
            </div>

            <div className="empty-state">
              <div className="es-icon">🗺️</div>
              <h2 className="es-title">Masukkan Nomor Resi Anda</h2>
              <p className="es-sub">Gunakan nomor resi yang tertera pada bukti pengiriman Anda untuk melihat status terkini.</p>
              <div className="es-samples">
                <button className="sample-btn" onClick={() => { setResiInput("CGL-2024-00123"); }}>CGL-2024-00123</button>
                <button className="sample-btn" onClick={() => { setResiInput("CGL-2024-00456"); }}>CGL-2024-00456</button>
              </div>
            </div>
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-wrap">
            <div className="spinner" />
            <p style={{ color: "#065f46", fontWeight: 600 }}>Mencari data pengiriman...</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <>
            {/* Header card */}
            <div className="result-header">
              <div className="rh-top">
                <span className="resi-badge">📋 {result.resi}</span>
                <span className="status-badge" style={{ background: result.statusColor + "15", color: result.statusColor, border: `1px solid ${result.statusColor}40` }}>
                  <span className="status-dot" style={{ background: result.statusColor }} />
                  {result.status}
                </span>
              </div>

              <div className="route-display">
                <div className="route-city">
                  <div className="rc-label">Asal</div>
                  <div className="rc-name">🏙️ {result.origin}</div>
                </div>
                <div style={{ flex: 2 }}>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: result.status === "Terkirim" ? "100%" : "65%" }} />
                  </div>
                  <div className="progress-label">{result.status === "Terkirim" ? "✅ Selesai" : "🚛 Dalam Perjalanan (65%)"}</div>
                </div>
                <span className="route-arrow">→</span>
                <div className="route-city">
                  <div className="rc-label">Tujuan</div>
                  <div className="rc-name">🏙️ {result.destination}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item"><div className="ii-label">Pengirim</div><div className="ii-value">{result.pengirim}</div></div>
                <div className="info-item"><div className="ii-label">Penerima</div><div className="ii-value">{result.penerima}</div></div>
                <div className="info-item"><div className="ii-label">Estimasi Tiba</div><div className="ii-value">📅 {result.estimasi}</div></div>
                <div className="info-item"><div className="ii-label">Berat</div><div className="ii-value">⚖️ {result.berat}</div></div>
                <div className="info-item"><div className="ii-label">Layanan</div><div className="ii-value">🚚 {result.layanan}</div></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline-card">
              <div className="tc-title">📍 Riwayat Perjalanan Paket</div>
              <div className="timeline">
                {result.events.map((ev, i) => (
                  <div className="timeline-item" key={i}>
                    <div className="tl-left">
                      <div className={`tl-icon ${ev.completed ? "done" : "pending"}`}>{ev.icon}</div>
                      {i < result.events.length - 1 && (
                        <div className={`tl-line ${ev.completed ? "done" : "pending"}`} />
                      )}
                    </div>
                    <div className="tl-content">
                      <div className={`tl-status ${ev.completed ? "" : "pending"}`}>{ev.status}</div>
                      <div className="tl-meta">
                        <span className="tl-loc">{ev.location}</span>
                        {ev.date && <span className="tl-time">{ev.date} {ev.time}</span>}
                        {!ev.date && <span className="tl-time">{ev.time}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button className="sample-btn" onClick={() => { setResult(null); setResiInput(""); }}
                style={{ padding: "12px 28px", fontSize: 14 }}>
                🔄 Lacak Paket Lain
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}