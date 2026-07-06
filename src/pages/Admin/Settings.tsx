import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import SideBarTab from "../../components/layouts/SideBarTab";
import TabContent from "../../components/TabContent";



export default function Settings() {
  const { user }               = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "appearance" | "about">("profile");
  
  // ── Shared styles ────────────────────────
  const card = {
    background:   "var(--color-bg-card)",
    border:       "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    overflow:     "hidden",
    boxShadow:    "var(--shadow-card)",
  };

  return (
    <div>

      {/* ── Page Header ──────────────────── */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{
          fontWeight: 700,
          color:      "var(--color-text-primary)",
          margin:     0,
        }}>
          Settings
        </h2>
        <p style={{
          color:     "var(--color-text-muted)",
          fontSize:  "var(--text-sm)",
          marginTop: "4px",
        }}>
          Manage your account and preferences
        </p>
      </div>

      <div className="row g-4">

        {/* ── Sidebar Tabs ─────────────────── */}
        <div className="col-lg-3">
         <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} card={card} user={user}/>
        </div>

        {/* ── Tab Content ──────────────────── */}
        <TabContent activeTab={activeTab} setActiveTab={setActiveTab} card={card} user={user}/>
      </div>
    </div>
  );
}