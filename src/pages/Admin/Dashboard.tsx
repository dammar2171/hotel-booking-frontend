// src/pages/Dashboard.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layouts/Sidebar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{
        flex:       1,
        padding:    "32px",
        background: "var(--color-bg-secondary)",
        overflowY:  "auto",
      }}>
        <Outlet />
      </main>
    </div>
  );
}