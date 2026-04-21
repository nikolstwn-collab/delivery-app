"use client";

import { useState } from "react";
import styles from "./layout.module.css";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Pengiriman", path: "/kirim", icon: "📦" },
    { name: "Lacak Paket", path: "/lacak", icon: "🔍" },
    { name: "History", path: "/history", icon: "📜" },
    { name: "About Us", path: "/about", icon: "ℹ️" },
  ];

  const handleLogout = () => {
    Cookies.remove("user");
    router.push("/login");
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setSidebarOpen(false); // tutup sidebar setelah navigate
  };

  return (
    <div className={styles.wrapper}>

      {/* OVERLAY — klik di luar sidebar untuk tutup */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 200,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={styles.sidebar}
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-280px",
          width: "260px",
          height: "100vh",
          zIndex: 300,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: sidebarOpen ? "4px 0 32px rgba(0,0,0,0.18)" : "none",
        }}
      >

        {/* LOGO */}
        <div className={styles.logo}>
          <span>SwiftSend</span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
              padding: "4px",
              borderRadius: "6px",
              transition: "background 0.2s",
            }}
            title="Tutup menu"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <nav className={styles.nav}>
          {menu.map((item, i) => {
            const active = pathname === item.path;

            return (
              <div
                key={i}
                onClick={() => handleNavigate(item.path)}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <p>{item.name}</p>
              </div>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className={styles.footer}>
          <p className={styles.username}>Nikol</p>
          <span className={styles.role}>User</span>
          <button onClick={handleLogout} className={styles.logout}>
            ⏻
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <div className={styles.main}>

        {/* TOPBAR */}
        <header className={styles.topbar}>

          <div className={styles.left}>
            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "6px",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
              title="Buka menu"
            >
              <span style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
            </button>
            <span className={styles.breadcrumb}>
              SwiftSend / {pathname.replace("/", "")}
            </span>
          </div>

          <div className={styles.search}>
            <input placeholder="Cari resi, kota..." />
          </div>

          <div className={styles.right}>
            <div className={styles.notif}>
              🔔
              <span className={styles.badge}>3</span>
            </div>

            <button className={styles.cta}>
              + Buat Pengiriman
            </button>
          </div>

        </header>

        {/* CONTENT */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}