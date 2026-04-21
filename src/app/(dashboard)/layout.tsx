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
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <div className={styles.wrapper}>
      
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        
        {/* LOGO */}
        <div className={styles.logo}>
          {!collapsed && <span>SwiftSend</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        {/* MENU */}
        <nav className={styles.nav}>
          {menu.map((item, i) => {
            const active = pathname === item.path;

            return (
              <div
                key={i}
                onClick={() => router.push(item.path)}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {!collapsed && <p>{item.name}</p>}
              </div>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className={styles.footer}>
          {!collapsed && (
            <>
              <p className={styles.username}>Nikol</p>
              <span className={styles.role}>User</span>
            </>
          )}
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
            <button onClick={() => setCollapsed(!collapsed)}>☰</button>
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