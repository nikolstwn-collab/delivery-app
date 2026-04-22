"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "Pengiriman", path: "/kirim", icon: "📦" },
  { name: "Lacak Paket", path: "/lacak", icon: "🔍" },
  { name: "History", path: "/history", icon: "📜" },
  { name: "About Us", path: "/about", icon: "ℹ️" },
];

export default function LacakPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resiInput, setResiInput] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => { router.push(path); setSidebarOpen(false); };
  const handleTrack = () => {
    if (!resiInput.trim()) { setError("Masukkan nomor resi terlebih dahulu."); return; }
    setError(""); setLoading(true); setResult(null);
    setTimeout(() => {
      const found = dummyData[resiInput.trim().toUpperCase()];
      found ? setResult(found) : setError("Nomor resi tidak ditemukan. Coba: CGL-2024-00123 atau CGL-2024-00456");
      setLoading(false);
    }, 1200);
  };

  const S: React.CSSProperties & Record<string, unknown> = {};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        .lk-page{font-family:'Sora','Segoe UI',sans-serif;min-height:100vh;background:#f0fdf4;}

        /* overlay */
        .lk-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;backdrop-filter:blur(2px);}
        .lk-ov.open{display:block;}

        /* sidebar */
        .lk-sb{position:fixed;top:0;left:-270px;width:256px;height:100vh;background:linear-gradient(180deg,#064e3b 0%,#065f46 60%,#047857 100%);z-index:300;transition:left .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:none;}
        .lk-sb.open{left:0;box-shadow:4px 0 32px rgba(0,0,0,0.18);}

        .lk-sb-head{display:flex;align-items:center;justify-content:space-between;padding:18px 18px 14px;border-bottom:1px solid rgba(255,255,255,.1);}
        .lk-sb-logo{font-size:19px;font-weight:800;color:#fff;letter-spacing:-.5px;}
        .lk-sb-logo span{color:#6ee7b7;}
        .lk-sb-x{background:rgba(255,255,255,.08);border:none;cursor:pointer;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:background .2s;color:#a7f3d0;font-size:16px;}
        .lk-sb-x:hover{background:rgba(255,255,255,.18);}

        .lk-sb-nav{flex:1;padding:10px 0;overflow-y:auto;}
        .lk-sb-item{display:flex;align-items:center;gap:11px;padding:11px 18px;cursor:pointer;color:#a7f3d0;font-size:13px;font-weight:500;transition:all .2s;border-left:3px solid transparent;user-select:none;}
        .lk-sb-item:hover{background:rgba(255,255,255,.08);color:#fff;}
        .lk-sb-item.active{background:rgba(110,231,183,.12);color:#6ee7b7;font-weight:600;border-left-color:#6ee7b7;}
        .lk-sb-ico{font-size:17px;width:22px;text-align:center;flex-shrink:0;}

        .lk-sb-foot{padding:14px 18px;border-top:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:10px;}
        .lk-sb-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#059669,#34d399);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
        .lk-sb-uname{font-size:13px;font-weight:600;color:#fff;}
        .lk-sb-urole{font-size:11px;color:#6ee7b7;}

        /* topbar */
        .lk-topbar{position:sticky;top:0;z-index:100;background:linear-gradient(135deg,#064e3b 0%,#065f46 50%,#047857 100%);box-shadow:0 2px 20px rgba(6,78,59,.35);height:60px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;}
        .lk-tb-left{display:flex;align-items:center;gap:10px;}
        .lk-hbg{background:rgba(255,255,255,.08);border:none;cursor:pointer;width:36px;height:36px;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;transition:background .2s;flex-shrink:0;}
        .lk-hbg:hover{background:rgba(255,255,255,.18);}
        .lk-hbg span{display:block;width:19px;height:2px;background:#fff;border-radius:2px;transition:.3s;}
        .lk-bc{color:#a7f3d0;font-size:13px;font-weight:500;}
        .lk-bc strong{color:#fff;font-weight:700;}
        .lk-tb-right{display:flex;align-items:center;gap:8px;}
        .lk-bell{position:relative;width:36px;height:36px;background:rgba(255,255,255,.08);border:none;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:background .2s;}
        .lk-bell:hover{background:rgba(255,255,255,.18);}
        .lk-bdg{position:absolute;top:7px;right:7px;width:7px;height:7px;background:#f87171;border-radius:50%;border:1.5px solid #064e3b;}
        .lk-cta-btn{padding:7px 14px;background:#6ee7b7;color:#064e3b;border:none;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;white-space:nowrap;}
        .lk-cta-btn:hover{background:#34d399;}

        /* hero */
        .lk-hero{background:linear-gradient(135deg,#064e3b 0%,#065f46 40%,#059669 80%,#10b981 100%);padding:52px 24px 76px;text-align:center;position:relative;overflow:hidden;}
        .lk-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
        .lk-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(110,231,183,.15);border:1px solid rgba(110,231,183,.3);color:#6ee7b7;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:100px;margin-bottom:16px;position:relative;}
        .lk-h1{font-size:clamp(24px,4vw,42px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:10px;letter-spacing:-1px;position:relative;}
        .lk-h1 span{color:#6ee7b7;}
        .lk-hsub{color:#a7f3d0;font-size:15px;max-width:460px;margin:0 auto 28px;line-height:1.6;position:relative;}

        /* search card */
        .lk-sc{background:#fff;border-radius:20px;padding:24px;max-width:580px;margin:0 auto;box-shadow:0 20px 60px rgba(0,0,0,.2);position:relative;z-index:1;}
        .lk-sc-lbl{font-size:11px;font-weight:700;color:#065f46;margin-bottom:10px;display:block;letter-spacing:.8px;text-transform:uppercase;}
        .lk-sc-row{display:flex;gap:10px;}
        .lk-inp{flex:1;padding:13px 16px;border:2px solid #d1fae5;border-radius:12px;font-size:14px;font-family:inherit;color:#064e3b;background:#f0fdf4;outline:none;transition:border .2s;}
        .lk-inp:focus{border-color:#059669;background:#fff;}
        .lk-inp::placeholder{color:#9ca3af;}
        .lk-tbtn{padding:13px 22px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit;white-space:nowrap;}
        .lk-tbtn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(5,150,105,.4);}
        .lk-tbtn:disabled{opacity:.7;cursor:not-allowed;transform:none;}
        .lk-hint{font-size:12px;color:#9ca3af;margin-top:8px;}
        .lk-err{color:#dc2626;font-size:12px;margin-top:8px;font-weight:500;}

        /* main */
        .lk-main{max-width:800px;margin:0 auto;padding:32px 20px 64px;}
        .lk-spin-wrap{text-align:center;padding:48px 0;}
        .lk-spin{width:42px;height:42px;border:4px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:lkSpin .8s linear infinite;margin:0 auto 12px;}
        @keyframes lkSpin{to{transform:rotate(360deg)}}

        .lk-rc{background:#fff;border-radius:20px;padding:24px;margin-bottom:16px;box-shadow:0 4px 20px rgba(6,78,59,.08);border:1px solid #d1fae5;}
        .lk-rt{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px;}
        .lk-rtag{font-size:12px;font-weight:700;letter-spacing:1px;color:#065f46;background:#ecfdf5;padding:5px 12px;border-radius:8px;border:1px solid #a7f3d0;}
        .lk-stag{font-size:12px;font-weight:700;padding:5px 12px;border-radius:8px;display:flex;align-items:center;gap:5px;}
        .lk-dot{width:7px;height:7px;border-radius:50%;animation:lkPulse 1.5s ease-in-out infinite;}
        @keyframes lkPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
        .lk-route{display:flex;align-items:center;gap:12px;background:#f0fdf4;border-radius:14px;padding:14px;margin-bottom:16px;flex-wrap:wrap;}
        .lk-city{text-align:center;flex:1;min-width:70px;}
        .lk-clbl{font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px;}
        .lk-cname{font-size:13px;font-weight:700;color:#064e3b;}
        .lk-arr{font-size:18px;color:#059669;flex-shrink:0;}
        .lk-pb{flex:2;min-width:70px;}
        .lk-pbw{background:#d1fae5;border-radius:100px;height:6px;overflow:hidden;}
        .lk-pbf{background:linear-gradient(90deg,#059669,#34d399);height:100%;border-radius:100px;}
        .lk-pbl{font-size:10px;color:#059669;text-align:center;margin-top:3px;font-weight:600;}
        .lk-ig{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;}
        .lk-il{font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px;}
        .lk-iv{font-size:13px;font-weight:600;color:#064e3b;}

        .lk-tlc{background:#fff;border-radius:20px;padding:24px;box-shadow:0 4px 20px rgba(6,78,59,.08);border:1px solid #d1fae5;}
        .lk-tlt{font-size:14px;font-weight:700;color:#064e3b;margin-bottom:20px;}
        .lk-tli{display:flex;gap:13px;padding-bottom:22px;}
        .lk-tli:last-child{padding-bottom:0;}
        .lk-tlil{display:flex;flex-direction:column;align-items:center;}
        .lk-tlico{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;border:2px solid;}
        .lk-tlico.done{background:#ecfdf5;border-color:#059669;}
        .lk-tlico.pending{background:#f9fafb;border-color:#d1d5db;}
        .lk-tlln{width:2px;flex:1;margin-top:4px;min-height:14px;}
        .lk-tlln.done{background:#059669;}
        .lk-tlln.pending{background:#e5e7eb;}
        .lk-tlb{padding-top:5px;flex:1;}
        .lk-tls{font-size:13px;font-weight:600;color:#064e3b;margin-bottom:3px;}
        .lk-tls.pending{color:#9ca3af;}
        .lk-tlm{font-size:11px;color:#6b7280;display:flex;gap:10px;flex-wrap:wrap;}

        .lk-empty{text-align:center;padding:48px 20px;background:#fff;border-radius:20px;box-shadow:0 4px 20px rgba(6,78,59,.06);border:1px solid #d1fae5;}
        .lk-ei{font-size:52px;margin-bottom:12px;}
        .lk-et{font-size:17px;font-weight:700;color:#064e3b;margin-bottom:6px;}
        .lk-es{color:#6b7280;font-size:13px;max-width:300px;margin:0 auto 18px;line-height:1.6;}
        .lk-esamps{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}
        .lk-sbtn{padding:7px 14px;background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:.2s;}
        .lk-sbtn:hover{background:#d1fae5;}

        .lk-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;}
        .lk-stat{background:#fff;border-radius:14px;padding:18px 12px;text-align:center;border:1px solid #d1fae5;transition:transform .2s;}
        .lk-stat:hover{transform:translateY(-3px);}
        .lk-sti{font-size:24px;margin-bottom:6px;}
        .lk-stn{font-size:19px;font-weight:800;color:#064e3b;}
        .lk-stl{font-size:11px;color:#6b7280;margin-top:2px;}

        @media(max-width:520px){
          .lk-sc-row{flex-direction:column;}
          .lk-tbtn{width:100%;}
          .lk-route{flex-direction:column;}
          .lk-cta-btn{display:none;}
        }
      `}</style>

      <div className="lk-page">

        {/* OVERLAY */}
        <div className={`lk-ov${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

        {/* SIDEBAR */}
        <aside className={`lk-sb${sidebarOpen ? " open" : ""}`}>
          <div className="lk-sb-head">
            <span className="lk-sb-logo">Cargo<span>Lite</span></span>
            <button className="lk-sb-x" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <nav className="lk-sb-nav">
            {menu.map((item) => (
              <div key={item.path} className={`lk-sb-item${pathname === item.path ? " active" : ""}`}
                onClick={() => handleNavigate(item.path)}>
                <span className="lk-sb-ico">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </nav>
          <div className="lk-sb-foot">
            <div className="lk-sb-av">N</div>
            <div>
              <div className="lk-sb-uname">Nikol</div>
              <div className="lk-sb-urole">User</div>
            </div>
          </div>
        </aside>

        {/* TOPBAR */}
        <header className="lk-topbar">
          <div className="lk-tb-left">
            <button className="lk-hbg" onClick={() => setSidebarOpen(true)}>
              <span /><span /><span />
            </button>
            <span className="lk-bc">CargoLite / <strong>Lacak Paket</strong></span>
          </div>
          <div className="lk-tb-right">
            <button className="lk-bell">🔔<span className="lk-bdg" /></button>
            <button className="lk-cta-btn" onClick={() => router.push("/kirim")}>+ Buat Pengiriman</button>
          </div>
        </header>

        {/* HERO */}
        <div className="lk-hero">
          <div className="lk-pill">🚚 Real-Time Tracking</div>
          <h1 className="lk-h1">Lacak Paket <span>CargoLite</span><br />Kapan Saja, Di Mana Saja</h1>
          <p className="lk-hsub">Pantau status pengiriman barang Anda secara real-time dengan akurasi tinggi.</p>
          <div className="lk-sc">
            <label className="lk-sc-lbl">Nomor Resi / Tracking ID</label>
            <div className="lk-sc-row">
              <input className="lk-inp" placeholder="Contoh: CGL-2024-00123" value={resiInput}
                onChange={(e) => setResiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()} />
              <button className="lk-tbtn" onClick={handleTrack} disabled={loading}>
                {loading ? "⏳ Melacak..." : "🔍 Lacak"}
              </button>
            </div>
            {error && <p className="lk-err">⚠️ {error}</p>}
            {!error && <p className="lk-hint">💡 Masukkan nomor resi pada bukti pengiriman Anda</p>}
          </div>
        </div>

        {/* CONTENT */}
        <div className="lk-main">
          {!result && !loading && (
            <>
              <div className="lk-stats">
                <div className="lk-stat"><div className="lk-sti">📦</div><div className="lk-stn">12.4K</div><div className="lk-stl">Paket Hari Ini</div></div>
                <div className="lk-stat"><div className="lk-sti">✅</div><div className="lk-stn">98.7%</div><div className="lk-stl">Tepat Waktu</div></div>
                <div className="lk-stat"><div className="lk-sti">🚛</div><div className="lk-stn">340+</div><div className="lk-stl">Kota Terjangkau</div></div>
              </div>
              <div className="lk-empty">
                <div className="lk-ei">🗺️</div>
                <h2 className="lk-et">Masukkan Nomor Resi Anda</h2>
                <p className="lk-es">Gunakan nomor resi pada bukti pengiriman untuk melihat status terkini.</p>
                <div className="lk-esamps">
                  <button className="lk-sbtn" onClick={() => setResiInput("CGL-2024-00123")}>CGL-2024-00123</button>
                  <button className="lk-sbtn" onClick={() => setResiInput("CGL-2024-00456")}>CGL-2024-00456</button>
                </div>
              </div>
            </>
          )}
          {loading && (
            <div className="lk-spin-wrap">
              <div className="lk-spin" />
              <p style={{ color: "#065f46", fontWeight: 600, fontSize: 14 }}>Mencari data pengiriman...</p>
            </div>
          )}
          {result && (
            <>
              <div className="lk-rc">
                <div className="lk-rt">
                  <span className="lk-rtag">📋 {result.resi}</span>
                  <span className="lk-stag" style={{ background: result.statusColor + "15", color: result.statusColor, border: `1px solid ${result.statusColor}40` }}>
                    <span className="lk-dot" style={{ background: result.statusColor }} />{result.status}
                  </span>
                </div>
                <div className="lk-route">
                  <div className="lk-city"><div className="lk-clbl">Asal</div><div className="lk-cname">🏙️ {result.origin}</div></div>
                  <div className="lk-pb">
                    <div className="lk-pbw"><div className="lk-pbf" style={{ width: result.status === "Terkirim" ? "100%" : "65%" }} /></div>
                    <div className="lk-pbl">{result.status === "Terkirim" ? "✅ Selesai" : "🚛 65%"}</div>
                  </div>
                  <span className="lk-arr">→</span>
                  <div className="lk-city"><div className="lk-clbl">Tujuan</div><div className="lk-cname">🏙️ {result.destination}</div></div>
                </div>
                <div className="lk-ig">
                  <div><div className="lk-il">Pengirim</div><div className="lk-iv">{result.pengirim}</div></div>
                  <div><div className="lk-il">Penerima</div><div className="lk-iv">{result.penerima}</div></div>
                  <div><div className="lk-il">Estimasi Tiba</div><div className="lk-iv">📅 {result.estimasi}</div></div>
                  <div><div className="lk-il">Berat</div><div className="lk-iv">⚖️ {result.berat}</div></div>
                  <div><div className="lk-il">Layanan</div><div className="lk-iv">🚚 {result.layanan}</div></div>
                </div>
              </div>
              <div className="lk-tlc">
                <div className="lk-tlt">📍 Riwayat Perjalanan Paket</div>
                {result.events.map((ev, i) => (
                  <div className="lk-tli" key={i}>
                    <div className="lk-tlil">
                      <div className={`lk-tlico ${ev.completed ? "done" : "pending"}`}>{ev.icon}</div>
                      {i < result.events.length - 1 && <div className={`lk-tlln ${ev.completed ? "done" : "pending"}`} />}
                    </div>
                    <div className="lk-tlb">
                      <div className={`lk-tls${ev.completed ? "" : " pending"}`}>{ev.status}</div>
                      <div className="lk-tlm"><span>📍 {ev.location}</span><span>🕐 {ev.date} {ev.time}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 18 }}>
                <button className="lk-sbtn" style={{ padding: "10px 22px", fontSize: 13 }}
                  onClick={() => { setResult(null); setResiInput(""); }}>🔄 Lacak Paket Lain</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}