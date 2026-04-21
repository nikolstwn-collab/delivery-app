"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

/* ================= TYPES ================= */

interface Shipment {
  id: string;
  recipient: string;
  origin: string;
  destination: string;
  status: "Terkirim" | "Dalam Perjalanan" | "Menunggu" | "Dikembalikan";
  weight: string;
  eta: string;
  progress: number;
}

interface StatCard {
  label: string;
  value: number;
  delta: number;
  positive: boolean;
}

interface ActivityItem {
  time: string;
  text: string;
  color: string;
}

interface CityVolume {
  city: string;
  count: number;
  percentage: number;
}

/* ================= DUMMY DATA ================= */

const shipments: Shipment[] = [
  {
    id: "SWF-2024-1001",
    recipient: "Budi Santoso",
    origin: "Jakarta",
    destination: "Bandung",
    status: "Dalam Perjalanan",
    weight: "2kg",
    eta: "2 hari",
    progress: 60,
  },
  {
    id: "SWF-2024-1002",
    recipient: "Siti Aminah",
    origin: "Surabaya",
    destination: "Jakarta",
    status: "Terkirim",
    weight: "1kg",
    eta: "Selesai",
    progress: 100,
  },
];

const stats: StatCard[] = [
  { label: "Total Pengiriman", value: 1240, delta: 12, positive: true },
  { label: "Hari Ini", value: 87, delta: 5, positive: true },
  { label: "Dalam Perjalanan", value: 230, delta: -2, positive: false },
  { label: "Pendapatan", value: 12000000, delta: 8, positive: true },
];

/* ================= COUNTER HOOK ================= */

const useCounter = (target: number, duration: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const update = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    update();
  }, [target]);

  return count;
};

/* ================= PAGE ================= */

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      
      {/* HERO */}
      <div className={styles.hero}>
        <div>
          <p className={styles.badge}>● Live · 99.8% Uptime</p>
          <h1>Selamat Datang 👋</h1>
          <p className={styles.sub}>
            Kelola pengiriman dengan cepat dan efisien
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        {stats.map((item, i) => {
          const value = useCounter(item.value, 800);

          return (
            <div key={i} className={styles.card}>
              <p>{item.label}</p>
              <h2>{value}</h2>
              <span className={item.positive ? styles.pos : styles.neg}>
                {item.delta}%
              </span>
            </div>
          );
        })}
      </div>

      {/* TABLE */}
      <div className={styles.tableCard}>
        <h3>Pengiriman Terbaru</h3>

        <table>
          <thead>
            <tr>
              <th>Resi</th>
              <th>Penerima</th>
              <th>Rute</th>
              <th>Status</th>
              <th>ETA</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s, i) => (
              <tr key={i} className={styles.row}>
                <td>{s.id}</td>
                <td>{s.recipient}</td>
                <td>{s.origin} → {s.destination}</td>
                <td>
                  <span className={styles.status}>{s.status}</span>
                </td>
                <td>{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}