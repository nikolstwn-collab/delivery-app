"use client";

import { useState } from "react";

export default function AboutUsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: "🏠" },
    { label: "Pengiriman", href: "/pengiriman", icon: "📮" },
    { label: "Lacak", href: "/lacak", icon: "🔍" },
    { label: "History", href: "/history", icon: "📋" },
    { label: "About Us", href: "/about", icon: "ℹ️", active: true },
  ];

  const stats = [
    { num: "2018", label: "Tahun Berdiri", icon: "📅" },
    { num: "340+", label: "Kota Terjangkau", icon: "🗺️" },
    { num: "1.2Jt", label: "Paket Terkirim", icon: "📦" },
    { num: "98.7%", label: "Kepuasan Pelanggan", icon: "⭐" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Akurasi Real-Time",
      desc: "Sistem tracking kami memperbarui status paket setiap 15 menit sekali, memastikan pelanggan selalu mendapat informasi terkini tanpa penundaan.",
    },
    {
      icon: "🔒",
      title: "Keamanan Terjamin",
      desc: "Setiap paket diasuransikan secara otomatis dan ditangani dengan standar pengemasan premium untuk meminimalkan risiko kerusakan selama perjalanan.",
    },
    {
      icon: "⚡",
      title: "Pengiriman Ekspres",
      desc: "Layanan Express Cargo kami menjamin pengiriman antar kota besar dalam 24 jam dengan armada kendaraan berpendingin dan GPS terintegrasi.",
    },
    {
      icon: "🤝",
      title: "Layanan 24/7",
      desc: "Tim customer support kami siap membantu Anda kapan saja melalui live chat, telepon, dan email tanpa hari libur.",
    },
    {
      icon: "🌱",
      title: "Ramah Lingkungan",
      desc: "CargoLite berkomitmen mengurangi emisi karbon dengan mengoperasikan 30% armada kendaraan listrik pada 2026 sebagai bagian dari program Green Cargo.",
    },
    {
      icon: "📊",
      title: "Laporan Transparan",
      desc: "Dapatkan laporan pengiriman bulanan terperinci, analitik biaya, dan ringkasan performa langsung di dashboard akun bisnis Anda.",
    },
  ];

  const team = [
    {
      name: "Arief Nugroho",
      role: "CEO & Co-Founder",
      bg: "#064e3b",
      initials: "AN",
      quote: "Kami percaya bahwa logistik yang efisien adalah tulang punggung perekonomian Indonesia.",
    },
    {
      name: "Dewi Kartika",
      role: "COO & Co-Founder",
      bg: "#065f46",
      initials: "DK",
      quote: "Kepercayaan pelanggan adalah aset terbesar kami. Setiap paket diperlakukan seperti milik sendiri.",
    },
    {
      name: "Raka Firmansyah",
      role: "CTO",
      bg: "#047857",
      initials: "RF",
      quote: "Teknologi adalah kunci. Kami terus berinovasi agar pengalaman tracking menjadi semudah mungkin.",
    },
    {
      name: "Sari Puspita",
      role: "Head of Operations",
      bg: "#059669",
      initials: "SP",
      quote: "Operasional yang presisi memastikan setiap paket sampai tepat waktu, setiap saat.",
    },
  ];

  const milestones = [
    { year: "2018", title: "CargoLite Berdiri", desc: "Didirikan di Jakarta dengan 5 karyawan dan armada 3 kendaraan, melayani pengiriman Jabodetabek." },
    { year: "2019", title: "Ekspansi Jawa", desc: "Membuka hub di Bandung, Semarang, Surabaya, dan Yogyakarta. Total armada mencapai 50 kendaraan." },
    { year: "2021", title: "Sistem Tracking Digital", desc: "Meluncurkan platform tracking real-time pertama kami, menggantikan proses manual sepenuhnya." },
    { year: "2022", title: "Ekspansi Nasional", desc: "Hadir di 34 provinsi dengan 340+ kota. Bermitra dengan 200+ UMKM dan perusahaan e-commerce." },
    { year: "2023", title: "1 Juta Paket", desc: "Mencapai tonggak sejarah 1 juta paket terkirim. Meluncurkan aplikasi mobile CargoLite." },
    { year: "2024", title: "Green Cargo Initiative", desc: "Memulai program kendaraan listrik dan target net-zero emission pada 2030." },
  ];

  return (
    <div style={{ fontFamily: "'Sora', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f0fdf4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── TOPBAR ── */
        .topbar {
          position: sticky; top: 0; z-index: 100;
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
          box-shadow: 0 2px 20px rgba(6,78,59,0.4);
          padding: 0 24px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo-text { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .logo-text span { color: #6ee7b7; }
        .nav-desktop { display: flex; gap: 4px; }
        .nav-link {
          padding: 8px 16px; border-radius: 8px; color: #a7f3d0;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.2s; text-decoration: none; display: flex; align-items: center; gap: 6px;
          border: none; background: transparent;
        }
        .nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .nav-link.active { background: rgba(110,231,183,0.15); color: #6ee7b7; font-weight: 600; border: 1px solid rgba(110,231,183,0.3); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #fff; border-radius: 2px; transition: 0.3s; }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; }
        .sidebar-overlay.open { display: block; }
        .sidebar { position: fixed; top: 0; left: -280px; width: 280px; height: 100vh; background: linear-gradient(180deg, #064e3b, #047857); z-index: 300; transition: left 0.3s ease; padding: 24px 0; }
        .sidebar.open { left: 0; }
        .sidebar-header { padding: 0 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .sidebar-close { background: none; border: none; color: #a7f3d0; font-size: 24px; cursor: pointer; }
        .sidebar-link { display: flex; align-items: center; gap: 12px; padding: 14px 24px; color: #a7f3d0; font-size: 15px; font-weight: 500; cursor: pointer; transition: 0.2s; text-decoration: none; }
        .sidebar-link:hover, .sidebar-link.active { background: rgba(255,255,255,0.1); color: #fff; }
        .sidebar-link.active { border-left: 3px solid #6ee7b7; }

        /* ── HERO ── */
        .hero {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 40%, #059669 80%, #10b981 100%);
          padding: 72px 24px 100px; text-align: center; position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(110,231,183,0.15); border: 1px solid rgba(110,231,183,0.3);
          color: #6ee7b7; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px; margin-bottom: 20px;
        }
        .hero-title { font-size: clamp(30px, 5vw, 52px); font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 16px; letter-spacing: -1px; }
        .hero-title span { color: #6ee7b7; }
        .hero-sub { color: #a7f3d0; font-size: 17px; max-width: 560px; margin: 0 auto; line-height: 1.7; }

        /* ── CONTENT WRAPPER ── */
        .content { max-width: 960px; margin: 0 auto; padding: 0 24px 80px; }

        /* ── FLOATING CARD OVERLAP ── */
        .intro-card {
          background: #fff; border-radius: 24px; padding: 40px;
          box-shadow: 0 20px 60px rgba(6,78,59,0.12); border: 1px solid #d1fae5;
          margin-top: -48px; position: relative; z-index: 10; margin-bottom: 56px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;
        }
        .intro-text h2 { font-size: 26px; font-weight: 800; color: #064e3b; margin-bottom: 14px; line-height: 1.3; }
        .intro-text p { color: #4b5563; font-size: 15px; line-height: 1.8; }
        .intro-text p + p { margin-top: 12px; }
        .intro-accent { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-radius: 20px; padding: 28px; border: 1px solid #a7f3d0; }
        .ia-quote { font-size: 36px; color: #059669; font-weight: 900; line-height: 1; margin-bottom: 10px; }
        .ia-text { font-size: 16px; font-style: italic; color: #065f46; font-weight: 500; line-height: 1.6; }
        .ia-by { font-size: 13px; color: #6b7280; margin-top: 10px; font-weight: 600; }

        /* ── SECTION TITLE ── */
        .section-title { text-align: center; margin-bottom: 36px; }
        .st-label { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #059669; margin-bottom: 8px; }
        .st-heading { font-size: clamp(22px, 3vw, 32px); font-weight: 800; color: #064e3b; letter-spacing: -0.5px; }
        .st-line { width: 48px; height: 3px; background: linear-gradient(90deg, #059669, #34d399); border-radius: 2px; margin: 12px auto 0; }

        /* ── STATS ── */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 64px; }
        .stat-card {
          background: #fff; border-radius: 18px; padding: 24px 16px; text-align: center;
          border: 1px solid #d1fae5; box-shadow: 0 4px 16px rgba(6,78,59,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(6,78,59,0.12); }
        .sc-icon { font-size: 32px; margin-bottom: 10px; }
        .sc-num { font-size: 28px; font-weight: 800; color: #064e3b; letter-spacing: -1px; }
        .sc-label { font-size: 13px; color: #6b7280; margin-top: 4px; font-weight: 500; }

        /* ── VALUES ── */
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 64px; }
        .value-card {
          background: #fff; border-radius: 18px; padding: 28px 24px;
          border: 1px solid #d1fae5; box-shadow: 0 4px 16px rgba(6,78,59,0.05);
          transition: all 0.25s;
        }
        .value-card:hover { border-color: #6ee7b7; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(6,78,59,0.1); }
        .vc-icon { font-size: 36px; margin-bottom: 14px; }
        .vc-title { font-size: 16px; font-weight: 700; color: #064e3b; margin-bottom: 8px; }
        .vc-desc { font-size: 14px; color: #6b7280; line-height: 1.7; }

        /* ── TIMELINE ── */
        .timeline-section { margin-bottom: 64px; }
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #059669, #34d399, #d1fae5); }
        .tl-item { position: relative; margin-bottom: 32px; }
        .tl-item:last-child { margin-bottom: 0; }
        .tl-dot { position: absolute; left: -27px; top: 4px; width: 16px; height: 16px; border-radius: 50%; background: #059669; border: 3px solid #fff; box-shadow: 0 0 0 3px #a7f3d0; }
        .tl-card { background: #fff; border-radius: 16px; padding: 20px 24px; border: 1px solid #d1fae5; box-shadow: 0 2px 12px rgba(6,78,59,0.06); }
        .tl-year { font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #059669; text-transform: uppercase; margin-bottom: 4px; }
        .tl-title { font-size: 16px; font-weight: 700; color: #064e3b; margin-bottom: 6px; }
        .tl-desc { font-size: 14px; color: #6b7280; line-height: 1.6; }

        /* ── TEAM ── */
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 64px; }
        .team-card {
          background: #fff; border-radius: 20px; overflow: hidden;
          border: 1px solid #d1fae5; box-shadow: 0 4px 16px rgba(6,78,59,0.06);
          transition: all 0.25s; text-align: center;
        }
        .team-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(6,78,59,0.12); }
        .team-avatar {
          width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
          font-size: 36px; font-weight: 800; color: #fff;
        }
        .team-info { padding: 18px 16px; }
        .ti-name { font-size: 15px; font-weight: 700; color: #064e3b; margin-bottom: 3px; }
        .ti-role { font-size: 12px; color: #059669; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .ti-quote { font-size: 13px; color: #6b7280; line-height: 1.5; font-style: italic; }

        /* ── CTA ── */
        .cta-section {
          background: linear-gradient(135deg, #064e3b, #059669);
          border-radius: 24px; padding: 48px 40px; text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .cta-title { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 12px; position: relative; }
        .cta-sub { color: #a7f3d0; font-size: 15px; margin-bottom: 28px; position: relative; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-primary { padding: 14px 32px; background: #fff; color: #065f46; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; transition: 0.2s; text-decoration: none; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
        .btn-outline { padding: 14px 32px; background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: 0.2s; text-decoration: none; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        /* ── SECTION SPACING ── */
        .mb-section { margin-bottom: 64px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: flex; }
          .intro-card { grid-template-columns: 1fr; gap: 24px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .values-grid { grid-template-columns: 1fr; }
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .team-grid { grid-template-columns: repeat(2, 1fr); }
          .cta-section { padding: 36px 24px; }
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

      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">🏢 Tentang Kami</div>
        <h1 className="hero-title">Menggerakkan Logistik<br /><span>Indonesia</span> Sejak 2018</h1>
        <p className="hero-sub">CargoLite hadir dengan misi sederhana: membuat pengiriman barang lebih mudah, lebih cepat, dan lebih transparan untuk semua orang.</p>
      </div>

      <div className="content">

        {/* Intro Card — overlaps hero */}
        <div className="intro-card">
          <div className="intro-text">
            <h2>Dari Garasi Kecil Menjadi Jaringan Nasional</h2>
            <p>CargoLite lahir pada 2018 dari sebuah ide sederhana: pengiriman barang di Indonesia seharusnya bisa dilacak secara real-time, bukan hanya menunggu kabar tiba.</p>
            <p>Berawal dari garasi di Jakarta Selatan dengan tiga kendaraan dan lima orang, kami kini beroperasi di 340+ kota dengan lebih dari 1.200 mitra pengemudi dan teknologi tracking canggih yang kami bangun sendiri.</p>
            <p>Kami bukan sekadar jasa pengiriman. Kami adalah mitra bisnis yang tumbuh bersama Anda.</p>
          </div>
          <div className="intro-accent">
            <div className="ia-quote">"</div>
            <p className="ia-text">Kepercayaan bukan diberikan, tapi dibangun — satu paket, satu pengiriman, satu senyum penerima, pada satu waktu.</p>
            <p className="ia-by">— Arief Nugroho, CEO CargoLite</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-section">
          <div className="section-title">
            <p className="st-label">Angka Bicara</p>
            <h2 className="st-heading">CargoLite dalam Angka</h2>
            <div className="st-line" />
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="sc-icon">{s.icon}</div>
                <div className="sc-num">{s.num}</div>
                <div className="sc-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-section">
          <div className="section-title">
            <p className="st-label">Keunggulan Kami</p>
            <h2 className="st-heading">Mengapa Memilih CargoLite?</h2>
            <div className="st-line" />
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <div className="vc-icon">{v.icon}</div>
                <div className="vc-title">{v.title}</div>
                <div className="vc-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section mb-section">
          <div className="section-title">
            <p className="st-label">Perjalanan Kami</p>
            <h2 className="st-heading">Tonggak Sejarah CargoLite</h2>
            <div className="st-line" />
          </div>
          <div className="timeline">
            {milestones.map((m) => (
              <div className="tl-item" key={m.year}>
                <div className="tl-dot" />
                <div className="tl-card">
                  <div className="tl-year">📅 {m.year}</div>
                  <div className="tl-title">{m.title}</div>
                  <div className="tl-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-section">
          <div className="section-title">
            <p className="st-label">Di Balik CargoLite</p>
            <h2 className="st-heading">Tim Kami</h2>
            <div className="st-line" />
          </div>
          <div className="team-grid">
            {team.map((t) => (
              <div className="team-card" key={t.name}>
                <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${t.bg}, #059669)` }}>
                  {t.initials}
                </div>
                <div className="team-info">
                  <div className="ti-name">{t.name}</div>
                  <div className="ti-role">{t.role}</div>
                  <div className="ti-quote">"{t.quote}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-title">Siap Kirim Bersama CargoLite?</h2>
          <p className="cta-sub">Bergabunglah dengan lebih dari 50.000 pelanggan yang telah mempercayakan pengiriman barang mereka kepada kami.</p>
          <div className="cta-btns">
            <a href="/pengiriman" className="btn-primary">📮 Buat Pengiriman</a>
            <a href="/lacak" className="btn-outline">🔍 Lacak Paket</a>
          </div>
        </div>

      </div>
    </div>
  );
}